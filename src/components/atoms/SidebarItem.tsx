import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import FeedbackIcon from '@mui/icons-material/Feedback';

export interface SidebarItemProps {
  label: string;
  selected?: boolean;
  icon: 'user' | 'feedback';
  onClick?: () => void;
}

const iconMap = {
  user: <PeopleIcon />,
  feedback: <FeedbackIcon />,
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  selected,
  icon,
  onClick,
}) => (
  <div className='w-full'>
    <ListItem disablePadding>
      <ListItemButton selected={selected} onClick={onClick}>
        <ListItemIcon>{iconMap[icon]}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  </div>
);

export default SidebarItem;
