import React, { useEffect, useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import NodeCard from './NodeCard';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setNodes } from '../../redux/slices/nodesSlice';

const NodeDisplay = ({ selectedTagIds }) => {
  const dispatch = useDispatch();
  const nodes = useSelector((state: RootState) => state.nodes.nodes);
  const selectedNodeId = useSelector((state: RootState) => state.nodes.selectedNodeId); // Get the selected node ID from Redux
  const [displayedNodes, setDisplayedNodes] = useState([]);
  const nodeRefs = useRef({});

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

  useEffect(() => {
    // Scroll to the selected node when the selectedNodeId changes
    if (selectedNodeId && nodeRefs.current[selectedNodeId]) {
      nodeRefs.current[selectedNodeId].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedNodeId]);

  return (
    <Grid container spacing={1} style={{ padding: '8px' }}>
      {displayedNodes.map((node, index) => (
        <Grid item xs={12} key={node.NodeID || index} ref={(el) => (nodeRefs.current[node.NodeID] = el)}>
          <NodeCard
            nodeId={node.NodeID}
            title={node.Title}
            description={node.Description}
            tags={node.Tags}
            isSelected={selectedNodeId === node.NodeID}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default NodeDisplay;
