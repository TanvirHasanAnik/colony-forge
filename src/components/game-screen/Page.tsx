import { useState } from "react";
import TownhallDialogue from "./townhall/Dialogue";
export default function GameScreen(){
  const [activeDialogue, setActiveDialogue] = useState<any>(null);
  const handleOpenDialogue = (dialogueName: string) => {
    setActiveDialogue(dialogueName);
  };

  const handleCloseDialogue = () => {
    setActiveDialogue(null);
  };
  return (
      <>
        <TownhallDialogue isOpen={activeDialogue === "townhall"} onClose={handleCloseDialogue}/>
        <div className='grid grid-cols-5 grid-rows-5 gap-2 border border-gray-400 h-full w-full items-center justify-center'>
          <button 
          onClick={() => handleOpenDialogue('townhall')}
          className='col-start-3 row-start-3 text-white cursor-pointer bg-blue-400 hover:bg-blue-600 w-full h-full rounded'>Townhall</button>
          <button className='col-start-4 row-start-4 text-white cursor-pointer bg-yellow-400 hover:bg-yellow-600 w-full h-full rounded'>House</button>
          <button className='col-start-2 row-start-2 text-white cursor-pointer bg-red-400 hover:bg-red-600 w-full h-full rounded'>Hunter's hut</button>
          <button className='col-start-2 row-start-4 text-white cursor-pointer bg-amber-600 hover:bg-amber-800 w-full h-full rounded'>Sawmill</button>
          <button className='col-start-4 row-start-3 text-white cursor-pointer bg-green-400 hover:bg-green-600 w-full h-full rounded'>Builderhut</button>
        </div>
      </>
    )
}