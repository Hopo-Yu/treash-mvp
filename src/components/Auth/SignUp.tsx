import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import SocialLoginButtons from './SocialLoginButtons';

const SignUp: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>Sign Up</Typography>
      <TextField label="Email" type="email" sx={{ mb: 2 }} />
      <TextField label="Password" type="password" sx={{ mb: 2 }} />
      <Button variant="contained" color="primary" sx={{ mb: 2 }}>Sign Up</Button>
      <SocialLoginButtons />
    </Box>
  );
};

export default SignUp;
