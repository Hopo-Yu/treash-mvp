// NodeCard.tsx
import React, { useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { setNodes } from '../../redux/slices/nodesSlice';
import EditNodeModal from './EditNodeModal';
import TagManagementModal from '../TagManagementModal'; 
import { useDrag, useDrop } from 'react-dnd';


const NodeCard = ({ nodeId, title, description, tags = [] }) => {
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTagManagementModalOpen, setIsTagManagementModalOpen] = useState(false);
  const [nodeTags, setNodeTags] = useState([]);
  const cardRef = useRef(null);

  useEffect(() => {
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


  return (
    <div ref={cardRef} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'pointer', position: 'relative' }}>
      <Card ref={drag} style={{ opacity: isDragging ? 0.8 : 1, cursor: 'pointer', position: 'relative' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
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
