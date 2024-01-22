import React, { useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const DropOverlay = ({ children, width, height }) => {
    const overlayRef = useRef(null);
    const [nodePositions, setNodePositions] = useState([]);

    const fetchNodePositions = async () => {
        const positions = await window.electron.getAllNodePositions();
        setNodePositions(positions);
    };

    useEffect(() => {
        fetchNodePositions();
    }, []);

    const [, drop] = useDrop(() => ({
        accept: "node",
        drop: (item, monitor) => {
            const clientOffset = monitor.getClientOffset();
            if (clientOffset && overlayRef.current) {
                const rect = overlayRef.current.getBoundingClientRect();
                const x = clientOffset.x - rect.left;
                const y = clientOffset.y - rect.top;
                console.log(`Dropped node at x: ${x}, y: ${y}`);
                // Here you might want to save the new node position to the database
                window.electron.saveNodePosition(item.id, x, y);
                fetchNodePositions(); // Refresh positions after drop
            }
        },
    }));

    // Attach the drop ref to the overlay div
    drop(overlayRef);

    return (
        <Box sx={{ width: width, height: height, position: 'relative' }}>
            {children}
            {nodePositions.map((position) => (
                <Box
                    key={position.PositionID}
                    sx={{
                        position: 'absolute',
                        left: `${position.X}px`,
                        top: `${position.Y}px`,
                        width: 50, // Adjust the size of the circle
                        height: 50, // Adjust the size of the circle
                        backgroundColor: 'primary.main', // Use theme colors
                        borderRadius: '50%', // Make it a circle
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white', // Adjust text color
                    }}
                >
                    <Typography variant="caption">
                        {position.NodeID} {/* Display the node ID or any other data */}
                    </Typography>
                </Box>
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
