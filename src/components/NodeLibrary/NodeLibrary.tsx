import React, { useState } from 'react';
import NodeSearchBar from './NodeSearchBar';
import TagFilter from '../TagFilter';
import NodeDisplay from './NodeDisplay';
import Box from '@mui/material/Box';

const NodeLibrary = () => {
  const [selectedTagIds, setSelectedTagIds] = useState([]);

  const handleSelectedTagsChange = (tagIds) => {
    setSelectedTagIds(tagIds);
  };

  return (
    <Box className="node-library-container" sx={{ padding: 1 }}>
      <NodeSearchBar />
      <Box className="tag-filter" sx={{ marginTop: 1 }}>
        <TagFilter onSelectedTagsChange={handleSelectedTagsChange} />
      </Box>
      <NodeDisplay selectedTagIds={selectedTagIds} />
    </Box>
  );
};

export default NodeLibrary;
