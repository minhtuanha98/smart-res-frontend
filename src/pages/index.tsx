import React from 'react';
import LoginTemplate from '../components/templates/LoginTemplate';
import { useLogin } from '@/hooks/useLogin';

const UserLoginPage = () => {
  const { formik } = useLogin();

  return <LoginTemplate title='Đăng nhập' formik={formik} />;
};

export default UserLoginPage;
