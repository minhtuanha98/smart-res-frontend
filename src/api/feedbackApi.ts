import axiosInstance from '@/configs/api';
import { queryKeys } from '@/utils/query-client';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query';

interface PayloadType {
  page?: string;
  limit?: string;
  status?: string;
}

interface FeedBackPayload {
  title: string;
  apartNumber: string;
  content: string;
  image: File | null;
  status: string;
}

export interface FeedbackItem {
  id: string;
  title: string;
  content: string;
  apartNumber: string;
  userId: string;
  imageUrl: string | null;
  status: string;
  createdAt: string;
}

export interface FeedbackListResponse {
  feedBacks: FeedbackItem[];
  total: number;
  page: number | null;
  limit: number | null;
}
export const useGetFeedBackApi = (payload: PayloadType) => {
  return useQuery<FeedbackListResponse, Error>({
    queryKey: [queryKeys.feedback.listFeedBack(), payload],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/user/list/feedbacks', {
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
      // Tạo FormData để gửi file
      const formData = new FormData();
      formData.append('title', payload.title);
      formData.append('content', payload.content);
      formData.append('apartNumber', payload.apartNumber);
      formData.append('status', payload.status);

      if (payload.image) {
        formData.append('image', payload.image);
      }

      const { data } = await axiosInstance.post('/user/feedback', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    },
    ...options,
  });
};

export const useUpdateFeedBackStatusApi = (
  options?: UseMutationOptions<any, Error, { id: string; status: string }>
) => {
  return useMutation<any, Error, { id: string; status: string }>({
    mutationKey: queryKeys.feedback.updateFeedBackStatus(),
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data } = await axiosInstance.put(`/admin/feedback/${id}/status`, {
        status,
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
      const { data } = await axiosInstance.delete(`/user/feedback/${id}`);
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
      const { data } = await axiosInstance.put(`/user/feedback/${id}`, {
        status,
      });
      return data;
    },
    ...options,
  });
};
