// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import nodesReducer from './slices/nodesSlice';
import loginReducer from './slices/loginSlice';


export const store = configureStore({
  reducer: {
    nodes: nodesReducer,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
