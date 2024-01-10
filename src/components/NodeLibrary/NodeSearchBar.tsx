import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import NewNodeModal from './NewNodeModal'; // Import the NewNodeModal component

const NodeSearchBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSaveNewNode = (nodeData) => {
    console.log('New Node Data:', nodeData);
    // Here you can add the logic to save the new node in the database
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', margin: '8px' }}>
        <TextField
          label="Search nodes"
          variant="outlined"
          fullWidth
          size="small"
          style={{ marginRight: '4px' }}
        />
        <IconButton onClick={() => console.log('Searching nodes...')}>
          <SearchIcon />
        </IconButton>
        <IconButton onClick={openModal}>
          <AddIcon />
        </IconButton>
      </div>
      <NewNodeModal
        open={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSaveNewNode}
      />
    </>
  );
};

export default NodeSearchBar;
