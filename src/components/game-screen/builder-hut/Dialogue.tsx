import { PrimaryButton } from "../../common/buttons/PrimaryButton";
export default function BuilderHutDialogue({isOpen, onClose}){
    if (!isOpen) return null;
    return (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
              onClick={onClose}
            >
              <div
                className="bg-blue-200 max-w-md w-full p-3"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between">
                  <h2>
                    Builder's hut <span>Lv 1</span>
                  </h2>
                  <PrimaryButton onClick={onClose}>X</PrimaryButton>
                </div>
                <br />
                <div className="flex flex-col items-start gap-3 pb-10">
                    <p>
                        Builders are required to construct or upgrade buildings.
                    </p>
                    <h3>Total Builders: <span>3</span></h3>
                    <h3>Idle Builders: <span>1</span></h3>
                </div>

                <div className="pb-10">
                    <h3>Currently working</h3>
                    <ul>
                        <li>Hunter hut upgrade: 1 ETA: 2 min</li>
                        <li>New house: 1 ETA: 5 min</li>
                    </ul>
                </div>

                <div className="pb-4">
                    <h3>Next Upgrade: <span>Total builders 5</span></h3>
                </div>

                <div className="pb-10">
                    <h3>Upgrade Requirements</h3>
                    <ul>
                        <li>Wood: 50</li>
                        <li>Meat: 200</li>
                        <li>Coin: 100</li>
                    </ul>
                </div>
                <PrimaryButton>Upgrade Builder's Hut</PrimaryButton>
              </div>
            </div>
    )
}