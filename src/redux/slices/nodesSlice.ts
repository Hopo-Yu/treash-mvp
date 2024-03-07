// src/redux/slices/nodesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Tag {
  TagID: number;
  TagName: string;
}

interface NodeState {
  nodes: Array<any>; // Replace 'any' with your Node type
  selectedNodeId: number | null;
  tagFilter: Array<number>;
  allTags:Array<any>;
}

const initialState: NodeState = {
  nodes: [],
  selectedNodeId: null,
  tagFilter: [],
  allTags: [],
};

export const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<Array<any>>) => {
      state.nodes = action.payload;
    },
    selectNode: (state, action: PayloadAction<number>) => {
      state.selectedNodeId = action.payload;
      state.tagFilter = []; // Clear tag filter when node is selected
    },
    setTagFilter: (state, action: PayloadAction<number[]>) => {
      state.tagFilter = action.payload;
    },
    setAllTags: (state, action: PayloadAction<Array<{TagID: number, TagName: string}>>) => {
      state.allTags = action.payload;
    },
  },
});

// Export the action creators
export const { setNodes, selectNode, setTagFilter, setAllTags } = nodesSlice.actions;
export default nodesSlice.reducer;
