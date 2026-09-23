import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addResources, deductResources, setProductionRate } from "../../resources/resourceSlice";
import { RESOURCE_NAMES } from "../../resources/type";
import type { RootState } from "../../store";
import { getResourceProductionRateFromBuilding } from "../../utilities/resource";



export default function StatusBar() {
  const resources = useSelector((state: RootState) => state.resources);
  const buildings = useSelector((state: RootState) => state.buildings);
  const dispatch = useDispatch()
  const productionRateSum = getResourceProductionRateFromBuilding(buildings)
  useEffect(() => {
    dispatch(setProductionRate(productionRateSum))
  },[buildings,dispatch,productionRateSum]);

  const navItems = Object.values(RESOURCE_NAMES).map((resourceKey) => ({
    id: resourceKey,
    label: resourceKey,
    amount: resources[resourceKey].amount,
    rate: resources[resourceKey].rate
  }));

  return (
    <div className="flex items-center gap-6 bg-slate-900 px-6 py-3 text-white shadow-md">
      {navItems.map(({ id, label, amount,rate }) => (
        <div key={id} className="flex items-center gap-2 font-medium">
          <span className="text-slate-400">{label}:</span>
          <span className="font-bold text-amber-400">
            {amount?.toLocaleString() ?? 0}
          </span>
          <span className="font-bold text-amber-400">
            {rate?.toLocaleString() ?? 0}
          </span>
        </div>
      ))}
      <button
        onClick={() => dispatch(addResources({[RESOURCE_NAMES.COIN]:10}))}
      >Add 10 coin</button>
      <button
        onClick={() => dispatch(deductResources({[RESOURCE_NAMES.COIN]:10}))}
      >Reduce 10 coin</button>
    </div>
  );
}