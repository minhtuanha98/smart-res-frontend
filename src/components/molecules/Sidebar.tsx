import React from 'react';
import { Drawer, List, Toolbar, Box } from '@mui/material';
import SidebarItem from '@/components/atoms/SidebarItem';
import ButtonBase from '@/components/atoms/ButtonBase';

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
          label='User Management'
          icon='user'
          selected={selected === 'user'}
          onClick={() => onSelect('user')}
        />
        <SidebarItem
          label='Feedback Management'
          icon='feedback'
          selected={selected === 'feedback'}
          onClick={() => onSelect('feedback')}
        />
      </List>
    </div>
    <Box className='p-2'>
      <ButtonBase variant='outlined' color='error' onClick={onLogout}>
        Logout
      </ButtonBase>
    </Box>
  </Drawer>
);

export default Sidebar;
