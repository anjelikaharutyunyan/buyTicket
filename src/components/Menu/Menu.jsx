import * as React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { theme } from '../../constants';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { Badge, MenuItem, Select, ThemeProvider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import logo from './logo.png'
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { ShoppingCart } from '@mui/icons-material';
import CartPortal from '../CartPortal/CartPortal';

const drawerWidth = 240;

const Menu = (props) => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const { window } = props;
  const [language, setLanguage] = React.useState('en');
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  const navItems = [
    { screen: t('home'), to: '/' },
    { screen: t('aboutUs'), to: '/aboutUs' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    setLanguage(selectedLanguage);
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };


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
          <Link to="/favoriteTicket" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center', paddingX: 2 }}>
                <ListItemText primary="Favorite Ticket" />
              </ListItemButton>
            </ListItem>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/ticket" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center', paddingX: 2 }}>
                <ListItemText primary="Ticket" />
              </ListItemButton>
            </ListItem>
          </Link>
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

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav" style={{ paddingInline: '50px' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box onClick={handleClick} sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              <img src={logo} alt='Logo' style={{ width: '200px', marginTop: '5px', cursor: 'pointer' }} />
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' }, flexGrow: 0.1 }}>
              {navItems.map((item) => (
                <Button key={item.to} sx={{ color: '#fff', px: 2 }}>
                  <Link to={item.to} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {item.screen}
                  </Link>
                </Button>
              ))}
              {isLoggedIn && (
                <Button sx={{ color: '#fff', px: 2 }}>
                  <Link to="/favoriteTicket" style={{ textDecoration: 'none', color: 'inherit' }}>
                    {t('favoriteTicket')}
                  </Link>
                </Button>
              )}
              {isLoggedIn && auth.currentUser.uid === 'i0b3souhaJOaWFg1JrjyPZ0FF6A3' && (
                <Button sx={{ color: '#fff', px: 2 }}>
                  <Link to="/ticket" style={{ textDecoration: 'none', color: 'inherit' }}>
                    {t('ticket')}
                  </Link>
                </Button>
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton aria-label="cart">
                <Badge color="primary"
                //  badgeContent={cartCount}
                 >
                  <ShoppingCart sx={{ color: 'white' }} onClick={() => handleCartOpen()} />
                </Badge>
              </IconButton>
              <IconButton sx={{ color: '#fff' }}>
                <LanguageIcon />
              </IconButton>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={language}
                label="Language"
                style={{ background: '#F9BE32', border: 'none', color: 'white', fontSize: '16px' }}
                onChange={handleLanguageChange}
              >
                <MenuItem value='en'>{t('english')}</MenuItem>
                <MenuItem value='ru'>{t('russian')}</MenuItem>
                <MenuItem value='hy'>{t('armenian')}</MenuItem>
              </Select>
              <Button onClick={handleLogout} sx={{ color: '#fff', ml: 2 }}>
                {isLoggedIn ? (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Box> {user.name} </Box>
                    <Link to={'/login'} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {t('logout')}
                    </Link>
                  </div>
                ) : (
                  <Link to={'/login'} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {t('login')}
                  </Link>
                )}
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
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
        </nav>
        <CartPortal open={cartOpen} onClose={handleCartClose} />
      </Box>
    </ThemeProvider>
  );
}

Menu.propTypes = {
  window: PropTypes.func,
};

export default Menu;
