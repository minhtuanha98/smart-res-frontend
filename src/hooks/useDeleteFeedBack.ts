import { useDeleteFeedBackApi } from '../api/feedbackApi';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/utils/query-client';

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
      toast('Feedback delete successfully!');
    },
    onError: (error: sendError) => {
      toast(
        'delete failed: ' + (error.response?.data?.message || error.message)
      );
    },
  });

  return { deleteFeedBack };
};
