import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import TagManagementModal from './TagManagementModal'; // Import the component

const TagFilter = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [isTagManagementModalOpen, setIsTagManagementModalOpen] = useState(false);

  // Fetch selected tags from the database or store
  useEffect(() => {
    const fetchSelectedTags = async () => {
      // Fetch tags from the database
      const fetchedTags = await window.electron.getTags();
      setSelectedTags(fetchedTags);
    };

    fetchSelectedTags();
  }, []);

  const handleTagRemove = async (tagId) => {
    // Logic to remove the tag from the filter
    // Update the state and possibly update the database or store
    console.log('Removing tag with ID:', tagId);
    setSelectedTags(selectedTags.filter(tag => tag.TagID !== tagId));
  };

  const handleTagUpdate = (updatedTag) => {
    // Logic to add or remove a tag from the filter
    const isTagPresent = selectedTags.some(tag => tag.TagID === updatedTag.TagID);
    if (isTagPresent) {
      setSelectedTags(selectedTags.filter(tag => tag.TagID !== updatedTag.TagID));
    } else {
      setSelectedTags([...selectedTags, updatedTag]);
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
      <TagManagementModal
        open={isTagManagementModalOpen}
        onClose={closeTagManagementModal}
        nodeId={null} // In case of a filter, nodeId might be null or you need a different approach
        selectedTags={selectedTags.map(tag => tag.TagName)}
        onTagUpdate={handleTagUpdate} // Pass the callback
      />
    </div>
  );
};

export default TagFilter;
