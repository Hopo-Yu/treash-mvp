import React from 'react';
import Box from '@mui/material/Box';
import MapComponent from './MapComponent';
import TopBarComponent from './TopBarComponent';
import '../../styles/WorldMapVisualization.scss'; // Importing the Sass file

const WorldMapVisualization: React.FC = () => {
  return (
    <Box className="world-map-visualization">
      <TopBarComponent />
      <MapComponent />
    </Box>
  );
};

export default WorldMapVisualization;
