import { useLogoutApi } from '../api/authApi';
import router from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useLogout = () => {
  const [data, setData] = useState<any>(null);

  const mutation = useLogoutApi({
    onSuccess: (response: any) => {
      setData(response);
      router.push('/');
    },

    onError: (error: any) => {
      toast(
        'Logout failed: ' + (error.response?.data?.message || error.message)
      );
    },
  });

  return {
    logoutHandler: mutation,
    data,
  };
};
