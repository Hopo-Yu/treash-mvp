import React from 'react';
import NodeSearchBar from './NodeSearchBar';
import TagFilter from './TagFilter';
import NodeDisplay from './NodeDisplay';
import Box from '@mui/material/Box';

const NodeLibrary = () => {
  return (
    <Box className="node-library-container" sx={{ padding: 1 }}>
      <NodeSearchBar />
      <Box className="tag-filter" sx={{ marginTop: 1 }}>
        <TagFilter />
      </Box>
      <NodeDisplay />
    </Box>
  );
};

export default NodeLibrary;
