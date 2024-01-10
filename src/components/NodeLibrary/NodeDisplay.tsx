// NodeDisplay.tsx
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import NodeCard from './NodeCard';

const NodeDisplay = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    window.electron.getNodes()
      .then(fetchedNodes => {
        console.log('Nodes received in NodeDisplay:', fetchedNodes);
        setNodes(fetchedNodes);
      })
      .catch(error => console.error('Failed to fetch nodes:', error));
  }, []);
  

  return (
    <Grid container spacing={1} style={{ padding: '8px' }}>
      {nodes.map((node, index) => (
        <Grid item xs={12} key={node.NodeID || index}>
          <NodeCard 
            title={node.Title} 
            description={node.Description} 
            tags={node.Tags} // Assuming each node has a Tags array
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default NodeDisplay;
