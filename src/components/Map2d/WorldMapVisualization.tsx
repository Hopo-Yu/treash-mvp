import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import MapComponent from './MapComponent';
import DropOverlay from '../DropOverlay';
import TagFilter from '../TagFilter'; // Import TagFilter component
import '../../styles/WorldMapVisualization.scss'; // Importing the Sass file

const WorldMapVisualization: React.FC = () => {
  const [filteredNodeIds, setFilteredNodeIds] = useState([]);

  useEffect(() => {
    console.log("filteredNodeIds state after setFilteredNodeIds:", filteredNodeIds);
  }, [filteredNodeIds]); // This useEffect will run whenever filteredNodeIds changes

  const handleNodeIdsChange = (nodeIds) => {
    console.log("Filtered Node IDs in WorldMapVisualization before setting state:", nodeIds);
    setFilteredNodeIds(nodeIds);
  };


  return (
    <Box className="world-map-visualization">
      {/* Include TagFilter and pass handleNodeIdsChange as a prop */}
      <TagFilter onNodeIdsChange={handleNodeIdsChange} />

      {/* Pass filteredNodeIds to DropOverlay */}
      <DropOverlay width="960px" height="660px" filteredNodeIds={filteredNodeIds}>
        <MapComponent />
      </DropOverlay> 
    </Box>
  );
};

export default WorldMapVisualization;
