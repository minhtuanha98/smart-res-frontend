import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

export type InputProps = TextFieldProps;

const Input: React.FC<InputProps> = props => {
  return <TextField variant='outlined' size='small' fullWidth {...props} />;
};

export default Input;
