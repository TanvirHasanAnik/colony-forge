import { MouseEvent, useState } from "react";
import { BUILDING_CONFIGS, BUILDING_NAMES } from "../../utilities/building-types";
import TownhallDialogue from "./townhall/Dialogue";

export default function GameScreen() {
  interface BuildingInstance {
    id: string;
    type: keyof typeof BUILDING_CONFIGS;
    gridX: number;
    gridY: number;
    level: number;
    lastCollected: number;
  }

  const [activeDialogue, setActiveDialogue] = useState<string | null>(null);
  const [hoveredCoords, setHoveredCoords] = useState<{ x: number; y: number } | null>(null);
  const [isBuildingMode, setIsBuildingMode] = useState<boolean>(false);

  const GRID_COLS = 5;
  const GRID_ROWS = 5;

  const [buildings, setBuildings] = useState<BuildingInstance[]>([
    { id: "b1", type: BUILDING_NAMES.TOWNHALL, gridX: 2, gridY: 2, level: 1, lastCollected: Date.now() },
    { id: "b2", type: BUILDING_NAMES.HOUSE, gridX: 3, gridY: 3, level: 1, lastCollected: Date.now() },
    { id: "b3", type: BUILDING_NAMES.HUNTERHUT, gridX: 1, gridY: 1, level: 1, lastCollected: Date.now() },
    { id: "b4", type: BUILDING_NAMES.SAWMILL, gridX: 1, gridY: 3, level: 1, lastCollected: Date.now() },
    { id: "b5", type: BUILDING_NAMES.BUILDERHUT, gridX: 3, gridY: 2, level: 1, lastCollected: Date.now() },
  ]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    const x = Math.floor((relativeX / rect.width) * GRID_COLS);
    const y = Math.floor((relativeY / rect.height) * GRID_ROWS);

    const clampedX = Math.max(0, Math.min(GRID_COLS - 1, x));
    const clampedY = Math.max(0, Math.min(GRID_ROWS - 1, y));

    setHoveredCoords({ x: clampedX, y: clampedY });
  };

  const isOccupied = hoveredCoords
    ? buildings.some((b) => b.gridX === hoveredCoords.x && b.gridY === hoveredCoords.y)
    : false;

  return (
    <>
      <TownhallDialogue
        isOpen={activeDialogue === BUILDING_NAMES.TOWNHALL}
        onClose={() => setActiveDialogue(null)}
        setBuildings={setBuildings}
        buildings={buildings}
        isBuildingMode={isBuildingMode}
        setIsBuildingMode={setIsBuildingMode}
        hoveredCoords={hoveredCoords}
      />

      <div className="text-center font-bold p-2 bg-slate-800 text-white rounded mb-2 flex justify-between px-4 items-center">
        <span>
          {hoveredCoords 
            ? `Cursor: (${hoveredCoords.x}, ${hoveredCoords.y})` 
            : "Hover over the grid"}
        </span>
        {isBuildingMode && (
          <span className="text-yellow-400 font-extrabold animate-pulse">
            🔨 BUILD MODE ACTIVE (Click an empty tile to place)
          </span>
        )}
      </div>

      <div 
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredCoords(null)}
        className={`grid grid-cols-5 grid-rows-5 gap-2 border border-gray-400 h-full w-full items-center justify-center p-2 bg-slate-100 relative ${
          isBuildingMode ? "cursor-crosshair" : ""
        }`}
      >
        {buildings.map((b) => {
          const config = BUILDING_CONFIGS[b.type];

          return (
            <button
              key={b.id}
              onClick={(e) => {
                // Prevent grid placement handler when clicking an existing building
                if (isBuildingMode) e.stopPropagation();
                setActiveDialogue(b.type);
              }}
              style={{
                gridColumnStart: b.gridX + 1,
                gridRowStart: b.gridY + 1,
              }}
              className={`text-white cursor-pointer w-full h-full rounded transition-all duration-150 z-10 ${
                config.color || "bg-gray-500"
              } hover:brightness-110 hover:ring-4 hover:ring-yellow-400`}
            >
              {config.name}
            </button>
          );
        })}

        {isBuildingMode && hoveredCoords && (
          <div
            style={{
              gridColumnStart: hoveredCoords.x + 1,
              gridRowStart: hoveredCoords.y + 1,
            }}
            className={`w-full h-full rounded border-2 transition-all duration-75 pointer-events-none flex items-center justify-center font-bold text-xs ${
              isOccupied
                ? "bg-red-500/40 border-red-600 text-red-900 animate-pulse"
                : "bg-emerald-500/40 border-emerald-600 text-emerald-900 animate-pulse"
            }`}
          >
            {isOccupied ? "Occupied!" : "Place Here"}
          </div>
        )}
      </div>
    </>
  );
}