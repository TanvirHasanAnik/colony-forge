import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBuilding, type BuildingInstance } from "../../../buildings/buildingSlice";
import { deductResources } from "../../../resources/resourceSlice";
import type { RootState } from "../../../store";
import { BUILDING_NAMES, type BuildingType } from "../../../utilities/building-types";
import { getResourceProductionRateFromBuilding, hasResource } from "../../../utilities/resource";
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

type TabType = "construct" | "census" | "upgrades";

// --- Inline Crisp SVG Icons ---
function TownhallIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4M9 10h.01M15 10h.01" />
    </svg>
  );
}

function HouseIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function SawmillIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9" />
      <path d="M15 13 9 7l4-4 6 6h3l-3 3" />
      <path d="M18 16a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  );
}

function HunterIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="22" y1="12" x2="18" y2="12" />
      <line x1="6" y1="12" x2="2" y2="12" />
      <line x1="12" y1="6" x2="12" y2="2" />
      <line x1="12" y1="22" x2="12" y2="18" />
    </svg>
  );
}

function BuilderIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 12-8.373 8.373a1 1 0 1 1-3-3L12 9" />
      <path d="m18 15 4-4a4 4 0 0 0-5.66-5.66l-4 4" />
      <path d="m2 2 4 4" />
    </svg>
  );
}

function CoinIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" className="opacity-30" />
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V18a1 1 0 0 1-2 0v-1.07A4 4 0 0 1 9.4 10.4a1 1 0 0 1 1.4 1.42A2 2 0 0 0 12 15a2 2 0 0 0 0-4c-1.9 0-3.5-1.12-3.5-2.75A2.75 2.75 0 0 1 11 5.57V5a1 1 0 0 1 2 0v.57A4 4 0 0 1 14.6 13a1 1 0 0 1-1.4-1.42A2 2 0 0 0 12 8a2 2 0 0 0 0 4c1.9 0 3.5 1.12 3.5 2.75A2.75 2.75 0 0 1 13 16.93z" />
    </svg>
  );
}

function WoodIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 18v-4c0-2.5 3.5-4 8-4s8 1.5 8 4v4c0 2.5-3.5 4-8 4s-8-1.5-8-4Z" />
      <path d="M4 14c0-2.5 3.5-4 8-4s8 1.5 8 4" />
      <path d="M4 10c0-2.5 3.5-4 8-4s8 1.5 8 4" />
    </svg>
  );
}

function MeatIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 8c-1.5 0-3-1-4.5-2.5a5.5 5.5 0 0 0-7.8 0 5.5 5.5 0 0 0 0 7.8c1.5 1.5 2.5 3 2.5 4.5 0 1.7 1.3 3.2 3 3.2 1.2 0 2.3-.7 2.8-1.8" />
      <circle cx="8" cy="8" r="2" />
    </svg>
  );
}

function CloseIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function HammerIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 12-8.5 8.5a2.12 2.12 0 1 1-3-3L12 9" />
      <path d="M17.64 15 22 10.64l-4.24-4.24-4.36 4.36" />
    </svg>
  );
}

const BUILDING_METADATA: Record<
  string,
  {
    role: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    badgeBg: string;
    iconBg: string;
    productionInfo: string;
  }
> = {
  [BUILDING_NAMES.HOUSE]: {
    role: "Population & Housing",
    icon: HouseIcon,
    accentColor: "text-amber-400",
    badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    iconBg: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    productionInfo: "+10 Coin / min",
  },
  [BUILDING_NAMES.SAWMILL]: {
    role: "Lumber Harvesting",
    icon: SawmillIcon,
    accentColor: "text-orange-400",
    badgeBg: "bg-orange-500/10 text-orange-300 border-orange-500/30",
    iconBg: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    productionInfo: "+10 Coin, +20 Wood / min",
  },
  [BUILDING_NAMES.HUNTERHUT]: {
    role: "Game & Provisions",
    icon: HunterIcon,
    accentColor: "text-rose-400",
    badgeBg: "bg-rose-500/10 text-rose-300 border-rose-500/30",
    iconBg: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    productionInfo: "+20 Coin, +20 Meat / min",
  },
  [BUILDING_NAMES.BUILDERHUT]: {
    role: "Labor & Construction",
    icon: BuilderIcon,
    accentColor: "text-emerald-400",
    badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    iconBg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    productionInfo: "+Builder Capacity",
  },
};

export default function TownhallDialogue({
  isOpen,
  onClose,
  isBuildingMode,
  setIsBuildingMode,
  hoveredCoords,
}: TownhallDialogueProps) {
  const dispatch = useDispatch();
  const buildings = useSelector((state: RootState) => state.buildings);
  const inventory = useSelector((state: RootState) => state.resources);

  const [selectedBuildingType, setSelectedBuildingType] = useState<BuildingType | null>(null);
  const [promptDialogue, setPromptDialogue] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("construct");

  const townhallInstance = buildings.find((b) => b.type === BUILDING_NAMES.TOWNHALL);
  const townhallLevel = townhallInstance?.level ?? 1;
  const productionRates = getResourceProductionRateFromBuilding(buildings);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (promptDialogue !== null) {
          setPromptDialogue(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, promptDialogue, onClose]);

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

  const constructableBuildings = [
    BUILDING_NAMES.HOUSE,
    BUILDING_NAMES.SAWMILL,
    BUILDING_NAMES.HUNTERHUT,
    BUILDING_NAMES.BUILDERHUT,
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="townhall-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md transition-all animate-in fade-in duration-200"
      onClick={() => {
        onClose();
        setPromptDialogue(null);
      }}
    >
      <div
        className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-700/70 rounded-2xl shadow-2xl shadow-black/80 text-slate-100 flex flex-col overflow-hidden max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Glowing Gradient Accent Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-amber-500 via-blue-500 to-emerald-400" />

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 pt-5 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/30 border border-blue-400/40 flex items-center justify-center text-blue-400 shadow-inner">
              <TownhallIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="townhall-dialog-title" className="text-xl font-bold text-white tracking-tight">
                  Townhall
                </h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono">
                  Level {townhallLevel}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Colony Headquarters & Construction Nexus
              </p>
            </div>
          </div>

          {/* Quick Resource Bar & Close */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs font-medium">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <CoinIcon /> {inventory.coin?.amount?.toLocaleString() ?? 0}
              </span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1 text-orange-400 font-bold">
                <WoodIcon /> {inventory.wood?.amount?.toLocaleString() ?? 0}
              </span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1 text-rose-400 font-bold">
                <MeatIcon /> {inventory.meat?.amount?.toLocaleString() ?? 0}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                setPromptDialogue(null);
              }}
              aria-label="Close dialog"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all cursor-pointer"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Render Prompt Sub-Dialogue (Add Building flow) OR Townhall Tabs */}
        {promptDialogue !== null ? (
          <div className="p-6 overflow-y-auto">
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
        ) : (
          <>
            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800/80 bg-slate-950/40 px-6 py-2.5">
              <button
                type="button"
                onClick={() => setActiveTab("construct")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "construct"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <HammerIcon className="w-3.5 h-3.5" />
                <span>Construction Yard</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("census")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "census"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
                <span>Colony Census</span>
                <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded-full text-slate-300 font-mono">
                  {buildings.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("upgrades")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "upgrades"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <TownhallIcon className="w-3.5 h-3.5" />
                <span>Citadel Tier</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded-full font-mono">
                  Lv {townhallLevel}
                </span>
              </button>
            </div>

            {/* Tab 1: Construction Yard */}
            {activeTab === "construct" && (
              <div className="p-6 overflow-y-auto space-y-4">
                <div className="flex items-center justify-between pb-1">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-200">
                      Construct Infrastructure
                    </h3>
                    <p className="text-xs text-slate-400">
                      Select a building to place on the colony grid.
                    </p>
                  </div>
                  <span className="text-xs text-slate-400 font-medium bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60">
                    Grid: {buildings.length}/25 tiles
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {constructableBuildings.map((typeKey) => {
                    const config = BUILDINGS_CONFIG[typeKey];
                    if (!config) return null;

                    const meta = BUILDING_METADATA[typeKey];
                    const IconComponent = meta?.icon ?? HouseIcon;
                    const canAfford = hasResource(inventory, config.requirements);

                    return (
                      <div
                        key={typeKey}
                        className="group relative bg-slate-800/50 hover:bg-slate-800/90 border border-slate-700/60 hover:border-slate-600 rounded-xl p-4 transition-all duration-200 flex flex-col justify-between"
                      >
                        {/* Header & Role */}
                        <div>
                          <div className="flex items-start justify-between gap-2 pb-2">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-9 h-9 rounded-lg border flex items-center justify-center ${meta.iconBg}`}
                              >
                                <IconComponent className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                                  {config.name}
                                </h4>
                                <span className="text-[10px] font-medium text-slate-400">
                                  {meta.role}
                                </span>
                              </div>
                            </div>
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${meta.badgeBg}`}
                            >
                              {meta.productionInfo}
                            </span>
                          </div>

                          <p className="text-xs text-slate-300 line-clamp-2 mt-1 mb-3">
                            {config.description}
                          </p>
                        </div>

                        {/* Cost & Actions */}
                        <div className="pt-2 border-t border-slate-700/50 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-slate-400">Cost:</span>
                            <span
                              className={`text-xs font-bold flex items-center gap-1 px-2 py-0.5 rounded-md ${
                                canAfford
                                  ? "bg-amber-500/10 text-amber-300 border border-amber-500/30"
                                  : "bg-red-500/10 text-red-400 border border-red-500/30"
                              }`}
                            >
                              <CoinIcon /> {config.requirements.coin ?? 0}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                const promptKey = ADD_BUILDING_PROMPT[typeKey as keyof typeof ADD_BUILDING_PROMPT];
                                if (promptKey) setPromptDialogue(promptKey);
                              }}
                              className="text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-700/60 hover:bg-slate-700 border border-slate-600/60 transition-all cursor-pointer"
                            >
                              Specs
                            </button>

                            <button
                              type="button"
                              disabled={!canAfford}
                              onClick={() => handleSelectBuilding(config.type)}
                              className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                                canAfford
                                  ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-700/30 hover:shadow-emerald-600/50 hover:scale-[1.02]"
                                  : "bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed opacity-60"
                              }`}
                            >
                              <HammerIcon className="w-3.5 h-3.5" />
                              <span>Place</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 2: Colony Census */}
            {activeTab === "census" && (
              <div className="p-6 overflow-y-auto space-y-5">
                {/* Stats Summary Strip */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 text-center">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Total Buildings
                    </span>
                    <p className="text-xl font-extrabold text-white mt-0.5">
                      {buildings.length}
                    </p>
                  </div>

                  <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 text-center">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Colony Grid Use
                    </span>
                    <p className="text-xl font-extrabold text-blue-400 mt-0.5">
                      {Math.round((buildings.length / 25) * 100)}%
                    </p>
                  </div>

                  <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 text-center">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Net Output
                    </span>
                    <div className="flex items-center justify-center gap-2 mt-1 text-xs font-bold text-amber-300">
                      <span>+{productionRates.coin ?? 0}🪙</span>
                      <span>+{productionRates.wood ?? 0}🪵</span>
                      <span>+{productionRates.meat ?? 0}🥩</span>
                    </div>
                  </div>
                </div>

                {/* Building Breakdown List */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-200 mb-2.5">
                    Settlement Infrastructure Breakdown
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(getBuildingCounts()).map(([type, count]) => {
                      const meta = BUILDING_METADATA[type];
                      const IconComponent = meta?.icon ?? TownhallIcon;

                      return (
                        <div
                          key={type}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/70 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-slate-700/60 border border-slate-600/50 flex items-center justify-center text-slate-300">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-white">{type}</p>
                              <span className="text-[11px] text-slate-400">
                                {meta?.role ?? "Colony Core"}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                              Active
                            </span>
                            <span className="text-sm font-extrabold text-white font-mono bg-slate-700/60 px-3 py-1 rounded-lg border border-slate-600">
                              {count}x
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Citadel Tier / Upgrades */}
            {activeTab === "upgrades" && (
              <div className="p-6 overflow-y-auto space-y-4">
                <div className="bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-700/40 rounded-xl p-5 relative overflow-hidden">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/20 border border-amber-500/40 px-2.5 py-0.5 rounded-full">
                        Townhall Tier {townhallLevel}
                      </span>
                      <h3 className="text-lg font-bold text-white mt-2">
                        Settlement Outpost
                      </h3>
                      <p className="text-xs text-slate-300 max-w-md mt-1 leading-relaxed">
                        Upgrade the Townhall to expand colony territory, unlock higher building tiers, and attract specialized builders and craftsmen.
                      </p>
                    </div>
                    <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 items-center justify-center text-amber-400 shadow-lg">
                      <TownhallIcon className="w-8 h-8" />
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-indigo-800/40">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                      Next Tier (Level 2) Perks:
                    </h4>
                    <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                      <li>Unlocks Stone Quarry & Masonry Workshop</li>
                      <li>Increases population storage and tax revenues</li>
                      <li>Unlocks Colony Wall fortification</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl">
                  <div>
                    <span className="text-xs font-semibold text-slate-400">
                      Tier 2 Requirements:
                    </span>
                    <div className="flex items-center gap-3 mt-1 text-xs font-bold">
                      <span className="flex items-center gap-1 text-amber-400">
                        <CoinIcon /> 1,000 Coin
                      </span>
                      <span className="flex items-center gap-1 text-orange-400">
                        <WoodIcon /> 500 Wood
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-900/40 transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    Upgrade Townhall
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}