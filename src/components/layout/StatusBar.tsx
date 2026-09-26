import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addResources, deductResources, setProductionRate } from "../../resources/resourceSlice";
import { RESOURCE_NAMES } from "../../resources/type";
import type { RootState } from "../../store";
import { getResourceProductionRateFromBuilding } from "../../utilities/resource";
import { CoinIcon } from "../common/icons/CoinIcon";
import { WoodIcon } from "../common/icons/WoodIcon";
import { MeatIcon } from "../common/icons/MeatIcon";

const resourceIcons = {
  [RESOURCE_NAMES.COIN]: CoinIcon,
  [RESOURCE_NAMES.WOOD]: WoodIcon,
  [RESOURCE_NAMES.MEAT]: MeatIcon,
};

const resourceColors = {
  [RESOURCE_NAMES.COIN]: "text-amber-400",
  [RESOURCE_NAMES.WOOD]: "text-amber-600",
  [RESOURCE_NAMES.MEAT]: "text-red-400",
};

const resourceBgColors = {
  [RESOURCE_NAMES.COIN]: "bg-amber-500/10 border-amber-500/20",
  [RESOURCE_NAMES.WOOD]: "bg-amber-600/10 border-amber-600/20",
  [RESOURCE_NAMES.MEAT]: "bg-red-500/10 border-red-500/20",
};

export default function StatusBar() {
  const resources = useSelector((state: RootState) => state.resources);
  const buildings = useSelector((state: RootState) => state.buildings);
  const dispatch = useDispatch();
  const productionRateSum = getResourceProductionRateFromBuilding(buildings);

  useEffect(() => {
    dispatch(setProductionRate(productionRateSum));
  }, [buildings, dispatch, productionRateSum]);

  const resourceItems = Object.values(RESOURCE_NAMES).map((resourceKey) => ({
    id: resourceKey,
    label: resourceKey,
    amount: resources[resourceKey]?.amount ?? 0,
    rate: resources[resourceKey]?.rate ?? 0,
  }));

  return (
    <header className="bg-slate-950/80 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-3 py-3">
          {/* Resources Display */}
          <div className="flex flex-wrap items-center gap-2">
            {resourceItems.map(({ id, label, amount, rate }) => {
              const Icon = resourceIcons[id as keyof typeof resourceIcons];
              const colorClass = resourceColors[id as keyof typeof resourceColors];
              const bgClass = resourceBgColors[id as keyof typeof resourceBgColors];
              const isPositiveRate = rate > 0;

              return (
                <div
                  key={id}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200 ${bgClass} hover:border-opacity-50`}
                  title={`${label}: ${amount.toLocaleString()} (${rate >= 0 ? '+' : ''}${rate}/s)`}
                >
                  {/* Resource Icon */}
                  <div className="relative flex-shrink-0">
                    {Icon && (
                      <Icon className={`w-5 h-5 ${colorClass} drop-shadow-[0_0_8px_currentColor]`} />
                    )}
                  </div>

                  {/* Resource Info */}
                  <div className="flex flex-col min-w-[80px]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                        {label}
                      </span>
                      <span className={`font-bold tabular-nums text-sm ${colorClass}`}>
                        {amount.toLocaleString()}
                      </span>
                    </div>

                    {/* Production Rate */}
                    <div className="flex items-center gap-1">
                      {rate !== 0 && (
                        <>
                          <span
                            className={`text-xs font-medium tabular-nums ${
                              isPositiveRate ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            {isPositiveRate ? "+" : ""}{rate}/s
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {isPositiveRate ? "↑" : "↓"} production
                          </span>
                        </>
                      )}
                      {rate === 0 && (
                        <span className="text-xs text-slate-500">Idle</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Debug Buttons - only show in development */}
          {import.meta.env.DEV && (
            <div className="flex items-center gap-2 ml-auto border-l border-slate-700 pl-4">
              <button
                onClick={() => dispatch(addResources({ [RESOURCE_NAMES.COIN]: 10 }))}
                className="px-3 py-1.5 text-xs font-medium text-slate-900 bg-amber-400 rounded-lg hover:bg-amber-300 active:bg-amber-500 transition-colors disabled:opacity-50"
                title="Add 10 coins (dev)"
              >
                +10 Coin
              </button>
              <button
                onClick={() => dispatch(deductResources({ [RESOURCE_NAMES.COIN]: 10 }))}
                className="px-3 py-1.5 text-xs font-medium text-white bg-slate-700 rounded-lg hover:bg-slate-600 active:bg-slate-800 transition-colors disabled:opacity-50"
                title="Remove 10 coins (dev)"
              >
                -10 Coin
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}