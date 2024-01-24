import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import NodeCard from './NodeCard';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setNodes } from '../../redux/slices/nodesSlice';

const NodeDisplay = ({ selectedTagIds }) => {
  const dispatch = useDispatch();
  const nodes = useSelector((state: RootState) => state.nodes.nodes);
  const [displayedNodes, setDisplayedNodes] = useState([]);

  useEffect(() => {
    async function fetchAndDisplayNodes() {
      let fetchedNodes = [];
      if (selectedTagIds.length === 0) {
        fetchedNodes = await window.electron.getNodes();
      } else {
        fetchedNodes = await window.electron.getNodesByTagIds(selectedTagIds);
      }
      if (!fetchedNodes || fetchedNodes.length === 0) {
        console.error('No nodes were fetched from the database.');
      } else {
        dispatch(setNodes(fetchedNodes)); // Update the nodes state in Redux store
        setDisplayedNodes(fetchedNodes); // Update displayed nodes
      }
    }
    fetchAndDisplayNodes();
  }, [dispatch, selectedTagIds]);

  return (
    <Grid container spacing={1} style={{ padding: '8px' }}>
      {displayedNodes.map((node, index) => (
        <Grid item xs={12} key={node.NodeID || index}>
          <NodeCard
            nodeId={node.NodeID}
            title={node.Title}
            description={node.Description}
            tags={node.Tags}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default NodeDisplay;
