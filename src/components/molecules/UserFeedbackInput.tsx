import React from 'react';
import { TextField, Box, Button, Typography } from '@mui/material';
import ButtonBase from '../atoms/ButtonBase';

export interface UserFeedbackInputProps {
  values: {
    title: string;
    apartment: string;
    content: string;
    image: File | null;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onImageChange: (file: File | null) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading?: boolean;
}

const UserFeedbackInput: React.FC<UserFeedbackInputProps> = ({
  values,
  onChange,
  onImageChange,
  onSubmit,
  loading,
}) => {
  return (
    <Box
      component='form'
      onSubmit={onSubmit}
      className='flex flex-col gap-4 p-4 bg-white rounded shadow'
    >
      <Typography variant='h6'>Gửi phản ánh</Typography>
      <TextField
        label='Tiêu đề'
        name='title'
        value={values.title}
        onChange={onChange}
        required
        fullWidth
      />
      <TextField
        label='Căn hộ'
        name='apartment'
        value={values.apartment}
        onChange={onChange}
        required
        fullWidth
      />
      <TextField
        label='Nội dung chi tiết'
        name='content'
        value={values.content}
        onChange={onChange}
        required
        fullWidth
        multiline
        minRows={3}
      />
      <input
        type='file'
        accept='image/*'
        onChange={e => onImageChange(e.target.files?.[0] || null)}
      />
      {values.image && (
        <span className='text-sm text-gray-600'>
          Đã chọn: {values.image.name}
        </span>
      )}
      <ButtonBase
        type='submit'
        variant='contained'
        color='primary'
        disabled={loading}
      >
        {loading ? 'Đang gửi...' : 'Gửi phản ánh'}
      </ButtonBase>
    </Box>
  );
};

export default UserFeedbackInput;
