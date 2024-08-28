
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import { login, logout } from '../../store/authSlice';
import { auth, db } from '../../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const Login = () => {
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
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Box sx={{ mb: 11 }}>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {!isLoggedIn ? (
            <Box>
              <Typography variant="h4">{isRegistering ? 'Sign Up' : 'Log In'}</Typography>
              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
              {isRegistering && (
                <TextField
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
              <TextField
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
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
                {isRegistering ? 'Sign Up' : 'Log In'}
              </Button>
              <Button
                variant="text"
                color="secondary"
                fullWidth
                onClick={() => setIsRegistering(!isRegistering)}
                sx={{ mt: 2 }}
              >
                {isRegistering ? 'Log In' : 'Sign Up'}
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
