import { useLogoutApi } from '@/api/authApi';
import { MESSAGE } from '@/constants/message';
import router from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

const { LOGOUT_FAIL } = MESSAGE.AUTH;

export const useLogout = () => {
  const [data, setData] = useState<any>(null);

  const mutation = useLogoutApi({
    onSuccess: (response: any) => {
      setData(response);
      router.push('/');
    },

    onError: (error: any) => {
      toast(LOGOUT_FAIL + (error.response?.data?.message || error.message));
    },
  });

  return {
    logoutHandler: mutation,
    data,
  };
};
