import React from 'react';
import { ButtonProps as MUIButtonProps } from '@mui/material';

export type ButtonBaseProps = MUIButtonProps & {
  children: React.ReactNode;
  color?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'success'
    | 'warning'
    | 'info'
    | string;
  fontSize?: string;
  variant?: 'contained' | 'outlined' | 'text';
  className?: string;
};

const ButtonBase: React.FC<ButtonBaseProps> = ({
  children,
  color = 'primary',
  fontSize,
  variant = 'contained',
  className = '',
  ...props
}) => {
  // Tailwind color map (extend as needed)
  const colorMap: Record<string, string> = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    outlined:
      'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50',
  };
  let twColor = colorMap[color] || color;
  if (variant === 'outlined') twColor = colorMap['outlined'];
  if (variant === 'text') twColor = colorMap['text'];
  return (
    <button
      className={`rounded px-4 py-2 font-medium transition ${twColor} ${className}`.trim()}
      style={fontSize ? { fontSize } : undefined}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonBase;
