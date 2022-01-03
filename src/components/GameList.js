import React from "react"
import axios from "axios"
import Game from "./Game.js"
import "./GameList.css"

function fetchCategory(c) {
  return axios.get(`http://localhost:3001/apps/?cat=${c}`).then(r => r.data)
}

function fetchApp(id) {
  return axios.get(`http://store.steampowered.com/api/appdetails?appids=${id}`).then(r => r.data)
}

class GameList extends React.Component {

  state = { loading: true, error: null, games: [] }

  componentDidMount () {
    fetchCategory(this.props.category).then(games => {
      this.setState({ games: games })
    })
    .catch(error => this.setState({ error: error }))
    .finally(_ => this.setState({ loading: false }))
  }

  render () {
    if (this.state.loading)
      return <div>Loading...</div>
    else if (this.state.error)
      return <div>Error: {this.state.error.message}</div>
    else
      return <div className="game__list">
        <h3 className="game__list-title">{this.props.title}</h3>
        {this.state.games.map(game => {
          return <Game id={game.id} name={game.name} key={game.id}/>
        })}
      </div>
  }
}


export default GameList
