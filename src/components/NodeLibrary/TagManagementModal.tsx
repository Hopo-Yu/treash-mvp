import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

const TagManagementModal = ({ open, onClose, nodeId, selectedTags = [], onTagUpdate }) => {
  const [tags, setTags] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [newTagName, setNewTagName] = useState('');
  const [nodeTags, setNodeTags] = useState([]);

  // Fetch and set tags when the modal opens
  useEffect(() => {
    if (open) {
      fetchTags();
      fetchNodeTags();
    }
  }, [open]);

  const fetchTags = async () => {
    // Fetch tags from the database
    const fetchedTags = await window.electron.getTags();
    setTags(fetchedTags);
  };

  const handleSearch = () => {
    // Implement search logic for tags based on searchText
    // Optional: Implement if you need a search feature
  };

  const handleAddTag = async () => {
    if (newTagName) {
      // Add the new tag to the database
      await window.electron.addTag(newTagName);
      // Fetch and update the tags list
      fetchTags();
      setNewTagName('');
    }
  };

  const fetchNodeTags = async () => {
    const fetchedNodeTags = await window.electron.getNodeTags(nodeId);
    setNodeTags(fetchedNodeTags);
  };

  const handleTagSelection = async (tag) => {
    // Check if the tag ID is already in the nodeTags array
    const tagIsSelected = nodeTags.some(t => t.TagID === tag.TagID);
  
    if (tagIsSelected) {
      // If tag is already selected, remove it (delete association)
      await window.electron.deleteNodeTag(nodeId, tag.TagID);
    } else {
      // If tag is not selected, add it (create association)
      await window.electron.addNodeTag(nodeId, tag.TagID);
    }
  
    // Refresh the node's tags after updating
    fetchNodeTags();
  
    // Inform the parent component about the update
    onTagUpdate(tag); 
  };

  const handleDeleteTag = async (tagId) => {
    try {
      // First, delete all associations of this tag in the NodeTag table
      await window.electron.deleteNodeTagAssociations(tagId);
  
      // Then, delete the tag from the Tag table
      await window.electron.deleteTag(tagId);
  
      // Refresh tags and node tags after deletion
      fetchTags();
      fetchNodeTags();
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Tag Management</DialogTitle>
      <Box p={2}>
        <Box display="flex" alignItems="center" mb={2}>
          <TextField
            fullWidth
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search tags"
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
        <Box display="flex" alignItems="center" mb={2}>
          <TextField
            fullWidth
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            placeholder="New tag name"
          />
          <IconButton onClick={handleAddTag}>
            <AddIcon />
          </IconButton>
        </Box>
        <Box>
          {tags.map((tag, index) => (
            <Chip
              key={tag.TagID || index}
              label={tag.TagName}
              onClick={() => handleTagSelection(tag)}
              onDelete={() => handleDeleteTag(tag.TagID)}
              deleteIcon={<CloseIcon />} // Import CloseIcon from @mui/icons-material
              style={{
                margin: '4px',
                backgroundColor: selectedTags.includes(tag.TagName) ? '#d0f0c0' : '#f0f0f0',
              }}
            />
          ))}
        </Box>
      </Box>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Dialog>
  );
};

export default TagManagementModal;