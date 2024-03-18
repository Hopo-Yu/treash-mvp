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
import { Tag } from '../../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { triggerNodeDisplayRefresh, triggerTagDisplayRefresh } from '../../../redux/slices/nodesSlice'; // Adjust import path as needed
import { RootState } from '../../../redux/store';

interface TagManagementModalProps {
  open: boolean;
  onClose: () => void;
  selectedTagIds: number[];
  onSelectedTagsChange: (newSelectedTagIds: number[]) => void;
}

const TagManagementModal: React.FC<TagManagementModalProps> = ({
  open,
  onClose,
  selectedTagIds,
  onSelectedTagsChange,
}) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [searchText, setSearchText] = useState('');
  const [newTagName, setNewTagName] = useState('');
  const dispatch = useDispatch();
  const globalTagRefreshTrigger = useSelector((state: RootState) => state.nodes.tagDisplayRefreshTrigger);

  useEffect(() => {
    

    fetchTags();
  }, [open, searchText, globalTagRefreshTrigger]);

  const fetchTags = async () => {
    const fetchedTags: Tag[] = await window.electron.getTags();
    setTags(fetchedTags);
  };
  
  const handleAddTag = async () => {
    if (newTagName.trim()) {
      await window.electron.addTag(newTagName.trim());
      setNewTagName('');
      dispatch(triggerTagDisplayRefresh());
    }
  };

  const handleTagSelection = (tagId: number) => {
    const newSelectedTagIds = selectedTagIds.includes(tagId)
      ? selectedTagIds.filter((id) => id !== tagId) 
      : [...selectedTagIds, tagId]; 
    onSelectedTagsChange(newSelectedTagIds);
  };

  const handleDeleteTag = async (tagId: number) => {
    await window.electron.deleteTag(tagId);
    dispatch(triggerNodeDisplayRefresh());
    dispatch(triggerTagDisplayRefresh());
    if (selectedTagIds.includes(tagId)) {
      onSelectedTagsChange(selectedTagIds.filter((id) => id !== tagId));
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
                <IconButton onClick={() => fetchTags()}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          <TextField
            margin="dense"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            placeholder="Add new tag"
          />
          <IconButton onClick={handleAddTag}>
            <AddIcon />
          </IconButton>
        </Box>
        <Box>
          {tags.map((tag) => (
            <Chip
              key={tag.TagID}
              label={tag.TagName}
              onClick={() => handleTagSelection(tag.TagID)}
              onDelete={() => handleDeleteTag(tag.TagID)}
              color={selectedTagIds.includes(tag.TagID) ? 'primary' : 'default'}
              style={{ margin: '4px' }}
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
