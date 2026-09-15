export const RESOURCE_NAMES = {
  COIN: "coin",
  WOOD: "wood",
  MEAT: "meat",
} as const;

export type Resource = {
  [RESOURCE_NAMES.COIN]: number;
  [RESOURCE_NAMES.WOOD]: number;
  [RESOURCE_NAMES.MEAT]: number;
};