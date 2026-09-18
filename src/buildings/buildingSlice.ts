import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { BUILDING_NAMES, type BuildingType } from '../utilities/building-types';

export interface BuildingInstance {
  id: string;
  type: BuildingType;
  gridX: number;
  gridY: number;
  level: number;
}

export interface AddBuildingPayload {
  id?: string;
  type: BuildingType;
  gridX: number;
  gridY: number;
  level?: number;
}

const initialState: BuildingInstance[] = [
  { id: "b1", type: BUILDING_NAMES.TOWNHALL, gridX: 2, gridY: 2, level: 1 },
  { id: "b2", type: BUILDING_NAMES.HOUSE, gridX: 3, gridY: 3, level: 1 },
  { id: "b3", type: BUILDING_NAMES.HUNTERHUT, gridX: 1, gridY: 1, level: 1 },
  { id: "b4", type: BUILDING_NAMES.SAWMILL, gridX: 1, gridY: 3, level: 1 },
  { id: "b5", type: BUILDING_NAMES.BUILDERHUT, gridX: 3, gridY: 2, level: 1},
];

export const buildingSlice = createSlice({
  name: 'buildings',
  initialState,
  reducers: {
    addBuilding: (state, action: PayloadAction<AddBuildingPayload>) => {
      const newBuilding: BuildingInstance = {
        id:
          action.payload.id ||
          (typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `b_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`),
        type: action.payload.type,
        gridX: action.payload.gridX,
        gridY: action.payload.gridY,
        level: action.payload.level ?? 1
      };
      state.push(newBuilding);
    },

    removeBuilding: (state, action: PayloadAction<string>) => {
      return state.filter((building) => building.id !== action.payload);
    },

    setBuildings: (_state, action: PayloadAction<BuildingInstance[]>) => {
      return action.payload;
    },
  },
});

export const { addBuilding, removeBuilding, setBuildings } = buildingSlice.actions;

export default buildingSlice.reducer;