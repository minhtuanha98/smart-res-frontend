import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/utils/query-client';
import { MESSAGE } from '@/constants/message';
import { useUpdateStatusApi } from '@/api/feedbackApi';

const { FEEDBACK_UPDATED, UPDATE_FEEDBACK_FAIL } = MESSAGE.FEEDBACK;

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
      queryClient.invalidateQueries({
        queryKey: [queryKeys.feedback.listFeedBack()],
      });
      toast(FEEDBACK_UPDATED);
    },
    onError: (error: sendError) => {
      toast(
        UPDATE_FEEDBACK_FAIL +
          ' ' +
          (error.response?.data?.message || error.message)
      );
    },
  });

  return { updateStatusMutation };
};
