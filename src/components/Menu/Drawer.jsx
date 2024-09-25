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
import { auth } from '../../firebase/firebase';
import { ADMIN } from '../../constants';

const drawerWidth = 240;

const NavDrawer = ({ container, mobileOpen, handleDrawerToggle, navItems, isLoggedIn }) => {
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
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
            {isLoggedIn && auth.currentUser.uid === ADMIN && (
                <>
                  <Button sx={{ color: '#fff', px: 2 }}>
                    <Link to="/ticket" style={{ textDecoration: 'none', color: 'inherit' }}>
                      {t('ticket')}
                    </Link>
                  </Button>
                  <Button sx={{ color: '#fff', px: 2 }}>
                    <Link to="/statistic" style={{ textDecoration: 'none', color: 'inherit' }}>
                      {t('statistic')}
                    </Link>
                  </Button>
                </>
              )}
          </>
        )}
      </List>
    
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
};

export default NavDrawer;
