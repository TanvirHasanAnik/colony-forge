import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { PRODUCTION_RATE } from '../components/game-screen/townhall/constantStrings';
import { BUILDING_NAMES, type BuildingType } from '../utilities/building-types';

export type ProductionRates = Record<string, number>;

function getProductionRate(type: BuildingType, level: number): ProductionRates {
  const buildingRates = (PRODUCTION_RATE as Record<string, Record<number, ProductionRates>>)[type];
  return buildingRates?.[level] ?? {};
}

export interface BuildingInstance {
  id: string;
  type: BuildingType;
  gridX: number;
  gridY: number;
  level: number;
  production: ProductionRates; // Added production field to interface
}

export interface AddBuildingPayload {
  id?: string;
  type: BuildingType;
  gridX: number;
  gridY: number;
  level?: number;
}

const initialState: BuildingInstance[] = [
  { id: "b1", type: BUILDING_NAMES.TOWNHALL, gridX: 2, gridY: 2, level: 1, production: getProductionRate(BUILDING_NAMES.TOWNHALL, 1) },
  { id: "b2", type: BUILDING_NAMES.HOUSE, gridX: 3, gridY: 3, level: 1, production: getProductionRate(BUILDING_NAMES.HOUSE, 1) },
  { id: "b3", type: BUILDING_NAMES.HUNTERHUT, gridX: 1, gridY: 1, level: 1, production: getProductionRate(BUILDING_NAMES.HUNTERHUT, 1) },
  { id: "b4", type: BUILDING_NAMES.SAWMILL, gridX: 1, gridY: 3, level: 1, production: getProductionRate(BUILDING_NAMES.SAWMILL, 1) },
  { id: "b5", type: BUILDING_NAMES.BUILDERHUT, gridX: 3, gridY: 2, level: 1, production: getProductionRate(BUILDING_NAMES.BUILDERHUT, 1) },
];

export const buildingSlice = createSlice({
  name: 'buildings',
  initialState,
  reducers: {
    addBuilding: (state, action: PayloadAction<AddBuildingPayload>) => {
      const type = action.payload.type;
      const level = action.payload.level ?? 1;

      const newBuilding: BuildingInstance = {
        id:
          action.payload.id ||
          (typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `b_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`),
        type,
        gridX: action.payload.gridX,
        gridY: action.payload.gridY,
        level,
        production: getProductionRate(type, level),
      };

      state.push(newBuilding);
      console.log(newBuilding.production)
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