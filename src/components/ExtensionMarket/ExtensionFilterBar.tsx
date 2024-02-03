import React from 'react';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const categories = ['All', 'Productivity', 'Visualization', 'Utility'];

const ExtensionFilterBar = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
      <ButtonGroup variant="text" aria-label="extension categories">
        {categories.map((category) => (
          <Button key={category}>{category}</Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default ExtensionFilterBar;
