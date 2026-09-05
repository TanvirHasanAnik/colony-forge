export default function TownhallDialogue({isOpen, onClose}){
    if(!isOpen) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <div className="bg-blue-200" onClick={(e) => e.stopPropagation()}>
                <div className="flex">
                    <h2>Townhall</h2>
                    <button onClick={onClose}>Close</button>
                </div>
                <p>This is a townhall</p>
            </div>
        </div>
    )
}