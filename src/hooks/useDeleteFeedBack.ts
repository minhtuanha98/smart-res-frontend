import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/utils/query-client';
import { MESSAGE } from '@/constants/message';
import { useDeleteFeedBackApi } from '@/api/feedbackApi';

const { FEEDBACK_DELETED, DELETE_FEEDBACK_FAIL } = MESSAGE.FEEDBACK;

interface sendError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const useDeleteFeedBack = () => {
  const queryClient = useQueryClient();

  const deleteFeedBack = useDeleteFeedBackApi({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.feedback.listFeedBack()],
      });
      toast(FEEDBACK_DELETED);
    },
    onError: (error: sendError) => {
      toast(
        DELETE_FEEDBACK_FAIL +
          ' ' +
          (error.response?.data?.message || error.message)
      );
    },
  });

  return { deleteFeedBack };
};
