import axiosInstance from '@/configs/api';
import { API_ENDPOINTS } from '@/constants/config';
import {
  FeedbackListResponse,
  FeedBackPayload,
  PayloadType,
} from '@/types/feedBackType';
import { queryKeys } from '@/utils/query-client';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query';

const { USER_LIST, USER_FEEDBACK } = API_ENDPOINTS.FEEDBACK;

export const useGetFeedBackApi = (payload: PayloadType) => {
  return useQuery<FeedbackListResponse, Error>({
    queryKey: [queryKeys.feedback.listFeedBack(), payload],
    queryFn: async () => {
      const { data } = await axiosInstance.get(USER_LIST, {
        params: payload,
      });
      return data;
    },
  });
};

export const useCreateFeedBackApi = (
  options?: UseMutationOptions<any, Error, FeedBackPayload>
) => {
  return useMutation<any, Error, FeedBackPayload>({
    mutationKey: queryKeys.feedback.createFeedBack(),
    mutationFn: async (payload: FeedBackPayload) => {
      const formData = new FormData();
      formData.append('title', payload.title);
      formData.append('content', payload.content);
      formData.append('apartNumber', payload.apartNumber);
      formData.append('status', payload.status);

      if (payload.image) {
        formData.append('image', payload.image);
      }

      const { data } = await axiosInstance.post(USER_FEEDBACK, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    },
    ...options,
  });
};

export const useDeleteFeedBackApi = (
  options?: UseMutationOptions<any, Error, string>
) => {
  return useMutation<any, Error, string>({
    mutationKey: queryKeys.feedback.deleteFeedBack(),
    mutationFn: async (id: string) => {
      const { data } = await axiosInstance.delete(`${USER_FEEDBACK}/${id}`);
      return data;
    },
    ...options,
  });
};

export const useUpdateStatusApi = (
  options?: UseMutationOptions<any, Error, { id: string; status: string }>
) => {
  return useMutation<any, Error, { id: string; status: string }>({
    mutationKey: queryKeys.feedback.updateFeedBackStatus(),
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data } = await axiosInstance.put(`${USER_FEEDBACK}/${id}`, {
        status,
      });
      return data;
    },
    ...options,
  });
};
