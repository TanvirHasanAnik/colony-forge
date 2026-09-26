import './App.css'
import GameScreen from './components/game-screen/Page'
import StatusBar from './components/layout/StatusBar'
import ActionBar from './components/layout/ActionBar'
function App() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <StatusBar/>
      <main className="flex-1 w-full">
        <GameScreen/>
      </main>
      <ActionBar/>
    </div>
  )
}

export default App
