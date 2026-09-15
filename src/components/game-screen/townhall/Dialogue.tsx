import { useEffect, useState } from "react";
import { BUILDING_NAMES } from "../../../utilities/building-types";
import { PrimaryButton } from "../../common/buttons/PrimaryButton";
import { AddHunterhut, AddBuilderhut, AddSawmill, AddHouse } from "./AddBuildingPrompt";
import { ADD_BUILDING_PROMPT } from "./constantStrings";

// 1. Define Building interface
export interface Building {
  id: string;
  type: string;
  gridX: number;
  gridY: number;
  level: number;
  lastCollected: number;
}

interface HoveredCoords {
  x: number;
  y: number;
}

// 2. Define Component Props Interface
interface TownhallDialogueProps {
  isOpen: boolean;
  onClose: () => void;
  setBuildings: React.Dispatch<React.SetStateAction<Building[]>>;
  isBuildingMode: boolean;
  setIsBuildingMode: (value: boolean) => void;
  hoveredCoords: HoveredCoords | null;
  buildings: Building[];
}

export default function TownhallDialogue({
  isOpen,
  onClose,
  setBuildings,
  isBuildingMode,
  setIsBuildingMode,
  hoveredCoords,
  buildings,
}: TownhallDialogueProps) {
  const [selectedBuildingType, setSelectedBuildingType] = useState<string | null>(null);
  const [promptDialogue, setPromptDialogue] = useState<string | null>(null);

  const addBuilding = (buildingType: string, x: number, y: number) => {
    const newBuilding: Building = {
      id: crypto.randomUUID(),
      type: buildingType,
      gridX: x,
      gridY: y,
      level: 1,
      lastCollected: Date.now(),
    };

    setBuildings((prev) => [...prev, newBuilding]);
    setIsBuildingMode(false);
    setSelectedBuildingType(null);
  };

  const handleSelectBuilding = (buildingType: string) => {
    setSelectedBuildingType(buildingType);
    setIsBuildingMode(true);
    setPromptDialogue(null);
    onClose();
  };

  // 3. Typed accumulator in reduce
  const getBuildingCounts = (): Record<string, number> => {
    return buildings.reduce<Record<string, number>>((acc, current) => {
      const type = current.type;
      if (type != null) {
        acc[type] = (acc[type] || 0) + 1;
      }
      return acc;
    }, {});
  };

  useEffect(() => {
    if (!isBuildingMode || !selectedBuildingType || !hoveredCoords) return;

    const handleGridClick = () => {
      const isOccupied = buildings.some(
        (b) => b.gridX === hoveredCoords.x && b.gridY === hoveredCoords.y
      );

      if (!isOccupied) {
        addBuilding(selectedBuildingType, hoveredCoords.x, hoveredCoords.y);
      }
    };

    window.addEventListener("click", handleGridClick);
    return () => window.removeEventListener("click", handleGridClick);
  }, [isBuildingMode, selectedBuildingType, hoveredCoords, buildings]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => {
        onClose();
        setPromptDialogue(null);
      }}
    >
      <div
        className="bg-blue-200 max-w-md w-full p-3"
        onClick={(e) => e.stopPropagation()}
      >
        {promptDialogue === null && (
          <div>
            <div className="flex justify-between">
              <h2>
                Townhall <span>Lv 1</span>
              </h2>
              <PrimaryButton onClick={onClose}>X</PrimaryButton>
            </div>
            <br />
            <div className="flex justify-between pb-5">
              <div>
                <h3 className="pb-2">List of Buildings</h3>
                <ul className="text-left">
                  {Object.entries(getBuildingCounts()).map(([type, count]) => (
                    <li key={type}>
                      {type} {count}x
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-start">
                <h3 className="pb-2">Construct more</h3>
                <PrimaryButton
                  className="mb-2"
                  onClick={() => setPromptDialogue(ADD_BUILDING_PROMPT[BUILDING_NAMES.HOUSE])}
                >
                  + House
                </PrimaryButton>
                <PrimaryButton
                  className="mb-2"
                  onClick={() => setPromptDialogue(ADD_BUILDING_PROMPT[BUILDING_NAMES.SAWMILL])}
                >
                  + Sawmill
                </PrimaryButton>
                <PrimaryButton
                  className="mb-2"
                  onClick={() => setPromptDialogue(ADD_BUILDING_PROMPT[BUILDING_NAMES.HUNTERHUT])}
                >
                  + Hunter's hut
                </PrimaryButton>
                <PrimaryButton
                  onClick={() => setPromptDialogue(ADD_BUILDING_PROMPT[BUILDING_NAMES.BUILDERHUT])}
                >
                  + Builderhut
                </PrimaryButton>
              </div>
            </div>
            <PrimaryButton>Upgrade Townhall</PrimaryButton>
          </div>
        )}

        {promptDialogue === ADD_BUILDING_PROMPT[BUILDING_NAMES.HUNTERHUT] && (
          <AddHunterhut setPromptDialogue={setPromptDialogue} handleSelectBuilding={handleSelectBuilding} />
        )}

        {promptDialogue === ADD_BUILDING_PROMPT[BUILDING_NAMES.BUILDERHUT] && (
          <AddBuilderhut setPromptDialogue={setPromptDialogue} handleSelectBuilding={handleSelectBuilding} />
        )}

        {promptDialogue === ADD_BUILDING_PROMPT[BUILDING_NAMES.HOUSE] && (
          <AddHouse setPromptDialogue={setPromptDialogue} handleSelectBuilding={handleSelectBuilding} />
        )}

        {promptDialogue === ADD_BUILDING_PROMPT[BUILDING_NAMES.SAWMILL] && (
          <AddSawmill setPromptDialogue={setPromptDialogue} handleSelectBuilding={handleSelectBuilding} />
        )}
      </div>
    </div>
  );
}