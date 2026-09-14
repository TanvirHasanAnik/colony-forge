import { configureStore } from '@reduxjs/toolkit';
import  resourceReducer  from './resources/resourceSlice';

export const store = configureStore({
  reducer: {
    resources: resourceReducer,
  },
});