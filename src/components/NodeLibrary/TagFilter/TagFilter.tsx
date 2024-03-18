import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import TagManagementModal from './TagManagementModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import {Tag} from '../../../types/types';

interface TagFilterProps {
  selectedTagIds: number[];
  onSelectedTagsChange: (newSelectedTagIds: number[]) => void;
}


const TagFilter: React.FC<TagFilterProps> = ({ selectedTagIds, onSelectedTagsChange }) => {
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [isTagManagementModalOpen, setIsTagManagementModalOpen] = useState<boolean>(false);
  const globalTagRefreshTrigger = useSelector((state: RootState) => state.nodes.tagDisplayRefreshTrigger);

  useEffect(() => {
    // Fetch all tags to display in TagManagementModal and in the filter chips
    const fetchTags = async () => {
      const fetchedTags = await window.electron.getTags();
      setAllTags(fetchedTags);
    };
    fetchTags();
  }, [globalTagRefreshTrigger]);

  const handleTagRemove = (tagId: number) => {
    const updatedSelectedTags = selectedTagIds.filter(id => id !== tagId);
    onSelectedTagsChange(updatedSelectedTags);
  };

  const handleClearAll = () => {
    onSelectedTagsChange([]);
  };

  const openTagManagementModal = () => setIsTagManagementModalOpen(true);
  const closeTagManagementModal = () => setIsTagManagementModalOpen(false);


  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '8px' }}>
      {selectedTagIds.map(tagId => {
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
        selectedTagIds={selectedTagIds}
        onSelectedTagsChange={onSelectedTagsChange}
      />
    </div>
  );
};

export default TagFilter;
