import React, { useState, ChangeEvent, KeyboardEvent }from 'react';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import NewNodeModal from './NewNodeModal'; // Import the NewNodeModal component

interface NodeSearchBarProps {
  onSearch: (searchKeyword: string) => void;
}


const NodeSearchBar: React.FC<NodeSearchBarProps> = ({ onSearch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = () => {
    onSearch(searchKeyword); // Trigger the search with the current keyword
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleSearch();
  };
  
  // const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', margin: '8px' }}>
      <TextField
          value={searchKeyword}
          onChange={handleChange}
          label="Search nodes"
          variant="outlined"
          fullWidth
          size="small"
          style={{ marginRight: '4px' }}
          onKeyPress={handleKeyPress}
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
      />
    </>
  );
};

export default NodeSearchBar;
