import './App.scss'
import {BrowserRouter, Switch , Route} from "react-router-dom"
import GameList from "./components/GameList.js"
import GameDetails from "./components/GameDetails.js"

function Home() {
  return <>
    <GameList category="localcoop" title="Local Co-op"/>
    <GameList category="localpvp" title="Local PVP"/>
    <GameList category="onlinecoop" title="Online Co-op"/>
  </>
}

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/game/:id" component={GameDetails}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
