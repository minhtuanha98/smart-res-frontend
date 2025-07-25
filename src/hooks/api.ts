import { apiClient } from '@/configs/api';
import { User, ApiResponse } from '@/types';

// Auth API functions
const authApi = {};

// Auth hooks
export const useLogin = () => {};

export const useRegister = () => {};

export const useLogout = () => {};

export const useCurrentUser = () => {};

// Users API functions
const usersApi = {
  getUsers: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    return apiClient.get('/api/users', { params });
  },

  getUser: async (id: string): Promise<ApiResponse<User>> => {
    return apiClient.get(`/api/users/${id}`);
  },

  updateUser: async (
    id: string,
    data: Partial<User>
  ): Promise<ApiResponse<User>> => {
    return apiClient.put(`/api/users/${id}`, data);
  },

  deleteUser: async (id: string): Promise<ApiResponse<null>> => {
    return apiClient.delete(`/api/users/${id}`);
  },
};

// Users hooks
export const useUsers = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {};

export const useUser = (id: string) => {};

export const useUpdateUser = () => {};

export const useDeleteUser = () => {};
