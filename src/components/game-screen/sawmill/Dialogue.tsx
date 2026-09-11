import { PrimaryButton } from "../../common/buttons/PrimaryButton";
export default function SawmillDialogue({isOpen, onClose}){
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
                    Sawmill <span>Lv 1</span>
                  </h2>
                  <PrimaryButton onClick={onClose}>X</PrimaryButton>
                </div>
                <br />
                <div className="flex flex-col items-start gap-3 pb-10">
                    <p>
                        Sawmill produces wood with time. Current level produces 6 wood/minute per worker.
                    </p>
                    <h3>Workers: <span>1</span></h3>
                    <h3>Meat production rate: <span>6 wood per minute</span></h3>
                    <h3>Next upgrade: 12 wood per worker</h3>
                </div>

                <div className="pb-10">
                    <h3>Upgrade Requirements</h3>
                    <ul>
                        <li>Coin: 100</li>
                    </ul>
                </div>
                <PrimaryButton>Upgrade Sawmill</PrimaryButton>
              </div>
            </div>
    )
}