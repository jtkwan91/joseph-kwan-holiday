import axios from "axios"
import React from "react"
import "./Game.css"

function fetchApp(id) {
  return axios.get(`http://store.steampowered.com/api/appdetails?appids=${id}`).then(r => r.data)
}

class Game extends React.Component {
  
  componentDidUpdate() {

  }

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
