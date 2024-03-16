// NodeCard.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Card, CardContent, Typography, IconButton, Chip, List,
  ListItem, ListItemText, ListItemSecondaryAction, Menu, MenuItem
} from '@mui/material';
import {
  Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon,
  ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon,
  RemoveCircleOutline as RemoveCircleOutlineIcon,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import EditNodeModal from './EditNodeModal';
import TagManagementModal from '../TagManagementModal';
import { useDrag } from 'react-dnd';
import { selectNode } from '../../redux/slices/nodesSlice'; 
import { Tag, FilePath } from '../../types/types';

interface NodeCardProps {
  nodeId: number;
  title: string;
  description: string;
  tags: Tag[];
  isSelected: boolean;
}



const NodeCard: React.FC<NodeCardProps> = ({ nodeId, title, description, tags = [], isSelected }) => {
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isTagManagementModalOpen, setIsTagManagementModalOpen] = useState<boolean>(false);
  const [nodeTags, setNodeTags] = useState<Tag[]>([]);
  const [filePaths, setFilePaths] = useState<FilePath[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  // State to manage collapsible sections
  const [isFilesExpanded, setIsFilesExpanded] = useState<boolean>(false);
  // const [isNodesExpanded, setIsNodesExpanded] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilePathId, setSelectedFilePathId] = useState(null);
  
  useEffect(() => {
    const fetchNodeTags = async () => {
      const fetchedNodeTags: Tag[] = await window.electron.getNodeTags(nodeId);
      setNodeTags(fetchedNodeTags);
    };

    const fetchFilePaths = async () => {
      const paths: FilePath[] = await window.electron.getFilePathsByNodeId(nodeId);
      setFilePaths(paths);
    };

    fetchNodeTags();
    fetchFilePaths();
    // Assuming the event handlers are correctly typed or use any necessary casting
  }, [nodeId]);

  // Function to open the edit modal
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  // Function to open the tag management modal
  const openTagManagementModal = () => setIsTagManagementModalOpen(true);

  const closeTagManagementModal = () => {
    setIsTagManagementModalOpen(false);
    // fetchNodeTags(); 
  };

  const handleDelete = async () => {
    try {
      console.log('Attempting to delete node with ID:', nodeId);
      await window.electron.deleteNode(nodeId);
    } catch (error) {
      console.error('Error deleting node:', error);
    }
  };
  
  
  

  const fetchNodeTags = async () => {
    const fetchedNodeTags: Tag[] = await window.electron.getNodeTags(nodeId);
    setNodeTags(fetchedNodeTags);
  };

  const handleTagRemove = async (tagId: number) => {
    await window.electron.deleteNodeTag(nodeId, tagId);
    fetchNodeTags(); // Refresh the node's tags
  };

  const handleTagUpdate = (updatedTag: { TagID: number; isSelected: boolean }) => {
    setNodeTags((prevTags) => {
      // Determine if the tag should be added or removed based on isSelected
      if (updatedTag.isSelected) {
        // Remove the tag because isSelected true means it was already selected, now needs to be removed
        return prevTags.filter(tag => tag.TagID !== updatedTag.TagID);
      } else {
        const newTag = { TagID: updatedTag.TagID, TagName: "Placeholder" }; 
        return [...prevTags, newTag];
      }
    });
  };
  
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "node",
    item: { id: nodeId, title, description, tags },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  

  const handleCardClick = () => {
    if (isSelected) {
        dispatch(selectNode(null)); // Deselect if already selected
    } else {
        dispatch(selectNode(nodeId)); // Select this node
    }
};

  
  const handleAddFile = async () => {
    try {
      const filePath = await window.electron.selectFile(); // Corrected from electronAPI to electron
      if (filePath) {
        await window.electron.addFilePath(nodeId, filePath);
        fetchFilePaths();
      }
    } catch (error) {
      console.error('Failed to select file:', error);
    }
  };
  
  const fetchFilePaths = async () => {
    const paths: FilePath[] = await window.electron.getFilePathsByNodeId(nodeId);
    setFilePaths(paths);
  };


  const handleClose = () => {
    setAnchorEl(null);
    setSelectedFilePathId(null);
  };

  const handleDeleteFile = async (filePathId: number) => {
    await window.electron.deleteFilePath(filePathId);
    fetchFilePaths();
  };

  const handleOpenFile = (filePathId: number) => {
    const filePath = filePaths.find(({ FilePathID }) => FilePathID === filePathId)?.Path;
    if (filePath) {
      window.electron.openFile(filePath);
    }
  };

  const renderFilePaths = () => (
    filePaths.map(({ FilePathID, FileName }) => (
      <ListItem
        key={FilePathID}
        button
        onContextMenu={(event: React.MouseEvent<HTMLElement>) => handleRightClick(event, FilePathID)}
        onDoubleClick={() => handleDoubleClick(FilePathID)} // Added double-click handler here
      >
        <ListItemText primary={FileName} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteFile(FilePathID)}>
            <RemoveCircleOutlineIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))
  );

  const handleRightClick = (event: React.MouseEvent<HTMLElement>, filePathId: number) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelectedFilePathId(filePathId);
  };

  const handleDoubleClick = (filePathId: number) => {
    const filePath = filePaths.find(({ FilePathID }) => FilePathID === filePathId)?.Path;
    if (filePath) {
      window.electron.openFile(filePath); // Ensure this matches the exposed function in preload.ts
    }
  };

  const handleOpenInFileExplorer = (filePathId: number) => {
    const filePath = filePaths.find(({ FilePathID }) => FilePathID === filePathId)?.Path;
    if (filePath) {
      window.electron.openInFileExplorer(filePath); // We will define this in preload.ts next
    }
    handleClose();
  };
  
  
  const contextMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      keepMounted
    >
      <MenuItem onClick={() => handleOpenFile(selectedFilePathId)}>Open</MenuItem>
      <MenuItem onClick={() => handleOpenInFileExplorer(selectedFilePathId)}>Open in File Explorer</MenuItem>
      <MenuItem onClick={() => handleDeleteFile(selectedFilePathId)}>Delete</MenuItem>
    </Menu>
  );

  

  return (
    <div ref={cardRef} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'pointer', position: 'relative' }}>
      <Card ref={drag} style={{ opacity: isDragging ? 0.8 : 1, cursor: 'pointer', position: 'relative', backgroundColor: isSelected ? '#333' : '', color: isSelected ? 'white' : '' }} onClick={handleCardClick}>
        <CardContent>
          <Typography variant="h5" component="div" style={{color: isSelected ? 'white' : 'inherit'}}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{color: isSelected ? 'rgba(255, 255, 255, 0.7)' : 'inherit'}}>
            {description}
          </Typography>
          <div onClick={() => setIsFilesExpanded(!isFilesExpanded)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <Typography>Related Files</Typography>
            <IconButton>{isFilesExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
          </div>
          {isFilesExpanded && (
            <List dense>
              {renderFilePaths()}
              <ListItem button onClick={handleAddFile}>
                <ListItemText primary="Add File" />
                <AddIcon />
              </ListItem>
            </List>
          )}
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
          {nodeTags.map((tag) => (
            <Chip 
              key={tag.TagID} 
              label={tag.TagName} 
              onDelete={() => handleTagRemove(tag.TagID)} 
              style={{ marginRight: '4px' }} 
            />
          ))}
          <IconButton size="small" onClick={openTagManagementModal}>
            <AddIcon />
          </IconButton>
        </div>
        </CardContent>
        {contextMenu}
        <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
          <IconButton onClick={openEditModal}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </div>
        <EditNodeModal
          open={isEditModalOpen}
          onClose={closeEditModal}
          nodeId={nodeId}
          currentTitle={title}
          currentDescription={description}
        />
        <TagManagementModal
          open={isTagManagementModalOpen}
          onClose={closeTagManagementModal}
          nodeId={nodeId}
          selectedTags={nodeTags.map(tag => tag.TagID)}
          onTagUpdate={handleTagUpdate}
        />
      </Card>
    </div>
  );
};

export default NodeCard;
