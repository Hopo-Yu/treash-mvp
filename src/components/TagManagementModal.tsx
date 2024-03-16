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
import { Tag} from '../types/types';

interface TagManagementModalProps {
  open: boolean;
  onClose: () => void;
  nodeId: number;
  selectedTags: number[]; // Assuming selectedTags is an array of TagID
  onTagUpdate: (updatedTag: { TagID: number; isSelected: boolean }) => void;
}

const TagManagementModal: React.FC<TagManagementModalProps> = ({ open, onClose, nodeId, selectedTags, onTagUpdate }) => {
  const [tags, setTags] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [newTagName, setNewTagName] = useState('');
  const [nodeTags, setNodeTags] = useState([]);

  // Fetch and set tags when the modal opens
  useEffect(() => {
    if (open) {
      fetchTags();
      fetchNodeTags();
      checkSelectedTagsType();
    }
  }, [open]);

  const checkSelectedTagsType = () => {
    const allAreNumbers = selectedTags.every(tag => typeof tag === 'number');
    const allAreStrings = selectedTags.every(tag => typeof tag === 'string');

    if (allAreNumbers) {
      console.log("selectedTags is an array of TagID");
    } else if (allAreStrings) {
      console.log("selectedTags is an array of TagName");
    } else {
      console.log("selectedTags is a mix or empty");
    }
  };

  const fetchTags = async (): Promise<void> => {
    const fetchedTags: Tag[] = await window.electron.getTags();
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

  const handleTagSelection = async (tag: Tag) => {
    // Check if the tag ID is already in the nodeTags array
    const isSelected = nodeTags.some(t => t.TagID === tag.TagID);
  
    if (isSelected) {
      // If tag is already selected, remove it (delete association)
      await window.electron.deleteNodeTag(nodeId, tag.TagID);
    } else {
      // If tag is not selected, add it (create association)
      await window.electron.addNodeTag(nodeId, tag.TagID);
    }
  
    // Refresh the node's tags after updating
    fetchNodeTags();
  
    // Inform the parent component about the update
    onTagUpdate({ TagID: tag.TagID, isSelected });
  };

  const handleDeleteTag = async (tagId: number) => {
    try {
      
  
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
              deleteIcon={<CloseIcon />}
              style={{
                margin: '4px',
                backgroundColor: selectedTags.includes(tag.TagID) ? '#d0f0c0' : '#f0f0f0',
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
