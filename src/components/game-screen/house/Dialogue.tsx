import { PrimaryButton } from "../../common/buttons/PrimaryButton";

interface DialogueProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HouseDialogue({ isOpen, onClose }: DialogueProps) {
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
            House <span>Lv 1</span>
          </h2>
          <PrimaryButton onClick={onClose}>X</PrimaryButton>
        </div>
        <br />
        <div className="flex flex-col items-start gap-3 pb-10">
          <p>
            House shelters people in the colony. Single person consumes 1 meat per minute.
          </p>
          <h3>
            People capacity: <span>10</span>
          </h3>
          <h3>
            Working people: <span>7</span>
          </h3>
          <h3>
            Meat consumption: <span>7 per minute</span>
          </h3>
        </div>

        <div className="pb-10">
          <h3>Currently working</h3>
          <ul>
            <li>Hunter hut: 4 people</li>
            <li>Sawmill: 3 people</li>
          </ul>
        </div>

        <div className="pb-4">
          <h3>
            Next Upgrade: <span>Capacity 15</span>
          </h3>
        </div>

        <div className="pb-10">
          <h3>Upgrade Requirements</h3>
          <ul>
            <li>Wood: 100</li>
            <li>Meat: 200</li>
            <li>Coin: 100</li>
          </ul>
        </div>
        <PrimaryButton>Upgrade House</PrimaryButton>
      </div>
    </div>
  );
}