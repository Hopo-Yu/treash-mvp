import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import NewNodeModal from './NewNodeModal'; // Import the NewNodeModal component

const NodeSearchBar = ({ onSearch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = () => {
    onSearch(searchKeyword); // Trigger the search with the current keyword
  };
  
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
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          label="Search nodes"
          variant="outlined"
          fullWidth
          size="small"
          style={{ marginRight: '4px' }}
          onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
        />
        <IconButton onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
        <IconButton onClick={() => setIsModalOpen(true)}>
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
