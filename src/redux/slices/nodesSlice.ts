// src/redux/slices/nodesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NodeState {
  nodes: Array<any>; // Replace 'any' with your Node type
}

const initialState: NodeState = {
  nodes: [],
};

export const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<Array<any>>) => {
      state.nodes = action.payload;
    },
    // Additional reducers for adding, editing, deleting nodes...
  },
});

export const { setNodes } = nodesSlice.actions;
export default nodesSlice.reducer;
