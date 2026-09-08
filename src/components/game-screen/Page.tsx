import { useState } from "react";
import TownhallDialogue from "./townhall/Dialogue";
import {  BUILDING_CONFIGS, BUILDING_NAMES } from "../../utilities/building-types";
export default function GameScreen(){
  interface BuildingInstance {
    id: string;
    type: keyof typeof BUILDING_CONFIGS;
    gridX: number; 
    gridY: number; 
    level: number;
    lastCollected: number;
  }
  const [activeDialogue, setActiveDialogue] = useState<any>(null);
  const handleOpenDialogue = (dialogueName: string) => {
    setActiveDialogue(dialogueName);
  };

  const [buildings, setBuildings] = useState<BuildingInstance[]>([
    { id: "b1", type: BUILDING_NAMES.TOWNHALL, gridX: 2, gridY: 2, level: 1, lastCollected: Date.now() },
    { id: "b2", type: BUILDING_NAMES.HOUSE, gridX: 3, gridY: 3, level: 1, lastCollected: Date.now() },
    { id: "b3", type: BUILDING_NAMES.HUNTERHUT, gridX: 1, gridY: 1, level: 1, lastCollected: Date.now() },
    { id: "b4", type: BUILDING_NAMES.SAWMILL, gridX: 1, gridY: 3, level: 1, lastCollected: Date.now() },
    { id: "b5", type: BUILDING_NAMES.BUILDERHUT, gridX: 3, gridY: 2, level: 1, lastCollected: Date.now() },
  ]);

  const handleCloseDialogue = () => {
    setActiveDialogue(null);
  };
  return (
      <>
        <TownhallDialogue isOpen={activeDialogue === BUILDING_NAMES.TOWNHALL} onClose={handleCloseDialogue} setBuildings={setBuildings}/>
        <div className="grid grid-cols-5 grid-rows-5 gap-2 border border-gray-400 h-full w-full items-center justify-center">
        {buildings.map((b) => {
          const config = BUILDING_CONFIGS[b.type];
          // const dialogueName = "dialogName" in config ? config.dialogName : undefined;

          return (
            <button
              key={b.id}
              onClick={() => handleOpenDialogue(b.type)}
              style={{
                gridColumnStart: b.gridX + 1,
                gridRowStart: b.gridY + 1,
              }}
              className={`text-white cursor-pointer w-full h-full rounded transition-colors ${
                config.color || "bg-gray-500 hover:bg-gray-700"
              }`}
            >
              {config.name}
            </button>
          );
        })}
      </div>
      </>
    )
}