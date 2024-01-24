// NodeLibrary.tsx
import React, { useState, useEffect } from 'react';
import NodeSearchBar from './NodeSearchBar';
import TagFilter from '../TagFilter';
import NodeDisplay from './NodeDisplay';
import Box from '@mui/material/Box';

const NodeLibrary = () => {
  const [filteredNodeIds, setFilteredNodeIds] = useState([]);

  const handleNodeIdsChange = (nodeIds) => {
    setFilteredNodeIds(nodeIds.map(node => node.NodeID)); // Ensure you're setting an array of IDs
  };

  return (
    <Box className="node-library-container" sx={{ padding: 1 }}>
      <NodeSearchBar />
      <Box className="tag-filter" sx={{ marginTop: 1 }}>
        <TagFilter onNodeIdsChange={handleNodeIdsChange} />
      </Box>
      <NodeDisplay filteredNodeIds={filteredNodeIds} />
    </Box>
  );
};

export default NodeLibrary;
