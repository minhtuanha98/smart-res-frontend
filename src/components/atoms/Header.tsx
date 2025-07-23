import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => (
  <AppBar position='static' color='default' elevation={1}>
    <Toolbar>
      <Typography variant='h6' sx={{ flexGrow: 1 }}>
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
