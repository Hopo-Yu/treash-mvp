import React, { useRef, useEffect} from 'react';
import { useDrop } from 'react-dnd';
import Box from '@mui/material/Box';
import NodePositionCircle from '../../src/components/NodePositionCircle'; 
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Update the import path as needed
import { selectNode, setNodePositions } from '../redux/slices/nodesSlice'; // Update the import path as needed

import { Node} from '../types/types';

interface DropOverlayProps {
  children: React.ReactNode;
  width: string | number;
  height: string | number;
  selectedTagIds: number[];
}

const DropOverlay: React.FC<DropOverlayProps> = ({ children, width, height, selectedTagIds }) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const nodePositions = useSelector((state: RootState) => state.nodes.nodePositions);

    const fetchNodePositions = async () => {
      let positions;
      if (selectedTagIds.length > 0) {
          
          // Fetch nodes based on selected tag IDs first
          const nodes: Node[] = await window.electron.getNodesByTagIds(selectedTagIds);
          const uniqueNodeIds: number[] = [...new Set(nodes.map(node => node.NodeID))];
          
          // Then fetch node positions based on the node IDs
          positions = await window.electron.getNodePositionsByNodeIds(uniqueNodeIds);
      } else {
          // Fetch all positions if no tag is selected
          positions = await window.electron.getAllNodePositions();
      }
      dispatch(setNodePositions(positions));
  };
  

    const [, drop] = useDrop(() => ({
        accept: "node",
        drop: (item: { id: number }, monitor) => {
            const clientOffset = monitor.getClientOffset();
            if (clientOffset && overlayRef.current) {
                const rect = overlayRef.current.getBoundingClientRect();
                const x = clientOffset.x - rect.left;
                const y = clientOffset.y - rect.top;
                console.log(`Dropped node at x: ${x}, y: ${y}`);
                
                // Save the position in the database
                window.electron.saveNodePosition(item.id, x, y);
                // Fetch updated positions
                fetchNodePositions();
            }
        },
    }), [nodePositions]);

    useEffect(() => {
      fetchNodePositions();
    }, [selectedTagIds, nodePositions]); // Add dispatch to dependency array


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
