import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import TagManagementModal from './TagManagementModal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setTagFilter, setAllTags } from '../redux/slices/nodesSlice'; // Assuming you've added this action

const TagFilter = () => {
  const dispatch = useDispatch();
  const tagFilterIds = useSelector((state: RootState) => state.nodes.tagFilter);
  const allTags = useSelector((state: RootState) => state.nodes.allTags);
  const [isTagManagementModalOpen, setIsTagManagementModalOpen] = useState(false);

  useEffect(() => {
    // Fetch tags only once on component mount, not in real-time
    window.electron.getTags().then((tags) => {
      dispatch(setAllTags(tags)); // Store all tags in the Redux state
    });
  }, [dispatch]);


  const handleTagRemove = (tagId) => {
    dispatch(setTagFilter(tagFilterIds.filter((id) => id !== tagId)));
  };

  const handleTagUpdate = (updatedTag) => {
    dispatch(setTagFilter(updatedTag.isSelected 
      ? tagFilterIds.filter((id) => id !== updatedTag.TagID) 
      : [...tagFilterIds, updatedTag.TagID]));
  };
  
  const handleClearAll = () => {
    dispatch(setTagFilter([]));
  };

  const openTagManagementModal = () => setIsTagManagementModalOpen(true);
  const closeTagManagementModal = () => setIsTagManagementModalOpen(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '8px' }}>
      {tagFilterIds.map((tagId) => {
        const tag = allTags.find((t) => t.TagID === tagId);
        return (
          <Chip
            key={tagId}
            label={tag?.TagName || 'Unknown Tag'}
            onDelete={() => handleTagRemove(tagId)}
            style={{ marginRight: '4px' }}
          />
        );
      })}
      <IconButton size="small" onClick={openTagManagementModal}>
        <AddIcon />
      </IconButton>
      <IconButton size="small" onClick={handleClearAll}>
        <ClearAllIcon />
      </IconButton>
      <TagManagementModal
        open={isTagManagementModalOpen}
        onClose={closeTagManagementModal}
        nodeId={null}
        selectedTags={tagFilterIds} // Pass tagFilterIds instead of selectedTags
        onTagUpdate={handleTagUpdate}
      />
    </div>
  );
};

export default TagFilter;
