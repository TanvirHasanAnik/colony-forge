import type { Resource } from "../resources/type";

export function hasResource(
  playerInventory: Resource,
  requirement: Partial<Resource>
): boolean {
  return (Object.keys(requirement) as Array<keyof Resource>).every((key) => {
    const requiredAmount = requirement[key] ?? 0;
    return playerInventory[key] >= requiredAmount;
  });
}