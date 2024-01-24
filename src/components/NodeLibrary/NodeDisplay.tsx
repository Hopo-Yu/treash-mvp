// NodeDisplay.tsx
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import NodeCard from './NodeCard';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setNodes } from '../../redux/slices/nodesSlice';

const NodeDisplay = ({ filteredNodeIds }) => {
  const dispatch = useDispatch();
  const nodes = useSelector((state: RootState) => state.nodes.nodes);
  const [displayedNodes, setDisplayedNodes] = useState([]);

  useEffect(() => {
    if (!nodes.length) {
      // Fetch nodes only if the nodes state is empty
      window.electron.getNodes()
        .then(fetchedNodes => {
          if (!fetchedNodes || fetchedNodes.length === 0) {
            console.error('No nodes were fetched from the database.');
          }
          dispatch(setNodes(fetchedNodes)); // Dispatch setNodes action
        })
        .catch(error => {
          console.error('Failed to fetch nodes:', error);
        });
    }
  }, [dispatch, nodes.length]);

  useEffect(() => {
    // If filteredNodeIds is empty, display all nodes, else filter nodes based on filteredNodeIds
    if (filteredNodeIds.length === 0) {
      setDisplayedNodes(nodes); // Display all nodes if no filter is applied
    } else {
      const filteredNodes = nodes.filter(node => filteredNodeIds.includes(node.NodeID));
      setDisplayedNodes(filteredNodes);
    }
  }, [filteredNodeIds, nodes]);

  return (
    <Grid container spacing={1} style={{ padding: '8px' }}>
      {displayedNodes.map((node, index) => (
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
