import { PrimaryButton } from "../../common/buttons/PrimaryButton"


export default function TownhallDialogue({isOpen, onClose, setBuildings}){
    if(!isOpen) return null
    // Helper to place a new building
    const addBuilding = (buildingType, x, y) => {
        const newBuilding = {
        id: crypto.randomUUID(), // Unique instance ID
        type: buildingType,      // References key in BUILDING_TYPES
        gridX: x,
        gridY: y,
        level: 1,
        lastCollected: Date.now()
        };

        setBuildings((prev) => [...prev, newBuilding]);
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <div className="bg-blue-200 max-w-md w-full p-3" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between">
                    <h2>Townhall <span>Lv 1</span></h2>
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
                            <li>Builderut 1x</li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-start">
                        <h3 className="pb-2">Construct more</h3>
                        <PrimaryButton className="mb-2" onClick={() => addBuilding("HOUSE",1,1)}>+ house</PrimaryButton>
                        <PrimaryButton className="mb-2">+ Sawmill</PrimaryButton>
                        <PrimaryButton className="mb-2">+ Hunter's hut</PrimaryButton>
                        <PrimaryButton>+ Builderhut</PrimaryButton>
                    </div>
                </div>
                <PrimaryButton>Upgrade Townhall</PrimaryButton>
            </div>
        </div>
    )
}