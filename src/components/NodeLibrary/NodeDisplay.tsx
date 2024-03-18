import React, { useEffect, useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import NodeCard from './NodeCard/NodeCard';
import { useSelector} from 'react-redux';
import { RootState } from '../../redux/store';

// Define props interface for NodeDisplay component
interface NodeDisplayProps {
  selectedTagIds: number[];
  searchKeyword: string;
}

// Extend HTMLElement type for nodeRefs to include NodeID as a key
interface NodeRefs {
  [key: number]: HTMLElement | null;
}


const NodeDisplay: React.FC<NodeDisplayProps> = ({ selectedTagIds, searchKeyword}) => {
  const selectedNodeId = useSelector((state: RootState) => state.nodes.selectedNodeId); 
  const [displayedNodes, setDisplayedNodes] = useState([]);
  const nodeRefs = useRef<NodeRefs>({});
  const refreshTrigger = useSelector((state: RootState) => state.nodes.nodeDisplayRefreshTrigger);

  useEffect(() => {
    async function fetchAndDisplayNodes() {
      let fetchedNodes = [];
  
      
      if (searchKeyword || selectedTagIds.length > 0) {
        fetchedNodes = await window.electron.searchNodes(searchKeyword, selectedTagIds) as Node[];
      } else {
        fetchedNodes = await window.electron.getNodes();
      }
  
      setDisplayedNodes(fetchedNodes);
      console.log("selectedTagIds");
    }
  
    fetchAndDisplayNodes();
  }, [selectedTagIds, searchKeyword, refreshTrigger]);
  

  useEffect(() => {
    if (selectedNodeId !== undefined && nodeRefs.current[selectedNodeId]) {
      const nodeElement = nodeRefs.current[selectedNodeId];
      if (nodeElement) { 
        nodeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedNodeId]);

  
  

  return (
    <Grid container spacing={1} style={{ padding: '8px' }}>
      {displayedNodes.map((node, index) => (
        <Grid item xs={12} key={node.NodeID || index} ref={(el) => (nodeRefs.current[node.NodeID] = el)}>
          <NodeCard
            nodeId={node.NodeID}
            isSelected={selectedNodeId === node.NodeID}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default NodeDisplay;
