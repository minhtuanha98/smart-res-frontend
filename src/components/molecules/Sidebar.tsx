import React from 'react';
import { Drawer, List, Toolbar, Box, Button } from '@mui/material';
import SidebarItem from '../atoms/SidebarItem';

interface SidebarProps {
  selected: 'user' | 'feedback';
  onSelect: (key: 'user' | 'feedback') => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selected, onSelect, onLogout }) => (
  <Drawer
    variant='permanent'
    sx={{
      width: 220,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: {
        width: 220,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
    }}
  >
    <div className='w-full'>
      <Toolbar />
      <List>
        <SidebarItem
          label='Quản lý người dùng'
          icon='user'
          selected={selected === 'user'}
          onClick={() => onSelect('user')}
        />
        <SidebarItem
          label='Quản lý phản ánh'
          icon='feedback'
          selected={selected === 'feedback'}
          onClick={() => onSelect('feedback')}
        />
      </List>
    </div>
    <Box className='p-2'>
      <Button variant='outlined' color='error' fullWidth onClick={onLogout}>
        Logout
      </Button>
    </Box>
  </Drawer>
);

export default Sidebar;
