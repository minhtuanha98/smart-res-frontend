import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface LoginTemplateProps {
  title: string;
  formik?: any;
  loading?: boolean;
  error?: string;
}

const LoginTemplate: React.FC<LoginTemplateProps> = ({ title, formik }) => {
  return (
    <Box className='min-h-screen flex items-center justify-center bg-gray-100'>
      <Box className='bg-white p-8 rounded shadow-md w-full max-w-sm'>
        <Typography variant='h5' className='mb-6 text-center font-bold'>
          {title}
        </Typography>

        <form onSubmit={formik.handleSubmit} noValidate>
          <TextField
            name='username'
            label='Username'
            placeholder='username'
            value={formik.values.username || ''}
            onChange={formik.handleChange || (() => {})}
            onBlur={formik.handleBlur || (() => {})}
            required
            fullWidth
            autoComplete='username'
            margin='normal'
            error={Boolean(formik.touched.username && formik.errors.username)}
          />
          {formik.touched.username && formik.errors.username && (
            <Typography color='error' variant='caption' sx={{ ml: 1 }}>
              {formik.errors.username}
            </Typography>
          )}
          <TextField
            name='password'
            label='Password'
            placeholder='password'
            type='password'
            value={formik.values.password || ''}
            onChange={formik.handleChange || (() => {})}
            onBlur={formik.handleBlur || (() => {})}
            required
            fullWidth
            autoComplete='current-password'
            margin='normal'
            error={Boolean(formik.touched.password && formik.errors.password)}
          />
          {formik.touched.password && formik.errors.password && (
            <Typography color='error' variant='caption' sx={{ ml: 1 }}>
              {formik.errors.password}
            </Typography>
          )}
          <br />
          <br />
          <Button type='submit' variant='contained' color='primary'>
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default LoginTemplate;
