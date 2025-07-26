import { refreshToken } from '@/api/authApi';
import axios, { AxiosError, AxiosInstance } from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'X-Device-ID':
      typeof window !== 'undefined'
        ? localStorage.getItem('device-id') ||
          Math.random().toString(36).substring(2, 15)
        : 'server-side',
  },
  withCredentials: true,
});

// Store device ID in localStorage for consistency
if (typeof window !== 'undefined') {
  const deviceId =
    localStorage.getItem('device-id') ||
    Math.random().toString(36).substring(2, 15);
  localStorage.setItem('device-id', deviceId);
}

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(_token => {
            return axiosInstance(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        await refreshToken();
        processQueue(null, null);
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
