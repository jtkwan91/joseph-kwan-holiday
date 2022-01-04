import axios from "axios"
import React from "react"
import { Link } from "react-router-dom"
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
    const { name, short_description, background, screenshots, steam_appid, developers} = this.state.details 
    const storeLink = `https://store.steampowered.com/app/${steam_appid}`
    return <div className="game__details" style={{background: `url(${background})`}}>
    <h1 className="game__details-name">{name}</h1>
    <h3 className="game__details-dev">By: {developers}</h3>
    <div className="game__details-screenshots">{screenshots.slice(0,6).map(s =>
      <img className="game__details-screenshot" key={s.id} src={s.path_thumbnail} />
      )}</div>
      <p className="game__details-description">
      {short_description}
      </p>
      <a className="game__details-link" href={storeLink}>Link to store page</a>
      <Link className="game__details-homelink" to="/">Back to home</Link>
      </div>
    }
  }
  
  export default GameDetails