// NodeLibrary.tsx
import React, { useState, useEffect } from 'react';
import NodeSearchBar from './NodeSearchBar';
import TagFilter from './TagFilter';
import NodeDisplay from './NodeDisplay';
import Box from '@mui/material/Box';

const NodeLibrary = () => {
  const [filteredNodeIds, setFilteredNodeIds] = useState([]);

  useEffect(() => {
    console.log("filteredNodeIds state updated:", filteredNodeIds); // Log state when it updates
  }, [filteredNodeIds]);

  const handleNodeIdsChange = (nodeIds) => {
    console.log("Node IDs received in handleNodeIdsChange:", nodeIds); // Log received nodeIds
    setFilteredNodeIds(nodeIds.map(node => node.NodeID)); // Ensure you're setting an array of IDs
    console.log("filteredNodeIds state after setFilteredNodeIds:", filteredNodeIds); // Log state after setting
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
