// NodePositionCircle.tsx
import React, { useState, useEffect } from 'react';
import { Tooltip } from '@mui/material';

const NodePositionCircle = ({ nodeID, x, y, onRightClick, onClick, onDoubleClick, onMouseEnter, onMouseLeave }) => {
    const [nodeTitle, setNodeTitle] = useState('');

    useEffect(() => {
        const fetchNodeTitle = async () => {
            const title = await window.electron.getNodeTitle(nodeID);
            setNodeTitle(title || 'Unnamed Node');
        };

        fetchNodeTitle();
    }, [nodeID]);

    return (
        <Tooltip title={nodeTitle} placement="top">
            <div
                onContextMenu={(e) => {
                    e.preventDefault();
                    onRightClick(nodeID);
                }}
                onClick={() => onClick(nodeID)}
                onDoubleClick={() => onDoubleClick(nodeID)}  // Add this line to handle double-clicks
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
                    zIndex: 20,
                }}
            />
        </Tooltip>
    );
};

export default NodePositionCircle;
