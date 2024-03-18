// NodeCard.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Card, CardContent, Typography, IconButton, Chip, List,
  ListItem, ListItemText, ListItemSecondaryAction, Menu, MenuItem
} from '@mui/material';
import {
  Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon,
  ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon,
  RemoveCircleOutline as RemoveCircleOutlineIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import EditNodeModal from './EditNodeModal';
import TagManagementModal from './TagManagementModal';
import { useDrag } from 'react-dnd';
import { selectNode, triggerNodeDisplayRefresh, triggerTagDisplayRefresh } from '../../../redux/slices/nodesSlice'; 
import { Tag, FilePath } from '../../../types/types';
import { RootState } from '../../../redux/store';

interface NodeCardProps {
  nodeId: number;
  isSelected: boolean;
}




const NodeCard: React.FC<NodeCardProps> = ({ nodeId, isSelected }) => {
  const dispatch = useDispatch();
  
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isTagManagementModalOpen, setIsTagManagementModalOpen] = useState<boolean>(false);
  const [isFilesExpanded, setIsFilesExpanded] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement>(null);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilePathId, setSelectedFilePathId] = useState(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [filePaths, setFilePaths] = useState<FilePath[]>([]);


  const [filePathsRefresh, setFilePathsRefresh] = useState(0);
  const [localTagRefreshTrigger, setLocalTagRefreshTrigger] = useState(0);
  const globalTagRefreshTrigger = useSelector((state: RootState) => state.nodes.tagDisplayRefreshTrigger);
  
  useEffect(() => {
    fetchNodeDetails();
  }, [nodeId]); 
  
  const fetchNodeDetails = async () => {
    const title = await window.electron.getNodeTitle(nodeId);
    const description = await window.electron.getNodeDescription(nodeId);
    
    setTitle(title);
    setDescription(description);
  };

  // useEffect for fetching file paths
  useEffect(() => {
    const fetchFilePaths = async () => {
      const fetchedFilePaths = await window.electron.getFilePathsByNodeId(nodeId);
      setFilePaths(fetchedFilePaths);
    };
    fetchFilePaths();
  }, [nodeId, filePathsRefresh]);

  // useEffect for fetching tags
  useEffect(() => {
    const fetchTags = async () => {
      const fetchedTags = await window.electron.getNodeTags(nodeId);
      setTags(fetchedTags);
    };
    fetchTags();
  }, [nodeId, localTagRefreshTrigger, globalTagRefreshTrigger]);

  const handleLocalTagRefresh = useCallback(() => {
    setLocalTagRefreshTrigger(prevTrigger => prevTrigger + 1);
  }, []);

  // Function to open the edit modal
  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  // Function to open the tag management modal
  const openTagManagementModal = () => setIsTagManagementModalOpen(true);

  const closeTagManagementModal = () => {
    setIsTagManagementModalOpen(false);
    // fetchNodeTags(); 
  };

  const handleNodeDelete = async () => {
    try {
      await window.electron.deleteNode(nodeId);
      dispatch(triggerNodeDisplayRefresh());
    } catch (error) {
      console.error('Error deleting node:', error);
    }
  };
  

  const handleTagRemove = async (tagId: number) => {
    await window.electron.deleteNodeTag(nodeId, tagId);
    dispatch(triggerNodeDisplayRefresh());
    dispatch(triggerTagDisplayRefresh());
  };

  
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "node",
    item: { id: nodeId, title, description, tags },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  

  //Node Card Selection
  const handleCardClick = () => {
    if (isSelected) {
        dispatch(selectNode(null)); // Deselect if already selected
    } else {
        dispatch(selectNode(nodeId)); // Select this node
    }
};

  
  const handleAddFile = async () => {
    try {
      const filePath = await window.electron.selectFile();
      if (filePath) {
        await window.electron.addFilePath(nodeId, filePath);
        setFilePathsRefresh(prev => prev + 1);
      }
    } catch (error) {
      console.error('Failed to select file:', error);
    }
  };


  const handleClose = () => {
    setAnchorEl(null);
    setSelectedFilePathId(null);
  };

  const handleDeleteFile = async (filePathId: number) => {
    try {
      await window.electron.deleteFilePath(filePathId);
      setFilePathsRefresh(prev => prev + 1);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
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
      <Card
        ref={drag}
        style={{
          opacity: isDragging ? 0.8 : 1,
          cursor: 'pointer',
          border: isSelected ? '2px solid #333' : '', 
        }}
        onClick={(e) => {
          e.stopPropagation(); 
          handleCardClick();
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" style={{color: 'inherit'}}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{color: 'inherit'}}>
           {description}
          </Typography>
          <div onClick={() => setIsFilesExpanded(!isFilesExpanded)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <Typography>Related Files</Typography>
            <IconButton>{isFilesExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
          </div>
          {isFilesExpanded && (
            <List dense>
              {renderFilePaths()}
              <ListItem onClick={handleAddFile}>
                <ListItemText primary="Add File" />
                <AddIcon />
              </ListItem>
            </List>
          )}
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
          {tags.map((tag) => (
            <Chip 
            key={`${nodeId}-${tag.TagID}`}
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
          <IconButton onClick={handleNodeDelete}>
            <DeleteIcon />
          </IconButton>
        </div>
        <EditNodeModal
          open={isEditModalOpen}
          onClose={closeEditModal}
          nodeId={nodeId}
          currentTitle={title}
          currentDescription={description}
          onEditSuccess={() => {
            fetchNodeDetails(); 
          }}
        />
        <TagManagementModal
          open={isTagManagementModalOpen}
          onClose={closeTagManagementModal}
          nodeId={nodeId}
          onLocalTagRefresh={handleLocalTagRefresh}
        />
      </Card>
    </div>
  );
};

export default NodeCard;
