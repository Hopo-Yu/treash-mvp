import React, { useState, useEffect } from 'react';
import { Tooltip, Menu, MenuItem } from '@mui/material';

interface NodePositionCircleProps {
  positionID: number;
  nodeID: number;
  x: number;
  y: number;
  onClick: (nodeID: number) => void;
  onDoubleClick: (nodeID: number) => void;
  onMouseEnter: (nodeID: number) => void;
  onMouseLeave: (nodeID: number) => void;
  onDelete: () => void;
}

const NodePositionCircle: React.FC<NodePositionCircleProps> = ({
  positionID,
  nodeID,
  x,
  y,
  onClick,
  onDoubleClick,
  onMouseEnter,
  onMouseLeave,
  onDelete
}) => {
    const [nodeTitle, setNodeTitle] = useState('');
    const [contextMenu, setContextMenu] = useState<{ mouseX: number; mouseY: number } | null>(null);

    useEffect(() => {
        const fetchNodeTitle = async () => {
            const title = await window.electron.getNodeTitle(nodeID);
            setNodeTitle(title || 'Unnamed Node');
        };

        fetchNodeTitle();
    }, [nodeID]);

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
            ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
            : null, // Close menu if already open
        );
    };

    const handleClose = () => {
        setContextMenu(null);
    };

    const handleDelete = async () => {
        await window.electron.deleteNodePosition(positionID);
        onDelete();
    };

    return (
        <>
            <Tooltip title={nodeTitle} placement="top">
                <div
                    onContextMenu={handleContextMenu}
                    onClick={() => onClick(nodeID)}
                    onDoubleClick={() => onDoubleClick(nodeID)}
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
            <Menu
                keepMounted
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                    ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                    : undefined
                }
            >
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
        </>
    );
};

export default NodePositionCircle;
