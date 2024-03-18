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
import { useDispatch, useSelector } from 'react-redux';
import { triggerNodeDisplayRefresh, triggerTagDisplayRefresh } from '../../../redux/slices/nodesSlice'; // Adjust import path as needed
import { Tag } from '../../../types/types';
import { RootState } from '../../../redux/store';

interface TagManagementModalProps {
  open: boolean;
  onClose: () => void;
  nodeId: number;
  onLocalTagRefresh: () => void;
}

const TagManagementModal: React.FC<TagManagementModalProps> = ({ open, onClose, nodeId, onLocalTagRefresh }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [searchText, setSearchText] = useState('');
  const [newTagName, setNewTagName] = useState('');
  const dispatch = useDispatch();
  const globalTagRefreshTrigger = useSelector((state: RootState) => state.nodes.tagDisplayRefreshTrigger);
  const [nodeTags, setNodeTags] = useState<number[]>([]);
  const [localModalRefresh, setlocalModalRefresh] = useState(0); // Add this line


  useEffect(() => {
    if (open) {
      fetchTags();
      if (nodeId !== null) {
        fetchNodeTags();
      }
    }
  }, [open, searchText, globalTagRefreshTrigger, localModalRefresh]);

  const fetchTags = async () => {
    const fetchedTags: Tag[] = await window.electron.getTags(searchText);
    setTags(fetchedTags);
  };

  const fetchNodeTags = async () => {
    const fetchedNodeTags: number[] = (await window.electron.getNodeTags(nodeId)).map(tag => tag.TagID);
    setNodeTags(fetchedNodeTags);
  };


  const handleTagSelection = async (tagId: number, isSelected: boolean) => {
    if (isSelected) {
      await window.electron.deleteNodeTag(nodeId, tagId);
      
    } else {
      
      if (!nodeTags.includes(tagId)) {
        await window.electron.addNodeTag(nodeId, tagId);
      }
    }
    onLocalTagRefresh(); 
    setlocalModalRefresh(c => c + 1);
    dispatch(triggerNodeDisplayRefresh());
  };

  const handleAddTag = async () => {
    if (newTagName.trim()) {
      await window.electron.addTag(newTagName);
      setNewTagName('');
      dispatch(triggerTagDisplayRefresh());
    }
  };

  const handleDeleteTag = async (tagId: number) => {
    await window.electron.deleteTag(tagId);
    dispatch(triggerNodeDisplayRefresh());
    dispatch(triggerTagDisplayRefresh());
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Manage Tags</DialogTitle>
      <Box p={2}>
        {/* Search and Add New Tag */}
        <Box display="flex" mb={2}>
          <TextField
            fullWidth
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search tags..."
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => fetchTags()}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
        <Box display="flex" mb={2}>
          <TextField
            fullWidth
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            placeholder="Add new tag..."
          />
          <IconButton onClick={handleAddTag}>
            <AddIcon />
          </IconButton>
        </Box>
        {/* Tag List */}
        <Box>
          {tags.map(tag => (
            <Chip
              key={tag.TagID}
              label={tag.TagName}
              clickable
              onClick={() => handleTagSelection(tag.TagID, nodeTags.includes(tag.TagID))}
              onDelete={() => handleDeleteTag(tag.TagID)}
              style={{
                margin: 4,
                backgroundColor: nodeTags.includes(tag.TagID) ? '#d0f0c0' : undefined, // Highlight selected tags
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
