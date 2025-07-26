import { queryKeys } from '@/utils/query-client';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/configs/api';

interface PayloadType {
  page?: string;
  limit?: string;
  status?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  apartNumber: string;
  phone: string;
  role: 'resident';
  createdAt: '2025-07-22T07:19:34.638Z';
}

export interface UserListResponse {
  users: User[];
  total: number;
  page: number | null;
  limit: number | null;
}
export const useGetAllUserApi = (payload: PayloadType) => {
  return useQuery<UserListResponse, Error>({
    queryKey: [queryKeys.Users.user(), payload],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/user/list-user', {
        params: payload,
      });
      return data;
    },
  });
};
