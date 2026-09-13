import { BUILDING_NAMES } from "../../../utilities/building-types";
import { PrimaryButton } from "../../common/buttons/PrimaryButton";
export function AddHunterhut({ setPromptDialogue,handleSelectBuilding }){
    return (
        <div>
            <div className="flex justify-between pb-6">
                <PrimaryButton onClick={() => setPromptDialogue(null)}>Back</PrimaryButton>
                <h2>Add Hunter's hut</h2>
            </div>
            <p>Build a new Hunter's hut. Adding more hunter hut helps in increased meat production rate.</p>
            <h3>Requirements</h3>
            <ul>
                <li>Gold: 500</li>
            </ul>
            <PrimaryButton onClick={() => {  
                handleSelectBuilding(BUILDING_NAMES.HUNTERHUT)
            }}>Place</PrimaryButton>
        </div>
    )
}


export function AddSawmill({ setPromptDialogue,handleSelectBuilding }){
    return (
        <div>
            <div className="flex justify-between pb-6">
                <PrimaryButton onClick={() => setPromptDialogue(null)}>Back</PrimaryButton>
                <h2>Add Sawmill</h2>
            </div>
            <p>Build a new Sawmill. Adding more sawmill helps in increased wood production rate.</p>
            <h3>Requirements</h3>
            <ul>
                <li>Gold: 500</li>
            </ul>
            <PrimaryButton onClick={() => {  
                handleSelectBuilding(BUILDING_NAMES.SAWMILL)
            }}>Place</PrimaryButton>
        </div>
    )
}


export function AddBuilderhut({ setPromptDialogue,handleSelectBuilding }){
    return (
        <div>
            <div className="flex justify-between pb-6">
                <PrimaryButton onClick={() => setPromptDialogue(null)}>Back</PrimaryButton>
                <h2>Add Builder hut</h2>
            </div>
            <p>Build a new Builder hut. Adding more hunter hut increases builder capacity</p>
            <h3>Requirements</h3>
            <ul>
                <li>Gold: 500</li>
            </ul>
            <PrimaryButton onClick={() => {  
                handleSelectBuilding(BUILDING_NAMES.BUILDERHUT)
            }}>Place</PrimaryButton>
        </div>
    )
}


export function AddHouse({ setPromptDialogue,handleSelectBuilding }){
    return (
        <div>
            <div className="flex justify-between pb-6">
                <PrimaryButton onClick={() => setPromptDialogue(null)}>Back</PrimaryButton>
                <h2>Add House</h2>
            </div>
            <p>Build a new House. Adding more House increases people capacity</p>
            <h3>Requirements</h3>
            <ul>
                <li>Gold: 500</li>
            </ul>
            <PrimaryButton onClick={() => {  
                handleSelectBuilding(BUILDING_NAMES.HOUSE)
            }}>Place</PrimaryButton>
        </div>
    )
}