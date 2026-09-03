import './App.css'
import GameScreen from './components/game-screen/Page'
import StatusBar from './components/layout/StatusBar'
import ActionBar from './components/layout/ActionBar'
function App() {
  return (
    <>
        <StatusBar/>
        <main className='h-full w-full'>
          <GameScreen/>
        </main>
        <footer className='bg-green-200 h-20'>
          <ActionBar/>
        </footer>
    </>
  )
}

export default App
