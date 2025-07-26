import { useFormik } from 'formik';
import {
  useCreateFeedBackApi,
  useGetFeedBackApi,
  useUpdateStatusApi,
} from '../api/feedbackApi';
import { feedBackSchema } from '@/schemas/feedBackSchema';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/utils/query-client';

interface dataType {
  status?: string;
}

interface sendError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const useUpdateFeedBack = () => {
  const queryClient = useQueryClient();

  const updateStatusMutation = useUpdateStatusApi({
    onSuccess: () => {
      // Invalidate và refetch danh sách feedback
      queryClient.invalidateQueries({
        queryKey: [queryKeys.feedback.listFeedBack()],
      });
      toast('Feedback update successfully!');
    },
    onError: (error: sendError) => {
      toast(
        'update failed: ' + (error.response?.data?.message || error.message)
      );
    },
  });

  return { updateStatusMutation };
};
