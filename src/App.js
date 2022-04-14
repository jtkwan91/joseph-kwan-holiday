import "./App.scss"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import GameList from "./components/GameList/GameList"
import GameDetails from "./components/GameDetails/GameDetails"

function Home() {
  return (
    <>
      <h1 className="header">TOP Steam Games</h1>
      <div className="lists">
        <GameList category="localcoop" title="Local Co-op" />
        <GameList category="localpvp" title="Local PVP" />
        <GameList category="onlinecoop" title="Online Co-op" />
      </div>
    </>
  )
}

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/game/:id" component={GameDetails} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
