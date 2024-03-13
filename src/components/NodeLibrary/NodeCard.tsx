// NodeCard.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  RemoveCircleOutline as RemoveCircleOutlineIcon,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setNodes } from '../../redux/slices/nodesSlice';
import EditNodeModal from './EditNodeModal';
import TagManagementModal from '../TagManagementModal'; 
import { useDrag, useDrop } from 'react-dnd';


const NodeCard = ({ nodeId, title, description, tags = [], isSelected }) => {
  const cardStyle = isSelected ? { backgroundColor: '#333', color: 'white' } : {};

  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTagManagementModalOpen, setIsTagManagementModalOpen] = useState(false);
  const [nodeTags, setNodeTags] = useState([]);
  const [filePaths, setFilePaths] = useState([]);
  const cardRef = useRef(null);
  // State to manage collapsible sections
  const [isFilesExpanded, setIsFilesExpanded] = useState(false);
  const [isNodesExpanded, setIsNodesExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilePathId, setSelectedFilePathId] = useState(null);
  useEffect(() => {

    fetchNodeTags();
    // Add event listeners for dragover and drop
    const handleDragOver = (e) => {
      e.preventDefault(); // Necessary to allow a drop
      e.dataTransfer.dropEffect = 'copy'; // Show a "copy" icon while dragging
    };

    const handleDrop = async (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length) {
        const file = files[0]; // For simplicity, let's handle only the first file
        const filePath = file.path; // Get the file path
    
        console.log(`File dropped on node ${nodeId}: ${file.name}, path: ${filePath}`);
    
        // Send the file path to the main process to be saved in the database
        // await window.electron.saveFilePathToNode(nodeId, filePath);
      }
    };
    

    const cardElement = cardRef.current;
    cardElement.addEventListener('dragover', handleDragOver);
    cardElement.addEventListener('drop', handleDrop);

    fetchFilePaths();

    // Clean up the event listeners
    return () => {
      cardElement.removeEventListener('dragover', handleDragOver);
      cardElement.removeEventListener('drop', handleDrop);
    };
  }, [nodeId]); 

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const openTagManagementModal = () => setIsTagManagementModalOpen(true);

  const closeTagManagementModal = () => {
    setIsTagManagementModalOpen(false);
    fetchNodeTags(); // Fetch tags again when the modal closes
  };

  const handleDelete = async () => {
    try {
      console.log('Attempting to delete node with ID:', nodeId);
      await window.electron.deleteNode(nodeId);
      window.electron.getNodes()
        .then(updatedNodes => {
          dispatch(setNodes(updatedNodes));
        });
    } catch (error) {
      console.error('Error deleting node:', error);
    }
  };

  const fetchNodeTags = async () => {
    const fetchedNodeTags = await window.electron.getNodeTags(nodeId);
    setNodeTags(fetchedNodeTags);
  };

  const handleTagRemove = async (tagId) => {
    await window.electron.deleteNodeTag(nodeId, tagId);
    fetchNodeTags(); // Refresh the node's tags
  };

  const handleTagUpdate = (updatedTag) => {
    setNodeTags((prevTags) => {
      // Check if the tag is already in the array
      const isTagPresent = prevTags.some(tag => tag.TagID === updatedTag.TagID);
      if (isTagPresent) {
        // If it's present, remove it (unselect)
        return prevTags.filter(tag => tag.TagID !== updatedTag.TagID);
      } else {
        // If not, add it (select)
        return [...prevTags, updatedTag];
      }
    });
  };
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "node",
    item: { id: nodeId, title, description, tags },
    collect: monitor => ({
        isDragging: !!monitor.isDragging(),
    }),

}));

  const toggleFilesSection = () => setIsFilesExpanded(!isFilesExpanded);
  const toggleNodesSection = () => setIsNodesExpanded(!isNodesExpanded);

  
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
    const paths = await window.electron.getFilePathsByNodeId(nodeId);
    setFilePaths(paths);
  };


  const handleClose = () => {
    setAnchorEl(null);
    setSelectedFilePathId(null);
  };

  const handleDeleteFile = async (filePathId) => {
    await window.electron.deleteFilePath(filePathId);
    fetchFilePaths();
    handleClose();
  };



  const handleOpenFile = (filePathId) => {
    const filePath = filePaths.find(({ FilePathID }) => FilePathID === filePathId)?.Path;
    if (filePath) window.electron.openFile(filePath);
    handleClose();
  };

  const renderFilePaths = () => (
    filePaths.map(({ FilePathID, FileName }) => (
      <ListItem
        key={FilePathID}
        button
        onContextMenu={(event) => handleRightClick(event, FilePathID)}
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

  const handleRightClick = (event, filePathId) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    setSelectedFilePathId(filePathId);
  };

  const handleDoubleClick = (filePathId) => {
    const filePath = filePaths.find(({ FilePathID }) => FilePathID === filePathId)?.Path;
    if (filePath) {
      window.electron.openFile(filePath); // Ensure this matches the exposed function in preload.ts
    }
  };

  const handleOpenInFileExplorer = (filePathId) => {
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
      <Card ref={drag} style={{ opacity: isDragging ? 0.8 : 1, cursor: 'pointer', position: 'relative', backgroundColor: isSelected ? '#333' : '',
        color: isSelected ? 'white' : '', }}>
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
          onTagUpdate={handleTagUpdate} // Pass the callback
        />
      </Card>
    </div>
  );
};

export default NodeCard;
