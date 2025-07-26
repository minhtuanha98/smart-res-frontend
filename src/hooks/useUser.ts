import { useGetAllUserApi } from '../api/userApi';

interface dataType {
  page?: string;
  limit?: string;
  status?: string;
}

export const useUser = (params: dataType) => {
  const { page, limit, status } = params;
  const { data, error, isLoading } = useGetAllUserApi({
    page: page,
    limit: limit,
    status: status,
  });
  return { users: data, error, isLoading };
};
