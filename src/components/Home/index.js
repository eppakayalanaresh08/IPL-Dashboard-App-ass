import {Component} from 'react'
import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {
    TeamCardList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamCard()
  }

  getTeamCard = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const updateData = data.teams.map(eachObject => ({
      name: eachObject.name,
      id: eachObject.id,
      teamImageUrl: eachObject.team_image_url,
    }))
    this.setState({TeamCardList: updateData, isLoading: false})
  }

  render() {
    const {TeamCardList, isLoading} = this.state
    return (
      <div className="bg-container">
        <div className="bg-card-container">
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="logo-ipl"
            />
            <h1 className="heading-Dashboard">IPL Dashboard</h1>
          </div>
          <ul className="lists-teamCard">
            {isLoading ? (
              <div testid="loader">
                <Loader type="Oval" color="#ffffff" height={50} width={50} />
              </div>
            ) : (
              TeamCardList.map(eachObject => (
                <TeamCard eachCardList={eachObject} key={eachObject.id} />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default Home
