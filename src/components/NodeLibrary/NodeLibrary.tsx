import React, { useState } from 'react';
import NodeSearchBar from './NodeSearchBar';
import TagFilter from '../TagFilter';
import NodeDisplay from './NodeDisplay';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import '../../styles/NodeLibrary.scss';

const NodeLibrary = () => {
  const tagFilter = useSelector((state: RootState) => state.nodes.tagFilter);
  const [searchKeyword, setSearchKeyword] = useState('');

  // Update to handle search keyword submission from NodeSearchBar
  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  return (
    <Box className="node-library-container" sx={{ padding: 1 }}>
      <NodeSearchBar onSearch={handleSearch} />
      <Box className="tag-filter" sx={{ marginTop: 1 }}>
        <TagFilter />
      </Box>
      <NodeDisplay selectedTagIds={tagFilter} searchKeyword={searchKeyword} />
    </Box>
  );
};

export default NodeLibrary;
