// NodePositionCircle.tsx
import React, { useState, useEffect } from 'react';
import { Box, Tooltip } from '@mui/material';

const NodePositionCircle = ({ nodeID, x, y, onRightClick, onClick, onMouseEnter, onMouseLeave }) => {
    const [nodeTitle, setNodeTitle] = useState('');

    useEffect(() => {
        const fetchNodeTitle = async () => {
            const title = await window.electron.getNodeTitle(nodeID);
            console.log(`Fetched title for node ${nodeID}:`, title); // Diagnostic log
            setNodeTitle(title || 'Unnamed Node');
        };

        fetchNodeTitle();
    }, [nodeID]);

    return (
        <Tooltip title={nodeTitle} placement="top">
            <div  // Changed from Box to div for diagnostic purposes
                onContextMenu={(e) => {
                    e.preventDefault();
                    onRightClick(nodeID);
                }}
                onClick={() => onClick(nodeID)}
                onMouseEnter={() => onMouseEnter(nodeID)}
                onMouseLeave={() => onMouseLeave(nodeID)}
                style={{
                    position: 'absolute',
                    top: `${y}px`,
                    left: `${x}px`,
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#3f51b5',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 20,  // Ensure it's above the overlay
                    '&:hover': {
                        backgroundColor: '#303f9f',
                    },
                }}
            />
        </Tooltip>
    );
};

export default NodePositionCircle;
