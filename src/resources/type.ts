export const RESOURCE_NAMES = {
  COIN: "coin",
  WOOD: "wood",
  MEAT: "meat",
} as const;

export type ResourceKey = typeof RESOURCE_NAMES[keyof typeof RESOURCE_NAMES];
export interface ResourceItem {
  amount: number;
  rate: number;
}

export type Resource = Record<ResourceKey, ResourceItem>;
export type ResourceAmount = Partial<Record<ResourceKey, number>>