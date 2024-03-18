import React, { useState} from 'react';
import Box from '@mui/material/Box';
import MapComponent from './MapComponent';
import DropOverlay from './DropOverlay';
import TagFilter from './TagFilter'; 
import '../../styles/WorldMapVisualization.scss'; 

const WorldMapVisualization: React.FC = () => {
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

  

  const handleSelectedTagsChange = (tagIds: number[]) => {
    
    setSelectedTagIds(tagIds);
  };

  return (
    <Box className="world-map-visualization">
      {/* Include TagFilter and pass handleSelectedTagsChange as a prop */}
      <TagFilter selectedTagIds={selectedTagIds} onSelectedTagsChange={handleSelectedTagsChange} />

      {/* Pass selectedTagIds to DropOverlay */}
      <DropOverlay width="960px" height="660px" selectedTagIds={selectedTagIds}>
        <MapComponent />
      </DropOverlay> 
    </Box>
  );
};

export default WorldMapVisualization;
