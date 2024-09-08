import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import { login, logout } from '../../store/authSlice';
import { auth, db } from '../../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



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
      navigate('/');
      setError('');
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
    <Container maxWidth="sm" style={{marginTop: '150px'}}>
      <Box sx={{ mt: 4 }}>
        <Box sx={{ mb: 11 }}>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {!isLoggedIn ? (
            <Box>
              <Typography variant="h4">{isRegistering ? t('signUp') : t('login')}</Typography>
              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
              {isRegistering && (
                <TextField
                  label={t('name')}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
              <TextField
                label={t('email')}
                variant="outlined"
                margin="normal"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label={t('password')}
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={isRegistering ? handleRegister : handleLogin}
                sx={{ mt: 2 }}
              >
                {isRegistering ? t('signUp') : t('login')}
              </Button>
              <Button
                variant="text"
                color="secondary"
                fullWidth
                onClick={() => setIsRegistering(!isRegistering)}
                sx={{ mt: 2 }}
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
