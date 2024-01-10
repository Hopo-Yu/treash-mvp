import React from 'react';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ClearAllIcon from '@mui/icons-material/ClearAll';

const TagFilter = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '8px' }}>
      <Chip label="Tag One" onDelete={() => console.log('Removing tag...')} style={{ marginRight: '4px' }} />
      {/* ... more tags */}
      <IconButton onClick={() => console.log('Opening TagManagement...')}>
        <AddIcon />
      </IconButton>
      <IconButton onClick={() => console.log('Clearing all tags...')}>
        <ClearAllIcon />
      </IconButton>
    </div>
  );
};

export default TagFilter;
