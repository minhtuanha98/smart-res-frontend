import { loginSchema } from '@/schemas/loginSchema';
import { useFormik } from 'formik';
import { useLoginMutationApi } from '../api/authApi';
import router from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import logger from '@/utils/logger';

interface LoginResponse {
  // Define the expected response shape here if known
  [key: string]: any;
}

interface LoginError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const useLogin = () => {
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
      toast(
        'Login failed: ' + (error.response?.data?.message || error.message)
      );
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
