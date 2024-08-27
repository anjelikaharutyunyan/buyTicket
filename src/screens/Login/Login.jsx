<<<<<<< HEAD
import React, { useState } from 'react';
=======
import { useState } from 'react';
>>>>>>> main
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Typography, Container, Box, Alert } from '@mui/material';
import { login, logout } from '../../store/authSlice'; 

const Login = () => {
  const [users, setUsers] = useState([]);
  const [isRegistering, setIsRegistering] = useState(true);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleRegister = () => {
    if (name && username && password) {
      const userExists = users.some(user => user.username === username);
      if (userExists) {
        setError('User already exists');
        return;
      }
      setUsers([...users, { name, username, password }]);
      setName('');
      setUsername('');
      setPassword('');
      setError('');
      setIsRegistering(false);
    } else {
      setError('Please enter name, username, and password');
    }
  };

  const handleLogin = () => {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      dispatch(login(user));
      setUsername('');
      setPassword('');
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    dispatch(logout()); 
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Box sx={{ mb: 11 }}>
        </Box>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {!isLoggedIn ? (
            <Box>
              <Typography variant="h4">{isRegistering ? 'Sign Up' : 'LogIn'}</Typography>
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
                label="Username"
                variant="outlined"
                margin="normal"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                {isRegistering ? 'Sign Up' : 'Login'}
              </Button>
              <Button
                variant="text"
                color="secondary"
                fullWidth
                onClick={() => setIsRegistering(!isRegistering)}
                sx={{ mt: 2 }}
              >
                {isRegistering ? 'Login' : 'Sign Up'}
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography variant="h4">Welcome, {currentUser.name}!</Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                sx={{ mt: 2 }}
              >
                Logout
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
