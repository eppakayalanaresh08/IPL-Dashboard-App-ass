import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'

import MatchCard from '../MatchCard'

import './index.css'

const teamMatchesApiUrl = 'https://apis.ccbp.in/ipl/'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    teamMatchesData: {},
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`${teamMatchesApiUrl}${id}`)
    const fetchedData = await response.json()
    const formattedData = {
      teamBannerURL: fetchedData.team_banner_url,
      latestMatch: this.getFormattedData(fetchedData.latest_match_details),
      recentMatches: fetchedData.recent_matches.map(eachMatch =>
        this.getFormattedData(eachMatch),
      ),
    }

    this.setState({teamMatchesData: formattedData, isLoading: false})
  }

  renderRecentMatchesList = () => {
    const {teamMatchesData} = this.state
    const {recentMatches} = teamMatchesData

    return (
      <ul className="recent-matches-list">
        {recentMatches.map(recentMatch => (
          <MatchCard recentObject={recentMatch} key={recentMatch.id} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {teamMatchesData} = this.state
    const {teamBannerURL, latestMatch} = teamMatchesData

    return (
      <div className="responsive-container">
        <img src={teamBannerURL} alt="team banner" className="team-banner" />
        <LatestMatch latestMatchObject={latestMatch} />
        {this.renderRecentMatchesList()}
      </div>
    )
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const className = `team-matches-container ${this.getRouteClassName()}`

    return (
      <div className={className}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches

// import {Component} from 'react'

// import Loader from 'react-loader-spinner'

// import LatestMatch from '../LatestMatch'

// import MatchCard from '../MatchCard'

// import './index.css'

// class TeamMatches extends Component {
//   state = {
//     TeamMatchObject: {},
//     renderClickIpl: true,
//   }

//   componentDidMount() {
//     this.getTeamMatch()
//   }

//   getTeamMatch = async () => {
//     const {match} = this.props
//     const {params} = match
//     const {id} = params
//     const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
//     if (response.ok === true) {
//       const data = await response.json()
//       const updateData = {
//         teamBannerUrl: data.team_banner_url,
//         latestMatchDetails: data.latest_match_details,
//         recentMatches: data.recent_matches,
//       }

//       const {latestMatchDetails} = updateData

//       const latestMatch = {
//         date: latestMatchDetails.date,
//         competingTeam: latestMatchDetails.competing_team,
//         competingTeamLogo: latestMatchDetails.competing_team_logo,
//         firstInnings: latestMatchDetails.first_innings,
//         id: latestMatchDetails.id,
//         manOfTheMatch: latestMatchDetails.man_of_the_match,
//         matchStatus: latestMatchDetails.match_status,
//         result: latestMatchDetails.result,
//         secondInnings: latestMatchDetails.second_innings,
//         umpires: latestMatchDetails.umpires,
//         venue: latestMatchDetails.venue,
//       }

//       const {recentMatches} = updateData

//       const recentMatchesUpdate = recentMatches.map(eachObject => ({
//         competingTeam: eachObject.competing_team,
//         competingTeamLogo: eachObject.competing_team_logo,
//         id: eachObject.id,
//         matchStatus: eachObject.match_status,
//         result: eachObject.result,
//       }))

//       updateData.recentMatches = recentMatchesUpdate
//       updateData.latestMatchDetails = latestMatch
//       this.setState({TeamMatchObject: updateData, renderClickIpl: false})
//     }
//   }

//   render() {
//     const {TeamMatchObject, renderClickIpl} = this.state
//     const {latestMatchDetails, recentMatches} = TeamMatchObject
//     return (
//       <div>
//         {renderClickIpl ? (
//           // eslint-disable-next-line react/no-unknown-property
//           <div testid="loader">
//             <Loader type="Oval" color="#ffffff" height={50} width={50} />
//           </div>
//         ) : (
//           <div className="bg-container-Team">
//             <div className="container-team-players">
//               <img
//                 src={TeamMatchObject.teamBannerUrl}
//                 alt="team banner"
//                 className="team-image"
//               />
//               <p className="latest-heading">Latest Matches</p>
//               <LatestMatch latestMatchObject={latestMatchDetails} />
//               <ul className="container-lists-recentMatch">
//                 {recentMatches.map(eachObject => (
//                   <MatchCard recentObject={eachObject} key={eachObject.id} />
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}
//       </div>
//     )
//   }
// }

// export default TeamMatches
