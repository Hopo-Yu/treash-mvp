import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import TagManagementModal from './TagManagementModal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setTagFilter, setAllTags } from '../redux/slices/nodesSlice';
import {Tag} from '../types/types';

const TagFilter = () => {
  const dispatch = useDispatch();
  const tagFilterIds = useSelector((state: RootState) => state.nodes.tagFilter);
  const allTags: Tag[] = useSelector((state: RootState) => state.nodes.allTags);
  const [isTagManagementModalOpen, setIsTagManagementModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchTags = async () => {
      const tags: Tag[] = await window.electron.getTags(); // Fetch the current list of tags and ensure it's typed
      dispatch(setAllTags(tags));
    };

    fetchTags();
  }, [allTags]); 


  const handleTagRemove = (tagId: number) => {
    dispatch(setTagFilter(tagFilterIds.filter(id => id !== tagId)));
  };

  const handleTagUpdate = (updatedTag: { TagID: number; isSelected: boolean }) => {
    const newTagFilterIds = updatedTag.isSelected
      ? tagFilterIds.filter(id => id !== updatedTag.TagID)
      : [...tagFilterIds, updatedTag.TagID];
    dispatch(setTagFilter(newTagFilterIds));
  };

  const handleClearAll = () => {
    dispatch(setTagFilter([]));
  };

  const openTagManagementModal = () => setIsTagManagementModalOpen(true);
  const closeTagManagementModal = () => setIsTagManagementModalOpen(false);


  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '8px' }}>
      {tagFilterIds.map(tagId => {
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
