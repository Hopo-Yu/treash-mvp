import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ExtensionCard from './ExtensionCard';
import ExtensionFilterBar from './ExtensionFilterBar';

const ExtensionMarket = ({ onOpenDetail }) => {
  // This would be fetched from an API or server in a real-world app
  const extensions = [
    { id: 1, name: '3D World Map', description: 'Explore the world in 3D', image: 'image-url-1' },
    { id: 2, name: 'Timeline History', description: 'Visualize historical events', image: 'image-url-2' },
    // ... other extensions
  ];

  const handleCardClick = (extensionId) => {
    onOpenDetail(extensionId);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <ExtensionFilterBar />
      <Grid container spacing={2}>
        {extensions.map((extension) => (
          <Grid item xs={12} sm={6} md={4} key={extension.id}>
            <ExtensionCard {...extension} onClick={() => handleCardClick(extension.id)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ExtensionMarket;
