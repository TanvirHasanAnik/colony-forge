import { configureStore } from '@reduxjs/toolkit';
import resourceReducer from './resources/resourceSlice';
import buildingReducer from './buildings/buildingSlice'; // Adjust relative path as needed

export const store = configureStore({
  reducer: {
    resources: resourceReducer,
    buildings: buildingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;