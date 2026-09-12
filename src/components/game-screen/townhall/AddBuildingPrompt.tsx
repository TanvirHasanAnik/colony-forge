import { BUILDING_NAMES } from "../../../utilities/building-types";
import { PrimaryButton } from "../../common/buttons/PrimaryButton";
export function AddHunterhut({ setPromptDialogue,handleSelectBuilding }){
    return (
        <div>
            <div className="flex justify-between pb-6">
                <PrimaryButton onClick={() => setPromptDialogue(null)}>Back</PrimaryButton>
                <h2>Add Hunter's hut</h2>
            </div>
            <p>Build a new Hunter's hut. Building new hunter hut helps in increased meat production rate.</p>
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