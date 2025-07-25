import axiosInstance from '@/configs/api';
import { queryKeys } from '@/utils/query-client';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  // Define the expected response shape here if known
  [key: string]: any;
}

export const useLoginMutationApi = (
  options?: UseMutationOptions<LoginResponse, Error, LoginPayload>
) => {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationKey: queryKeys.auth.user(),
    mutationFn: async (payload: LoginPayload) => {
      return axiosInstance.post('/user/login', payload);
    },
    ...options,
  });
};

export const useLogoutApi = (options?: UseMutationOptions<Error, void>) => {
  return useMutation<Error, void>({
    mutationKey: queryKeys.auth.logout(),
    mutationFn: async () => {
      return axiosInstance.post('/user/logout');
    },
    ...options,
  });
};
