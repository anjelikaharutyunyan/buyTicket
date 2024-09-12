import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import logo from './logo.png';

const drawerWidth = 240;

const NavDrawer = ({ container, mobileOpen, handleDrawerToggle, navItems, isLoggedIn }) => {

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
        <img src={logo} alt='Logo' style={{ width: '200px', marginTop: '5px' }} />
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Link key={item.to} to={item.to} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center', paddingX: 2 }}>
                <ListItemText primary={item.screen} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}

        {isLoggedIn && (
          <>
            <Link to="/favoriteTicket" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center', paddingX: 2 }}>
                  <ListItemText primary="Favorite Ticket" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/ticket" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center', paddingX: 2 }}>
                  <ListItemText primary="Ticket" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Link to="/statistic" style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center', paddingX: 2 }}>
                  <ListItemText primary="Statistic" />
                </ListItemButton>
              </ListItem>
            </Link>
          </>
        )}
      </List>
      <Divider />
      <Link to={isLoggedIn ? '/' : '/login'} style={{ textDecoration: 'none' }}>
        <Button sx={{ width: '100%', mt: 2 }}>
          {isLoggedIn ? 'Home' : 'Login'}
        </Button>
      </Link>
    </Box>
  );

  return (
    <Drawer
      container={container}
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      {drawer}
    </Drawer>
  );
}

export default NavDrawer;
