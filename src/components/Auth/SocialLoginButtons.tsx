import React from 'react';
import { Box, Button } from '@mui/material';

const SocialLoginButtons: React.FC = () => {
  const socialLogins = [
    { name: 'Google', color: 'error' },
    { name: 'Facebook', color: 'primary' },
    { name: 'GitHub', color: 'default' },
    { name: 'Twitter', color: 'info' },
    // Add more as needed
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {socialLogins.map((social) => (
        <Button key={social.name} variant="contained"  sx={{ mb: 1 }}>
          {`Sign in with ${social.name}`}
        </Button>
      ))}
    </Box>
  );
};

export default SocialLoginButtons;
