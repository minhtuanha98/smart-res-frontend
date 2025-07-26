import { loginSchema } from '@/schemas/loginSchema';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { LoginResponse } from '@/types';
import { MESSAGE } from '@/constants/message';
import { useLoginMutationApi } from '@/api/authApi';

const { LOGIN_FAIL } = MESSAGE.AUTH;

interface LoginError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const useLogin = () => {
  const router = useRouter();
  const [data, setData] = useState<LoginResponse | null>(null);
  const validate = loginSchema;

  const loginMutation = useLoginMutationApi({
    onSuccess: (response: LoginResponse) => {
      setData(response);
      if (response.data.user.role === 'admin') {
        router.push('/managerpage');
      } else {
        router.push('/userpage');
      }
    },
    onError: (error: LoginError) => {
      toast(LOGIN_FAIL + (error.response?.data?.message || error.message));
    },
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validate,
    onSubmit: async values => {
      try {
        await loginMutation.mutateAsync(values);
      } catch (error) {
        // logger.error('fail to login', error);
      }
    },
  });

  return {
    formik,
    data,
    isLoading: loginMutation.status === 'pending',
    isError: loginMutation.status === 'error',
    error: loginMutation.error,
  };
};
