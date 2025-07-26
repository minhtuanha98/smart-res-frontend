import { queryKeys } from '@/utils/query-client';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/configs/api';
import { PayloadType } from '@/types/feedBackType';
import { UserListResponse } from '@/types/userType';
import { API_ENDPOINTS } from '@/constants/config';

const { LIST } = API_ENDPOINTS.USER;

export const useGetAllUserApi = (payload: PayloadType) => {
  return useQuery<UserListResponse, Error>({
    queryKey: [queryKeys.Users.user(), payload],
    queryFn: async () => {
      const { data } = await axiosInstance.get(LIST, {
        params: payload,
      });
      return data;
    },
  });
};
