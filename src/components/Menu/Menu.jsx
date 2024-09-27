import * as React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { MAIN_COLOR, theme } from '../../constants';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Badge, InputAdornment, MenuItem, OutlinedInput, Select, ThemeProvider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';
import logo from './logo.png';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from '@mui/icons-material';
import CartPortal from '../CartPortal/CartPortal';
import { useState } from 'react';
import { auth } from '../../firebase/firebase';
import NavDrawer from './Drawer';
import UserDropDown from '../DropDown/DropDown';

const Menu = (props) => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const { window } = props;
  const [language, setLanguage] = useState('en');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const cartCount = useSelector((state) => state.cart.count);

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

  const handleCartOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

  const container = window !== undefined ? () => window().document.body : undefined;


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>
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
              {isLoggedIn && auth.currentUser.uid !== 'Q89mlqEtR1O3VHCAVUZSxcYbtuI3' && (
                <Button sx={{ color: '#fff', px: 2 }}>
                  <Link to="/favoriteTicket" style={{ textDecoration: 'none', color: 'inherit' }}>
                    {t('favoriteTicket')}
                  </Link>
                </Button>
              )}
              {isLoggedIn && auth.currentUser.uid === 'Q89mlqEtR1O3VHCAVUZSxcYbtuI3' && (
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
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isLoggedIn && auth.currentUser.uid !== 'Q89mlqEtR1O3VHCAVUZSxcYbtuI3' && <IconButton aria-label="cart">
                <Badge sx={{ color: 'white' }} badgeContent={cartCount}>
                  <ShoppingCart sx={{ color: 'white' }} onClick={() => handleCartOpen()} />
                </Badge>
              </IconButton>
              }
            </Box>
            <Select
              labelId="demo-simple-select-label"
              id="language-select"
              value={language}
              onChange={handleLanguageChange}
              input={
                <OutlinedInput
                  startAdornment={
                    <InputAdornment position="start">
                      <LanguageIcon style={{ color: '#fff' }} />
                    </InputAdornment>
                  }
                  sx={{
                    background: MAIN_COLOR,
                    border: 'none',
                    color: 'white',
                    fontSize: '16px',
                    '& fieldset': {
                      border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                      border: 'none',
                    },
                  }}
                />
              }
            >
              <MenuItem value="en">{t('english')}</MenuItem>
              <MenuItem value="ru">{t('russian')}</MenuItem>
              <MenuItem value="hy">{t('armenian')}</MenuItem>
            </Select>
            <Button sx={{ color: '#fff'}}>
              {isLoggedIn ? (
                <div style={{ display: 'flex'}}>
                    <UserDropDown />
                </div>
              ) : (
                <Link to={'/login'} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {t('login')}
                </Link>
              )}
            </Button>
          </Toolbar>
        </AppBar>
        <nav>
          <NavDrawer
            container={container}
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            navItems={navItems}
            isLoggedIn={isLoggedIn}
          />
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
