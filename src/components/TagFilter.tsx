import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import TagManagementModal from './TagManagementModal'; // Import the component

const TagFilter = ({ onNodeIdsChange }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [displayedNodeIds, setDisplayedNodeIds] = useState([]);
  const [isTagManagementModalOpen, setIsTagManagementModalOpen] = useState(false);

  useEffect(() => {
    const fetchSelectedTags = async () => {
      const fetchedTags = await window.electron.getTags();
      setSelectedTags(fetchedTags);
    };
    fetchSelectedTags();
  }, []);

  useEffect(() => {
    const fetchNodeIds = async () => {
      const nodeIds = await window.electron.getNodesByTagIds(selectedTags.map(tag => tag.TagID));
      setDisplayedNodeIds(nodeIds);
      if (onNodeIdsChange) {
        onNodeIdsChange(nodeIds);
      }
    };
    fetchNodeIds();
  }, [selectedTags]); 

  const handleTagRemove = async (tagId) => {
    const updatedTags = selectedTags.filter(tag => tag.TagID !== tagId);
    setSelectedTags(updatedTags);
    if (onNodeIdsChange) {
      onNodeIdsChange(displayedNodeIds); // Send node IDs
    }
  };
  
  const handleTagUpdate = (updatedTag) => {
    const isTagPresent = selectedTags.some(tag => tag.TagID === updatedTag.TagID);
    let updatedTags;
    if (isTagPresent) {
      updatedTags = selectedTags.filter(tag => tag.TagID !== updatedTag.TagID);
    } else {
      updatedTags = [...selectedTags, updatedTag];
    }
    setSelectedTags(updatedTags);
    if (onNodeIdsChange) {
      onNodeIdsChange(displayedNodeIds); // Send node IDs
    }
  };
  
  const handleClearAll = () => {
    setSelectedTags([]);
    if (onNodeIdsChange) {
      onNodeIdsChange([]); // Send empty array
    }
  };

  const openTagManagementModal = () => setIsTagManagementModalOpen(true);
  const closeTagManagementModal = () => setIsTagManagementModalOpen(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '8px' }}>
      {selectedTags.map((tag) => (
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
      <IconButton size="small" onClick={handleClearAll}>
        <ClearAllIcon />
      </IconButton>
      <TagManagementModal
      open={isTagManagementModalOpen}
      onClose={closeTagManagementModal}
      nodeId={null} // In case of a filter, nodeId might be null or you need a different approach
      selectedTags={selectedTags.map(tag => tag.TagName)} // Pass tag names
      onTagUpdate={handleTagUpdate} // Pass the callback
    />

    </div>
  );
};

export default TagFilter;
