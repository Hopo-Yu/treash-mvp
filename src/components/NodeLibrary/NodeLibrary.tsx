import React, { useState } from 'react';
import NodeSearchBar from './NodeSearchBar/NodeSearchBar';
import TagFilter from './TagFilter/TagFilter';
import NodeDisplay from './NodeDisplay';
import Box from '@mui/material/Box';

const NodeLibrary = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  // Update to handle search keyword submission from NodeSearchBar
  const handleSearch = (keyword:string) => {
    setSearchKeyword(keyword);
  };

  const handleSelectedTagChange = (selectedTagIds: number[]) => {
    setSelectedTagIds(selectedTagIds);
    console.log(selectedTagIds);
  };

  return (
    <Box className="node-library-container" sx={{ padding: 1 }}>
      <NodeSearchBar onSearch={handleSearch} />
      <Box className="tag-filter" sx={{ marginTop: 1 }}>
        <TagFilter selectedTagIds={selectedTagIds} onSelectedTagsChange={handleSelectedTagChange}/>
      </Box>
      <NodeDisplay selectedTagIds={selectedTagIds} searchKeyword={searchKeyword} />
    </Box>
  );
};

export default NodeLibrary;
