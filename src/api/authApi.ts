import axiosInstance from '@/configs/api';
import { API_ENDPOINTS } from '@/constants/config';
import { LoginPayload, LoginResponse } from '@/types';
import { queryKeys } from '@/utils/query-client';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

const { LOGIN, LOGOUT } = API_ENDPOINTS.AUTH;

export const useLoginMutationApi = (
  options?: UseMutationOptions<LoginResponse, Error, LoginPayload>
) => {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationKey: queryKeys.auth.user(),
    mutationFn: async (payload: LoginPayload) => {
      return axiosInstance.post(LOGIN, payload);
    },
    ...options,
  });
};

export const useLogoutApi = (options?: UseMutationOptions<Error, void>) => {
  return useMutation<Error, void>({
    mutationKey: queryKeys.auth.logout(),
    mutationFn: async () => {
      return axiosInstance.post(LOGOUT);
    },
    ...options,
  });
};
