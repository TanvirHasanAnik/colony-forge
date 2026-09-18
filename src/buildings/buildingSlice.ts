import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { BUILDING_NAMES, BUILDING_CONFIGS } from '../utilities/building-types';

export interface BuildingInstance {
  id: string;
  type: keyof typeof BUILDING_CONFIGS;
  gridX: number;
  gridY: number;
  level: number;
  lastCollected: number;
}

const initialState: BuildingInstance[] = [
  { id: "b1", type: BUILDING_NAMES.TOWNHALL, gridX: 2, gridY: 2, level: 1, lastCollected: Date.now() },
  { id: "b2", type: BUILDING_NAMES.HOUSE, gridX: 3, gridY: 3, level: 1, lastCollected: Date.now() },
  { id: "b3", type: BUILDING_NAMES.HUNTERHUT, gridX: 1, gridY: 1, level: 1, lastCollected: Date.now() },
  { id: "b4", type: BUILDING_NAMES.SAWMILL, gridX: 1, gridY: 3, level: 1, lastCollected: Date.now() },
  { id: "b5", type: BUILDING_NAMES.BUILDERHUT, gridX: 3, gridY: 2, level: 1, lastCollected: Date.now() },
];

export const buildingSlice = createSlice({
  name: 'buildings',
  initialState,
  reducers: {
    addBuilding: (state, action: PayloadAction<Omit<BuildingInstance, 'id' | 'lastCollected'>>) => {
      const newBuilding: BuildingInstance = {
        ...action.payload,
        id: `b_${Date.now()}`,
        lastCollected: Date.now(),
      };
      state.push(newBuilding);
    },
    removeBuilding: (state, action: PayloadAction<string>) => {
      return state.filter((building) => building.id !== action.payload);
    },
  },
});

export const { addBuilding, removeBuilding } = buildingSlice.actions;
export default buildingSlice.reducer;