import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RESOURCE_NAMES, type Resource } from './type';

const initialState: Resource = {
  [RESOURCE_NAMES.COIN]: 100,
  [RESOURCE_NAMES.WOOD]: 50,
  [RESOURCE_NAMES.MEAT]: 20,
};

export const resourceSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    addResources: (state, action: PayloadAction<Partial<Resource>>) => {
      (Object.keys(action.payload) as Array<keyof Resource>).forEach((resource) => {
        const amount = action.payload[resource];
        if (amount !== undefined && state[resource] !== undefined) {
          state[resource] += amount;
        }
      });
    },

    deductResources: (state, action: PayloadAction<Partial<Resource>>) => {
      (Object.keys(action.payload) as Array<keyof Resource>).forEach((resource) => {
        const amount = action.payload[resource];
        if (amount !== undefined && state[resource] !== undefined) {
          state[resource] = Math.max(0, state[resource] - amount);
        }
      });
    },

    setResources: (state, action: PayloadAction<Partial<Resource>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { addResources, deductResources, setResources } = resourceSlice.actions;
export default resourceSlice.reducer;