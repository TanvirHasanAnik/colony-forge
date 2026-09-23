import { useSelector } from "react-redux";
import type { ResourceKey } from "../../../resources/type";
import type { RootState } from "../../../store";
import { BUILDING_NAMES } from "../../../utilities/building-types";
import { hasResource } from "../../../utilities/resource";
import { BUILDINGS_CONFIG, type BuildingConfig } from "./constantStrings";

interface AddBuildingProps {
  setPromptDialogue: (value: null) => void;
  handleSelectBuilding: (buildingName: string) => void;
}

function CoinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" className="opacity-30" />
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V18a1 1 0 0 1-2 0v-1.07A4 4 0 0 1 9.4 10.4a1 1 0 0 1 1.4 1.42A2 2 0 0 0 12 15a2 2 0 0 0 0-4c-1.9 0-3.5-1.12-3.5-2.75A2.75 2.75 0 0 1 11 5.57V5a1 1 0 0 1 2 0v.57A4 4 0 0 1 14.6 13a1 1 0 0 1-1.4-1.42A2 2 0 0 0 12 8a2 2 0 0 0 0 4c1.9 0 3.5 1.12 3.5 2.75A2.75 2.75 0 0 1 13 16.93z" />
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

function AddBuildingModal({
  config,
  setPromptDialogue,
  handleSelectBuilding,
}: AddBuildingProps & { config: BuildingConfig }) {
  const inventory = useSelector((state: RootState) => state.resources);
  const canAfford = hasResource(inventory, config.requirements);

  return (
    <div className="space-y-5">
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <button
          type="button"
          onClick={() => setPromptDialogue(null)}
          className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-all cursor-pointer"
        >
          ← Back to Townhall
        </button>

        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-mono">
          Blueprint Specification
        </span>
      </div>

      {/* Building Hero Card */}
      <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-4">
        <h3 className="text-lg font-bold text-white">
          Construct {config.name}
        </h3>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          {config.description}
        </p>
      </div>

      {/* Construction Requirements */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Required Resources
        </h4>
        <div className="space-y-2">
          {Object.entries(config.requirements).map(([resource, amount]) => {
            const currentAmount = inventory[resource as ResourceKey]?.amount ?? 0;
            const required = amount ?? 0;
            const isEnough = currentAmount >= required;
            const percentage = Math.min(100, Math.round((currentAmount / (required || 1)) * 100));

            return (
              <div
                key={resource}
                className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-3 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                    <CoinIcon className="text-amber-400" />
                    {resource}
                  </span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-slate-400">
                      Owned: <strong className="text-white">{currentAmount}</strong> / {required}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isEnough
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                          : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                      }`}
                    >
                      {isEnough ? "Available" : `Short ${required - currentAmount}`}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      isEnough ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Guide Callout */}
      <div className="bg-blue-950/30 border border-blue-800/40 rounded-xl p-3 text-xs text-blue-200/90 flex items-start gap-2.5">
        <span className="text-blue-400 text-sm">💡</span>
        <p>
          Once you click <strong>Enter Placement Mode</strong>, the dialogue will close. Click any empty green tile on the colony map to finalize construction.
        </p>
      </div>

      {/* Action Footer */}
      <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
        <button
          type="button"
          onClick={() => setPromptDialogue(null)}
          className="text-xs font-semibold text-slate-400 hover:text-white px-4 py-2 rounded-xl transition-colors cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="button"
          disabled={!canAfford}
          onClick={() => {
            if (canAfford) {
              handleSelectBuilding(config.type);
            }
          }}
          className={`flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg transition-all cursor-pointer ${
            canAfford
              ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/50 hover:scale-[1.02]"
              : "bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed opacity-60"
          }`}
        >
          <HammerIcon className="w-4 h-4" />
          <span>{canAfford ? "Enter Placement Mode" : "Insufficient Resources"}</span>
        </button>
      </div>
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