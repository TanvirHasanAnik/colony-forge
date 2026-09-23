import type { Resource, ResourceAmount, ResourceKey } from "../resources/type";
import type { BuildingInstance } from "../buildings/buildingSlice";

export function getResourceProductionRateFromBuilding(
  buildings: BuildingInstance[]
): ResourceAmount {
  return buildings.reduce<Record<string, number>>((acc, building) => {
    for (const [resource, amount] of Object.entries(building.production || {})) {
      if (typeof amount === "number") {
        acc[resource] = (acc[resource] || 0) + amount;
      }
    }
    return acc;
  }, {}) as ResourceAmount;
}

export function hasResource(
  playerInventory: Resource,
  requirement: ResourceAmount
): boolean {
  return (Object.keys(requirement) as Array<ResourceKey>).every((key) => {
    const requiredAmount = requirement[key] ?? 0;
    return (playerInventory[key]?.amount ?? 0) >= requiredAmount;
  });
}