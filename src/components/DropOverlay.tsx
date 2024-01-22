import React, { useRef, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import Box from '@mui/material/Box';
import NodePositionCircle from './NodePositionCircle'; // Import the component

const DropOverlay = ({ children, width, height }) => {
    const overlayRef = useRef(null);
    const [nodePositions, setNodePositions] = useState([]);

    const fetchNodePositions = async () => {
      const positions = await window.electron.getAllNodePositions();
      setNodePositions(positions);
    };
  
    const [, drop] = useDrop(() => ({
        accept: "node",
        drop: (item, monitor) => {
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
    }), [nodePositions]); // Ensure the drop effect updates when nodePositions changes

    useEffect(() => {
        // Function to fetch and log positions
        fetchNodePositions();
    }, []); // Fetch node positions on component mount

    // Handler functions for NodePositionCircle
    const handleRightClick = (nodeID) => {
        console.log('Right-clicked on node:', nodeID);
        // Handle right-click logic here
    };

    const handleClick = (nodeID) => {
        console.log('Clicked on node:', nodeID);
        // Handle left-click logic here
    };

    const handleMouseEnter = (nodeID) => {
        console.log('Mouse entered node:', nodeID);
        // Handle mouse enter logic here
    };

    const handleMouseLeave = (nodeID) => {
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
                    nodeID={position.NodeID}
                    x={position.X}
                    y={position.Y}
                    onRightClick={handleRightClick}
                    onClick={handleClick}
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
