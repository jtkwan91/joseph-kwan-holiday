import './App.css'
import GameList from "./components/GameList.js"

function App() {
  return (
    <div className="app">
      <GameList category="localcoop" title="Local Co-op"/>
      <GameList category="localpvp" title="Local PVP"/>
      <GameList category="onlinecoop" title="Online Co-op"/>
    </div>
  )
}

export default App
