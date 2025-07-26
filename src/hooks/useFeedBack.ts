import { useFormik } from 'formik';
import { feedBackSchema } from '@/schemas/feedBackSchema';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/utils/query-client';
import { PayloadType } from '@/types/feedBackType';
import { MESSAGE } from '@/constants/message';
import { useCreateFeedBackApi, useGetFeedBackApi } from '@/api/feedbackApi';

const { FEEDBACK_CREATED, CREATE_FEEDBACK_FAIL } = MESSAGE.FEEDBACK;

interface sendError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const useFeedBack = (params: PayloadType) => {
  const queryClient = useQueryClient();
  const { page, limit, status } = params;

  const sendFeedBackMutation = useCreateFeedBackApi({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.feedback.listFeedBack()],
      });
      toast(FEEDBACK_CREATED);
    },
    onError: (error: sendError) => {
      toast(
        CREATE_FEEDBACK_FAIL +
          ' ' +
          (error.response?.data?.message || error.message)
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
