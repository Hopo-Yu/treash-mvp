// NodeDisplay.tsx
import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import NodeCard from './NodeCard';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setNodes } from '../../redux/slices/nodesSlice';

const NodeDisplay = () => {
  const dispatch = useDispatch();
  const nodes = useSelector((state: RootState) => state.nodes.nodes);

  useEffect(() => {
    window.electron.getNodes()
      .then(fetchedNodes => {
        console.log('Nodes received in NodeDisplay:', fetchedNodes);
        dispatch(setNodes(fetchedNodes)); // Dispatch setNodes action
      })
      .catch(error => console.error('Failed to fetch nodes:', error));
  }, [dispatch]);

  return (
    <Grid container spacing={1} style={{ padding: '8px' }}>
      {nodes.map((node, index) => (
        <Grid item xs={12} key={node.NodeID || index}>
          <NodeCard
            nodeId={node.NodeID}
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
