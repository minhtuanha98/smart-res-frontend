import React from 'react';
import {
  Pagination as MUIPagination,
  PaginationProps as MUIPaginationProps,
} from '@mui/material';

export type PaginationProps = MUIPaginationProps;

const Pagination: React.FC<PaginationProps> = props => {
  return (
    <MUIPagination
      shape='rounded'
      variant='outlined'
      color='primary'
      {...props}
    />
  );
};

export default Pagination;
