import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import { login, logout } from '../../store/authSlice';
import { auth, db } from '../../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Snackbar from '@mui/material/Snackbar';
import { sendEmailVerification } from 'firebase/auth';
import { CircularProgress } from '@mui/material';
import { MAIN_COLOR } from '../../constants';

const Login = () => {
  const { t } = useTranslation();
  const [isRegistering, setIsRegistering] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: user.email,
      });
      await sendEmailVerification(user);
      console.log('Verification email sent');
  
      dispatch(login({ email: user.email, uid: user.uid, name: name }));
      setError('');
      setSnackbarMessage('Registration successful! Please verify your email.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setTimeout(() => {
        setLoading(false)
        navigate('/');
      }, 1000);
    } catch (error) {
      setError(error.message);
      setSnackbarMessage('Registration failed.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
  
  const handleLogin = async () => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (!user.emailVerified) {
        setLoading(false);
        setError('Your email is not verified. Please check your inbox.');
        setSnackbarMessage('Email is not verified. Please verify your email.');
        setSnackbarSeverity('warning');
        setTimeout(() => {
          setSnackbarOpen(true);
        }, 10000);
        return;
      }
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();
      dispatch(login({ email: user.email, uid: user.uid, name: userData.name }));
      setError('');
      setSnackbarMessage('Login successful!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setTimeout(() => {
        setLoading(false)
        navigate('/');
      }, 1000);
    } catch (error) {
      setLoading(false)
      setError('Invalid email or password');
      setSnackbarMessage('Login failed. Invalid email or password.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
  
  const handleLogout = async () => {
    try {
      console.log("logout")
      await signOut(auth);
      console.log("logout")
      dispatch(logout());
      navigate('/login');
      setSnackbarMessage('Logout successful!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

    } catch (error) {
      setError(error.message);
      setSnackbarMessage('Logout failed.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="sm" sx={{minHeight: '50vh'}}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        sx={{ zIndex: 1300 }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </div>
      ) : (
        <div>
          <Box sx={{ mt: 14, mb: 5}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {!isLoggedIn ? (
            <Box sx={{ width: '100%' }}>
              <Typography variant="h4" sx={{ color: MAIN_COLOR }}>{isRegistering ? t('login') : t('signUp')}</Typography>
              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
              {!isRegistering && (
                <TextField
                  label={t('name')}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ mt: 2 }}
                />
              )}
              <TextField
                label={t('email')}
                variant="outlined"
                margin="normal"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mt: 2 }}
              />
              <TextField
                label={t('password')}
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mt: 2 }}
              />
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: MAIN_COLOR, '&:hover': { backgroundColor: '#f7a01c' } }}
                fullWidth
                
                onClick={isLoggedIn ? handleLogout: isRegistering ? handleLogin : handleRegister}
              >
                {isRegistering ? t('login') : t('signUp')}
              </Button>
              <Typography
                onClick={() => setIsRegistering(!isRegistering)}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  cursor: 'pointer',
                  marginTop: '20px',
                  textDecoration: 'none',
                }}
                onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                onMouseOut={(e) => e.target.style.textDecoration = 'none'}
              >
                {isRegistering ? t('signUpText') : t('loginText')}
              </Typography>
            </Box>
          ) : (
            <Box>
            </Box>
          )}
        </Box>
      </Box>
        </div>
      )}
    </Container>
  );
};

export default Login;
