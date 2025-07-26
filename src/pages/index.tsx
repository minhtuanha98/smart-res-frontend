import React from 'react';
import { useLogin } from '@/hooks/useLogin';
import LoginTemplate from '@/components/templates/LoginTemplate';

const UserLoginPage = () => {
  const { formik } = useLogin();

  return <LoginTemplate title='Login' formik={formik} />;
};

export default UserLoginPage;
