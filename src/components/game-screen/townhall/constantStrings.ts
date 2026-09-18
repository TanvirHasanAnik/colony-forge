import type { Resource } from "../../../resources/type";
import { BUILDING_NAMES } from "../../../utilities/building-types";

export const ADD_BUILDING_PROMPT = {
  [BUILDING_NAMES.BUILDERHUT]: "add-builderhut",
  [BUILDING_NAMES.HOUSE]: "add-house",
  [BUILDING_NAMES.HUNTERHUT]: "add-hunterhut",
  [BUILDING_NAMES.SAWMILL]: "add-sawmill",
} as const;

//Access production rate: PRODUCTION_RATE.[type].[level]
export const PRODUCTION_RATE = {
  [BUILDING_NAMES.HOUSE]: {
    1: {coin: 10}
  },
  [BUILDING_NAMES.HUNTERHUT]: {
    1: {coin: 20, meat: 20}
  },
  [BUILDING_NAMES.SAWMILL]: {
    1: {coin: 10, wood: 20}
  }
}

export interface BuildingConfig {
  name: string;
  type: string;
  description: string;
  requirements: Partial<Resource>;
}

export const BUILDINGS_CONFIG: Record<string, BuildingConfig> = {
  [BUILDING_NAMES.HUNTERHUT]: {
    name: "Hunter's hut",
    type: BUILDING_NAMES.HUNTERHUT,
    description: "Build a new Hunter's hut. Adding more hunter huts helps in increased meat production rate.",
    requirements: { coin: 500 },
  },
  [BUILDING_NAMES.SAWMILL]: {
    name: "Sawmill",
    type: BUILDING_NAMES.SAWMILL,
    description: "Build a new Sawmill. Adding more sawmills helps in increased wood production rate.",
    requirements: { coin: 500 },
  },
  [BUILDING_NAMES.BUILDERHUT]: {
    name: "Builder hut",
    type: BUILDING_NAMES.BUILDERHUT,
    description: "Build a new Builder hut. Adding more builder huts increases builder capacity.",
    requirements: { coin: 500 },
  },
  [BUILDING_NAMES.HOUSE]: {
    name: "House",
    type: BUILDING_NAMES.HOUSE,
    description: "Build a new House. Adding more houses increases population capacity.",
    requirements: { coin: 500 },
  },
};