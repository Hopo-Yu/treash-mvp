import React from 'react';
import Box from '@mui/material/Box';
import MapComponent from './MapComponent';
import TopBarComponent from './TopBarComponent';
import DropOverlay from '../DropOverlay';
import '../../styles/WorldMapVisualization.scss'; // Importing the Sass file

const WorldMapVisualization: React.FC = () => {
  return (
    <Box className="world-map-visualization">
      {/* <TopBarComponent /> */}
      <DropOverlay width="960px" height="660px">
        <MapComponent />
      </DropOverlay> 
    </Box>
  );
};

export default WorldMapVisualization;
