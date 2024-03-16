// src/redux/slices/nodesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Node, Tag, NodePosition} from '../../types/types';

interface NodeState {
  nodes: Array<Node>; // Replace 'any' with your Node type
  selectedNodeId: number | null;
  tagFilter: Array<number>;
  allTags:Array<Tag>;
  nodePositions: Array<NodePosition>;
}

const initialState: NodeState = {
  nodes: [],
  selectedNodeId: null,
  tagFilter: [],
  allTags: [],
  nodePositions: [],
};


export const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<Array<Node>>) => {
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
    setNodePositions: (state, action: PayloadAction<Array<NodePosition>>) => {
      state.nodePositions = action.payload;
    },
  },
});

// Export the action creators
export const { setNodes, selectNode, setTagFilter, setAllTags, setNodePositions } = nodesSlice.actions;
export default nodesSlice.reducer;
