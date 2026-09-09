import { useEffect, useState } from "react";
import { BUILDING_NAMES } from "../../../utilities/building-types";
import { PrimaryButton } from "../../common/buttons/PrimaryButton";

export default function TownhallDialogue({
  isOpen,
  onClose,
  setBuildings,
  isBuildingMode,
  setIsBuildingMode,
  hoveredCoords,
  buildings,
}) {
  const [selectedBuildingType, setSelectedBuildingType] = useState<string | null>(null);

  const addBuilding = (buildingType: string, x: number, y: number) => {
    const newBuilding = {
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
    onClose();
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
      onClick={onClose}
    >
      <div
        className="bg-blue-200 max-w-md w-full p-3"
        onClick={(e) => e.stopPropagation()}
      >
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
              <li>House 1x</li>
              <li>Sawmill 1x</li>
              <li>Hunter's hut 1x</li>
              <li>Builderhut 1x</li>
            </ul>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="pb-2">Construct more</h3>
            <PrimaryButton
              className="mb-2"
              onClick={() => handleSelectBuilding(BUILDING_NAMES.HOUSE)}
            >
              + house
            </PrimaryButton>
            <PrimaryButton
              className="mb-2"
              onClick={() => handleSelectBuilding(BUILDING_NAMES.SAWMILL)}
            >
              + Sawmill
            </PrimaryButton>
            <PrimaryButton
              className="mb-2"
              onClick={() => handleSelectBuilding(BUILDING_NAMES.HUNTERHUT)}
            >
              + Hunter's hut
            </PrimaryButton>
            <PrimaryButton
              onClick={() => handleSelectBuilding(BUILDING_NAMES.BUILDERHUT)}
            >
              + Builderhut
            </PrimaryButton>
          </div>
        </div>
        <PrimaryButton>Upgrade Townhall</PrimaryButton>
      </div>
    </div>
  );
}