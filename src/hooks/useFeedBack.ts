import { useFormik } from 'formik';
import { useCreateFeedBackApi, useGetFeedBackApi } from '../api/feedbackApi';
import { feedBackSchema } from '@/schemas/feedBackSchema';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/utils/query-client';

interface dataType {
  page?: string;
  limit?: string;
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

export const useFeedBack = (params: dataType) => {
  const queryClient = useQueryClient();
  const { page, limit, status } = params;

  const sendFeedBackMutation = useCreateFeedBackApi({
    onSuccess: () => {
      // Invalidate và refetch danh sách feedback
      queryClient.invalidateQueries({
        queryKey: [queryKeys.feedback.listFeedBack()],
      });
      toast('Feedback sent successfully!');
    },
    onError: (error: sendError) => {
      toast(
        'Login failed: ' + (error.response?.data?.message || error.message)
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      apartNumber: '',
      content: '',
      image: null as File | null,
      status: 'pending',
    },
    validationSchema: feedBackSchema,

    onSubmit: async values => {
      try {
        const payload = {
          ...values,
          image: values.image instanceof File ? values.image : null,
        };
        await sendFeedBackMutation.mutateAsync(payload);
        formik.resetForm();
      } catch (error) {
        // logger.error('fail to login', error);
      }
    },
  });

  const { data, error, isLoading } = useGetFeedBackApi({
    page: page,
    limit: limit,
    status: status,
  });

  return { formik, data, error, isLoading };
};
