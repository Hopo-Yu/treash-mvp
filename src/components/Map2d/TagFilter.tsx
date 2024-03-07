// TagFilter.tsx
import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import TagManagementModal from '../TagManagementModal';

const TagFilter = ({ onSelectedTagsChange }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [isTagManagementModalOpen, setIsTagManagementModalOpen] = useState(false);

  useEffect(() => {
    const fetchSelectedTags = async () => {
      const fetchedTags = await window.electron.getTags();
      setSelectedTags(fetchedTags);
    };
    fetchSelectedTags();
  }, []);

  useEffect(() => {
    // Pass only the array of selected tag IDs to the parent component
    if (onSelectedTagsChange) {
      onSelectedTagsChange(selectedTags.map(tag => tag.TagID));
    }
  }, [selectedTags]); 

  const handleTagRemove = async (tagId) => {
    const updatedTags = selectedTags.filter(tag => tag.TagID !== tagId);
    setSelectedTags(updatedTags);
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
  };
  
  const handleClearAll = () => {
    setSelectedTags([]);
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
        selectedTags={selectedTags.map(tag => tag.TagID)} // Pass tag IDs
        onTagUpdate={handleTagUpdate} // Pass the callback
      />
    </div>
  );
};

export default TagFilter;
