import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import { login, logout } from '../../store/authSlice';
import { auth, db } from '../../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const ORANGE_COLOR = '#f9be32';

const Login = () => {
  const { t } = useTranslation();
  const [isRegistering, setIsRegistering] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: user.email,
      });

      dispatch(login({ email: user.email, uid: user.uid, name: name }));
      setError('');
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();

      dispatch(login({ email: user.email, uid: user.uid, name: userData.name }));
      setError('');
      navigate('/');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 14, mb: 5 }}>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {!isLoggedIn ? (
            <Box sx={{ width: '100%' }}>
              <Typography variant="h4" sx={{ color: ORANGE_COLOR }}>{isRegistering ? t('signUp') : t('login')}</Typography>
              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
              {isRegistering && (
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
                sx={{ mt: 2, backgroundColor: ORANGE_COLOR, '&:hover': { backgroundColor: '#f7a01c' } }}
                fullWidth
                onClick={isRegistering ? handleRegister : handleLogin}
              >
                {isRegistering ? t('signUp') : t('login')}
              </Button>
              <Button
                variant="text"
                sx={{ mt: 2, color: ORANGE_COLOR }}
                fullWidth
                onClick={() => setIsRegistering(!isRegistering)}
              >
                {isRegistering ? t('login') : t('signUp')}
              </Button>
            </Box>
          ) : (
            <Box>

            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Login;