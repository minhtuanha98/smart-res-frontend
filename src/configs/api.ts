import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // Xử lý lỗi request
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError) => {
    // Xử lý lỗi chung
    if (error.response) {
      switch (error.response.status) {
        case 401:
          break;
        case 403:
          break;
        case 404:
          break;
        case 500:
          break;
        default:
          break;
      }
    } else if (error.request) {
    } else {
    }
    return Promise.reject(error);
  }
);

// API client methods
export const apiClient = {
  // GET request
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return axiosInstance.get(url, config).then(response => response.data);
  },

  // POST request
  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return axiosInstance
      .post(url, data, config)
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
  },

  // PUT request
  put: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return axiosInstance.put(url, data, config).then(response => response.data);
  },

  // PATCH request
  patch: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return axiosInstance
      .patch(url, data, config)
      .then(response => response.data);
  },

  // DELETE request
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return axiosInstance.delete(url, config).then(response => response.data);
  },

  // Upload file
  upload: <T = any>(
    url: string,
    formData: FormData,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return axiosInstance
      .post(url, formData, {
        ...config,
        headers: {
          'Content-Type': 'multipart/form-data',
          ...config?.headers,
        },
      })
      .then(response => response.data);
  },
};

// Export axios instance for direct use if needed
export default axiosInstance;
