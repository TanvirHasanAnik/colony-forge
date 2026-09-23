import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RESOURCE_NAMES, type Resource, type ResourceKey, type ResourceAmount } from './type';

const initialState: Resource = {
  [RESOURCE_NAMES.COIN]: { amount: 100, rate: 0 },
  [RESOURCE_NAMES.WOOD]: { amount: 50, rate: 0 },
  [RESOURCE_NAMES.MEAT]: { amount: 20, rate: 0 },
};

export const resourceSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    addResources: (
      state, 
      action: PayloadAction<Partial<Record<ResourceKey, number>>>
    ) => {
      (Object.keys(action.payload) as ResourceKey[]).forEach((resource) => {
        const addedAmount = action.payload[resource];
        if (addedAmount !== undefined && state[resource]) {
          state[resource].amount += addedAmount;
        }
      });
    },

    deductResources: (
      state, 
      action: PayloadAction<Partial<Record<ResourceKey, number>>>
    ) => {
      (Object.keys(action.payload) as ResourceKey[]).forEach((resource) => {
        const deductedAmount = action.payload[resource];
        if (deductedAmount !== undefined && state[resource]) {
          state[resource].amount = Math.max(0, state[resource].amount - deductedAmount);
        }
      });
    },

    setProductionRate: (
      state, 
      action: PayloadAction<ResourceAmount>
    ) => {
      const resourceRates = action.payload;
      for (const [key, value] of Object.entries(resourceRates)) {
        const resourceKey = key as ResourceKey;
        if (state[resourceKey] !== undefined && typeof value === "number") {
          state[resourceKey].rate = value;
        }
      }
    },
  },
});

export const { addResources, deductResources, setProductionRate } = resourceSlice.actions;
export default resourceSlice.reducer;