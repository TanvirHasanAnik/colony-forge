import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  coin: 100,
  wood: 50,
  meat: 20,
};

export const resourceSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    addResources: (state, action) => {
      Object.keys(action.payload).forEach((resource) => {
        if (state[resource] !== undefined) {
          state[resource] += action.payload[resource];
        }
      });
    },

    deductResources: (state, action) => {
      Object.keys(action.payload).forEach((resource) => {
        if (state[resource] !== undefined) {
          state[resource] = Math.max(0, state[resource] - action.payload[resource]);
        }
      });
    },

    setResources: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { addResources, deductResources, setResources } = resourceSlice.actions;
export default resourceSlice.reducer;