import React, { useState } from 'react';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import SocialLoginButtons from './SocialLoginButtons';

const Login: React.FC = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Your login logic here
    // If error, call setError with the error message
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: theme.spacing(4) }}>
      <Typography variant="h4" gutterBottom component="h1">Login</Typography>
      <TextField 
        label="Email" 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!error}
        helperText={error}
        sx={{ mb: 2, width: '100%' }} 
      />
      <TextField 
        label="Password" 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!error}
        helperText={error}
        sx={{ mb: 2, width: '100%' }} 
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleLogin}
        sx={{ mb: 2, width: '100%' }}
      >
        Login
      </Button>
      <SocialLoginButtons />
    </Box>
  );
};

export default Login;
