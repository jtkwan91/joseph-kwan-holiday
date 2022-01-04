import axios from "axios"
import React from "react"
import "./GameDetails.scss"

function fetchApp(id) {
  return axios.get(`http://localhost:3001/app?id=${id}`).then(r => r.data)
}

class GameDetails extends React.Component {

  state = { loading: true, error: null, details: {} }

  componentDidMount () {
    fetchApp(this.props.match.params.id).then(details => {
      this.setState({ details: details })
    })
    .catch(error => this.setState({ error: error }))
    .finally(_ => this.setState({ loading: false }))
  }

  render () {
    // details still loading
    if (this.state.loading)
      return <p>Loading...</p>
    
    // error occurred
    if (this.state.error)
      return <p>Error: {this.state.error.message}</p>
    
    // details loaded successfully
    const { name, short_description, background, screenshots} = this.state.details
    return <div className="game__details" style={{background: `url(${background})`}}>
      <h3 className="game__details-name">{name}</h3>
      <div className="game__details-screenshots">{screenshots.slice(0,6).map(s =>
        <img className="game__details-screenshot" key={s.id} src={s.path_thumbnail} />
      )}</div>
      <p className="game__details-description">
        {short_description}
      </p>
    </div>
  }
}

export default GameDetails