import React from "react"
import "./Game.css"

class Game extends React.Component {
  render () {
    return <div className="game">
      <div className="game-name">{this.props.name}</div>
    </div>
  }
}

export default Game
