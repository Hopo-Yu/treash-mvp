import React, { useRef, useEffect, useState} from 'react';
import { useDrop } from 'react-dnd';
import Box from '@mui/material/Box';
import NodePositionCircle from './NodePositionCircle'; import { Node} from '../../types/types';
import { useDispatch } from 'react-redux';
import { selectNode } from '../../redux/slices/nodesSlice'; 

interface DropOverlayProps {
  children: React.ReactNode;
  width: string | number;
  height: string | number;
  selectedTagIds: number[];
}

const DropOverlay: React.FC<DropOverlayProps> = ({ children, width, height, selectedTagIds }) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const [nodePositions, setNodePositions] = useState([]);
    const dispatch = useDispatch();
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const fetchNodePositions = async () => {
      let positions;
      if (selectedTagIds.length > 0) {
        const nodes = await window.electron.getNodesByTagIds(selectedTagIds) as Node[];

        const uniqueNodeIds = [...new Set(nodes.map(node => node.NodeID))];
        positions = await window.electron.getNodePositionsByNodeIds(uniqueNodeIds);
      } else {
        // Fetch all positions if no tag is selected
        positions = await window.electron.getAllNodePositions();
      }
      setNodePositions(positions);
    };
  

    const [, drop] = useDrop(() => ({
      accept: "node",
      drop: (item: { id: number }, monitor) => {
        const clientOffset = monitor.getClientOffset();
        if (clientOffset && overlayRef.current) {
          const rect = overlayRef.current.getBoundingClientRect();
          const x = clientOffset.x - rect.left;
          const y = clientOffset.y - rect.top;
          
          window.electron.saveNodePosition(item.id, x, y).then(fetchNodePositions);
        }
      },
    }), [selectedTagIds]);

    useEffect(() => {
      fetchNodePositions();
    }, [selectedTagIds, refreshTrigger]);
  
    const handleDelete = () => setRefreshTrigger(prev => prev + 1);

    const handleClick = (nodeID:number) => {
        console.log('Clicked on node:', nodeID);
        // Handle left-click logic here
    };

    const handleDoubleClick = (nodeID:number) => {
      dispatch(selectNode(nodeID)); // Dispatch action to select the node
  };
    const handleMouseEnter = (nodeID:number) => {
        console.log('Mouse entered node:', nodeID);
        // Handle mouse enter logic here
    };

    const handleMouseLeave = (nodeID:number) => {
        console.log('Mouse left node:', nodeID);
        // Handle mouse leave logic here
    };

    // Attach the drop ref to the overlay div
    drop(overlayRef);

    return (
        <Box sx={{ width: width, height: height, position: 'relative' }}>
            {children}
            {nodePositions.map((position) => (
                <NodePositionCircle
                    key={position.PositionID}
                    positionID={position.PositionID}
                    nodeID={position.NodeID}
                    x={position.X}
                    y={position.Y}
                    onClick={handleClick}
                    onDoubleClick={handleDoubleClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onDelete={handleDelete}
                />
            ))}
            <div 
                ref={overlayRef} 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'all', // Allow this div to receive pointer events
                    zIndex: 10 // Ensure it's above other elements
                }}
            />
        </Box>
    );
};

export default DropOverlay;
