import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import MapComponent from './MapComponent';
import DropOverlay from '../DropOverlay';
import TagFilter from '../TagFilter'; // Import TagFilter component
import '../../styles/WorldMapVisualization.scss'; // Importing the Sass file

const WorldMapVisualization: React.FC = () => {
  const [selectedTagIds, setSelectedTagIds] = useState([]);

  useEffect(() => {
    console.log("selectedTagIds state after setSelectedTagIds:", selectedTagIds);
  }, [selectedTagIds]); // This useEffect will run whenever selectedTagIds changes

  const handleSelectedTagsChange = (tagIds) => {
    console.log("Selected Tag IDs in WorldMapVisualization before setting state:", tagIds);
    setSelectedTagIds(tagIds);
  };

  return (
    <Box className="world-map-visualization">
      {/* Include TagFilter and pass handleSelectedTagsChange as a prop */}
      <TagFilter onSelectedTagsChange={handleSelectedTagsChange} />

      {/* Pass selectedTagIds to DropOverlay */}
      <DropOverlay width="960px" height="660px" selectedTagIds={selectedTagIds}>
        <MapComponent />
      </DropOverlay> 
    </Box>
  );
};

export default WorldMapVisualization;
