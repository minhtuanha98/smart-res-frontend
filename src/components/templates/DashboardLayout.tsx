import React from 'react';
import { Box } from '@mui/material';
import Sidebar from '@/components/molecules/Sidebar';
import Header from '@/components/atoms/Header';
interface DashboardLayoutProps {
  children: React.ReactNode;
  selected: 'user' | 'feedback';
  onSelect: (key: 'user' | 'feedback') => void;
  onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  selected,
  onSelect,
  onLogout,
}) => {
  return (
    <Box className='flex bg-[#f5f6fa] min-h-[100vh]'>
      <Sidebar selected={selected} onSelect={onSelect} onLogout={onLogout} />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header title='Resident Management' />
        <Box sx={{ flex: 1, p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
