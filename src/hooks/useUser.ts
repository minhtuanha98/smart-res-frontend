import { useGetAllUserApi } from '@/api/userApi';
import { PayloadType } from '@/types/feedBackType';

export const useUser = (params: PayloadType) => {
  const { page, limit, status } = params;
  const { data, error, isLoading } = useGetAllUserApi({
    page: page,
    limit: limit,
    status: status,
  });
  return { users: data, error, isLoading };
};
