import './index.css'

const MatchCard = props => {
  const {recentObject} = props
  const {competingTeamLogo, competingTeam, result, matchStatus} = recentObject
  const styleMatch = matchStatus === 'Won' ? 'won' : 'lost'
  return (
    <li className="match-list-container">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="team-logo-image"
      />
      <p className="competing-Team-match">{competingTeam}</p>
      <p className="result-match">{result}</p>
      <p className={`match-status ${styleMatch}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
