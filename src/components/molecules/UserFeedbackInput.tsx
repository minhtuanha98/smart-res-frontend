import React from 'react';
import { TextField, Box, Typography } from '@mui/material';
import ButtonBase from '@/components/atoms/ButtonBase';

interface UserFeedbackInputProps {
  formik?: any;
  isLoading?: boolean;
  error?: string;
}

const UserFeedbackInput: React.FC<UserFeedbackInputProps> = ({
  formik,
  isLoading,
}) => {
  return (
    <Box className='flex flex-col gap-4 p-4 bg-white rounded shadow'>
      <Typography variant='h6'>Gửi phản ánh</Typography>
      <form
        onSubmit={formik.handleSubmit}
        noValidate
        className='flex flex-col gap-4'
      >
        <div>
          <TextField
            label='Title'
            name='title'
            value={formik?.values?.title || ''}
            onChange={formik.handleChange || (() => {})}
            onBlur={formik.handleBlur || (() => {})}
            autoComplete='title'
            required
            fullWidth
            error={Boolean(formik.touched.title && formik.errors.title)}
            className='bg-white'
            InputProps={{ className: 'rounded' }}
          />
          {formik.touched.title && formik.errors.title && (
            <Typography color='error' variant='caption' className='ml-2'>
              {formik.errors.title}
            </Typography>
          )}
        </div>
        <div>
          <TextField
            label='Apartment'
            name='apartNumber'
            value={formik?.values?.apartNumber || ''}
            onChange={formik.handleChange || (() => {})}
            onBlur={formik.handleBlur || (() => {})}
            autoComplete='apartNumber'
            required
            fullWidth
            error={Boolean(
              formik.touched.apartNumber && formik.errors.apartNumber
            )}
            className='bg-white'
          />
          {formik.touched.apartNumber && formik.errors.apartNumber && (
            <Typography color='error' variant='caption' className='ml-2'>
              {formik.errors.apartNumber}
            </Typography>
          )}
        </div>
        <div>
          <TextField
            label='Details'
            name='content'
            value={formik?.values?.content || ''}
            onChange={formik.handleChange || (() => {})}
            onBlur={formik.handleBlur || (() => {})}
            autoComplete='content'
            required
            fullWidth
            error={Boolean(formik.touched.content && formik.errors.content)}
            className='bg-white'
            multiline
            minRows={3}
          />
          {formik.touched.content && formik.errors.content && (
            <Typography color='error' variant='caption' className='ml-2'>
              {formik.errors.content}
            </Typography>
          )}
        </div>
        <div className='flex flex-col gap-2 w-[30%]'>
          <input
            className='mt-2 block w-sm text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
            type='file'
            accept='image/*'
            onChange={e => {
              const file = e.target.files?.[0] || null;
              formik.setFieldValue('image', file);
            }}
          />
          {formik.values.image && (
            <span>
              Choose: {formik.values.image.name || 'No files selected yet'}
            </span>
          )}
        </div>
        <ButtonBase
          type='submit'
          variant='contained'
          color='primary'
          disabled={isLoading}
          className='mt-4 w-full'
        >
          {isLoading ? 'Sending...' : 'Send Feedback'}
        </ButtonBase>
      </form>
    </Box>
  );
};

export default UserFeedbackInput;
