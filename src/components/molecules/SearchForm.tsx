import React from 'react';
import { Box, TextField } from '@mui/material';
import ButtonBase from '../atoms/ButtonBase';

interface SearchFormProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  placeholder?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder,
}) => (
  <Box component='form' onSubmit={onSubmit} className='flex gap-2 mb-2'>
    <TextField
      name='title'
      placeholder={placeholder || 'Search...'}
      value={value}
      onChange={onChange}
      className='flex-1'
    />
    <ButtonBase
      type='submit'
      variant='outlined'
      fontSize='20px'
      color='error'
      className='h-full'
      style={{ minWidth: 0, width: '150px', height: '56px' }}
    >
      Tìm Kiếm
    </ButtonBase>
  </Box>
);

export default SearchForm;
