import React from "react"
import axios from "axios"
import Game from "./Game.js"
import { Link } from "react-router-dom"
import "./GameList.scss"

function fetchCategory(c) {
  return axios.get(`http://localhost:3001/apps/?cat=${c}`).then(r => r.data)
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
      return <div className="game__list">Loading...</div>
    else if (this.state.error)
      return <div className="game__list">Error: {this.state.error.message}</div>
    else
      return <div className="game__list">
        <h3 className="game__list-title">{this.props.title}</h3>
        {this.state.games.map(game => {
          return <Link to={`/game/${game.id}`}>
            <Game key={game.id} {...game} />
          </Link>
        })}
      </div>
  }
}


export default GameList
