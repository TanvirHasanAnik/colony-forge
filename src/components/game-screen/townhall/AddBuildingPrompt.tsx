import { useSelector } from "react-redux";
import type { Resource } from "../../../resources/type";
import type { RootState } from "../../../store";
import { BUILDING_NAMES } from "../../../utilities/building-types";
import { hasResource } from "../../../utilities/resource";
import { PrimaryButton } from "../../common/buttons/PrimaryButton";

interface AddBuildingProps {
  setPromptDialogue: (value: null) => void;
  handleSelectBuilding: (buildingName: string) => void;
}

import { BUILDINGS_CONFIG, type BuildingConfig } from "./constantStrings";

function AddBuildingModal({
  config,
  setPromptDialogue,
  handleSelectBuilding,
}: AddBuildingProps & { config: BuildingConfig }) {
  const inventory = useSelector((state: RootState) => state.resources);

  const canAfford = hasResource(inventory, config.requirements);

  return (
    <div>
      <div className="flex justify-between pb-6">
        <PrimaryButton onClick={() => setPromptDialogue(null)}>Back</PrimaryButton>
        <h2>Add {config.name}</h2>
      </div>

      <p>{config.description}</p>

      <h3>Requirements</h3>
      <ul>
        {Object.entries(config.requirements).map(([resource, amount]) => {
          const currentAmount = inventory[resource as keyof Resource] ?? 0;
          const isEnough = currentAmount >= (amount ?? 0);

          return (
            <li key={resource} className={isEnough ? "text-green-600" : "text-red-600"}>
              {resource.toUpperCase()}: {amount} (You have: {currentAmount})
            </li>
          );
        })}
      </ul>

      <PrimaryButton
        disabled={!canAfford}
        onClick={() => {
          if (canAfford) {
            handleSelectBuilding(config.type);
          }
        }}
      >
        Place
      </PrimaryButton>
    </div>
  );
}

export function AddHunterhut(props: AddBuildingProps) {
  return <AddBuildingModal config={BUILDINGS_CONFIG[BUILDING_NAMES.HUNTERHUT]} {...props} />;
}

export function AddSawmill(props: AddBuildingProps) {
  return <AddBuildingModal config={BUILDINGS_CONFIG[BUILDING_NAMES.SAWMILL]} {...props} />;
}

export function AddBuilderhut(props: AddBuildingProps) {
  return <AddBuildingModal config={BUILDINGS_CONFIG[BUILDING_NAMES.BUILDERHUT]} {...props} />;
}

export function AddHouse(props: AddBuildingProps) {
  return <AddBuildingModal config={BUILDINGS_CONFIG[BUILDING_NAMES.HOUSE]} {...props} />;
}