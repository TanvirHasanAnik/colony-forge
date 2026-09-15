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

interface BuildingConfig {
  name: string;
  type: string;
  description: string;
  requirements: Partial<Resource>;
}

const BUILDINGS_CONFIG: Record<string, BuildingConfig> = {
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