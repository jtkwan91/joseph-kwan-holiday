import React from "react"
import "./Game.scss"

class Game extends React.Component {
  render () {
    const { id, name, rating, price, image_uri } = this.props
    return <div className="game">
        <img className="game-image" src={image_uri} />
        <div className="game-container">
          <p className="game-name">{name}</p>
          <div className="game-details">
            <p className="game-rating">{rating}% positive</p>
            <p className="game-price">
              {price ? `$${price}` : "FREE"}
            </p>
          </div>
        </div>
    </div>
  }
}

export default Game
