import React from 'react';
import NodeSearchBar from './NodeSearchBar';
import TagFilter from '../TagFilter';
import NodeDisplay from './NodeDisplay';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import '../../styles/NodeLibrary.scss';

const NodeLibrary = () => {
  // This line is no longer needed because we're getting tagFilter directly from the Redux state now
  // const [selectedTagIds, setSelectedTagIds] = useState([]);

  // Directly use tagFilter from Redux state
  const tagFilter = useSelector((state: RootState) => state.nodes.tagFilter);

  // This handler might need adjustment if you plan to directly manipulate the tagFilter state in Redux
  const handleSelectedTagsChange = (tagIds) => {
    // This logic will need to change to dispatch an action to Redux to update the tagFilter
    // For example, dispatch(setTagFilter(tagIds))
  };

  return (
    <Box className="node-library-container" sx={{ padding: 1 }}>
      <NodeSearchBar />
      <Box className="tag-filter" sx={{ marginTop: 1 }}>
        <TagFilter onSelectedTagsChange={handleSelectedTagsChange} />
      </Box>
      <NodeDisplay selectedTagIds={tagFilter} />
    </Box>
  );
};

export default NodeLibrary;
