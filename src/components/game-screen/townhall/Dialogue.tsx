import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBuilding, type BuildingInstance } from "../../../buildings/buildingSlice";
import { deductResources } from "../../../resources/resourceSlice";
import type { RootState } from "../../../store";
import { BUILDING_NAMES, type BuildingType } from "../../../utilities/building-types";
import { PrimaryButton } from "../../common/buttons/PrimaryButton";
import {
  AddHunterhut,
  AddBuilderhut,
  AddSawmill,
  AddHouse,
} from "./AddBuildingPrompt";
import { ADD_BUILDING_PROMPT, BUILDINGS_CONFIG } from "./constantStrings";

export type Building = BuildingInstance;

interface HoveredCoords {
  x: number;
  y: number;
}

interface TownhallDialogueProps {
  isOpen: boolean;
  onClose: () => void;
  isBuildingMode: boolean;
  setIsBuildingMode: (value: boolean) => void;
  hoveredCoords: HoveredCoords | null;
  setBuildings?: React.Dispatch<React.SetStateAction<BuildingInstance[]>>;
  buildings?: BuildingInstance[];
}

export default function TownhallDialogue({
  isOpen,
  onClose,
  isBuildingMode,
  setIsBuildingMode,
  hoveredCoords,
}: TownhallDialogueProps) {
  const dispatch = useDispatch();
  const buildings = useSelector((state: RootState) => state.buildings);

  const [selectedBuildingType, setSelectedBuildingType] = useState<BuildingType | null>(null);
  const [promptDialogue, setPromptDialogue] = useState<string | null>(null);

  const handleAddBuilding = useCallback(
    (buildingType: BuildingType, x: number, y: number) => {
      dispatch(
        addBuilding({
          type: buildingType,
          gridX: x,
          gridY: y,
          level: 1,
        })
      );

      const config = BUILDINGS_CONFIG[buildingType];
      if (config?.requirements) {
        dispatch(deductResources(config.requirements));
      }

      setIsBuildingMode(false);
      setSelectedBuildingType(null);
    },
    [dispatch, setIsBuildingMode]
  );

  const handleSelectBuilding = (buildingType: string) => {
    setSelectedBuildingType(buildingType as BuildingType);
    setIsBuildingMode(true);
    setPromptDialogue(null);
    onClose();
  };

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
        handleAddBuilding(selectedBuildingType, hoveredCoords.x, hoveredCoords.y);
      }
    };

    window.addEventListener("click", handleGridClick);
    return () => window.removeEventListener("click", handleGridClick);
  }, [isBuildingMode, selectedBuildingType, hoveredCoords, buildings, handleAddBuilding]);

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