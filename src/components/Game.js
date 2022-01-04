import React from "react"
import "./Game.css"

class Game extends React.Component {
  render () {
    const { id, name, rating, price, image_uri } = this.props
    return <div className="game">
        <img className="game__image" src={image_uri} />
        <div className="game__container">
          <p className="game__name">{name}</p>
          <div className="game__details">
            <p className="game__rating">{rating}% positive</p>
            <p className="game__price">
              {price ? `$${price}` : "FREE"}
            </p>
          </div>
        </div>
    </div>
  }
}

export default Game
