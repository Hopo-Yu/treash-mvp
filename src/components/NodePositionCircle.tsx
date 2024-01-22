import React from 'react';
import { Box, Typography } from '@mui/material';

const NodePositionCircle = ({ nodeID, x, y, onRightClick, onClick, onMouseEnter, onMouseLeave }) => {
    return (
        <Box
            onContextMenu={(e) => {
                e.preventDefault(); // Prevent the browser context menu
                onRightClick(nodeID);
            }}
            onClick={() => onClick(nodeID)}
            onMouseEnter={() => onMouseEnter(nodeID)}
            onMouseLeave={() => onMouseLeave(nodeID)}
            sx={{
                position: 'absolute',
                top: y,
                left: x,
                width: 20, // You can adjust the size
                height: 20, // You can adjust the size
                bgcolor: 'primary.main',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover': {
                    bgcolor: 'primary.dark',
                },
            }}
        >
            <Typography variant="caption" sx={{ color: 'white' }}>
                {/* You can display the nodeID or any other info here */}
                {nodeID}
            </Typography>
        </Box>
    );
};

export default NodePositionCircle;
