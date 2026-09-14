import { useDispatch, useSelector } from "react-redux";
import { RESOURCE_NAMES } from "../../constantStrings";
import { addResources, deductResources } from "../../resources/resourceSlice";


export default function StatusBar() {
  const resources = useSelector((state) => state.resources);
  const dispatch = useDispatch()

  const navItems = Object.values(RESOURCE_NAMES).map((resourceKey) => ({
    id: resourceKey,
    label: resourceKey,
    value: resources[resourceKey],
  }));

  return (
    <div className="flex items-center gap-6 bg-slate-900 px-6 py-3 text-white shadow-md">
      {navItems.map(({ id, label, value }) => (
        <div key={id} className="flex items-center gap-2 font-medium">
          <span className="text-slate-400">{label}:</span>
          <span className="font-bold text-amber-400">
            {value?.toLocaleString() ?? 0}
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