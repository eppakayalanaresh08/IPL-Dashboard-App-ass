import './index.css'

const LatestMatch = props => {
  const {latestMatchObject} = props
  const {
    date,
    competingTeam,
    competingTeamLogo,
    firstInnings,
    manOfTheMatch,
    secondInnings,
    umpires,
    venue,
    result,
  } = latestMatchObject
  console.log(date)
  return (
    <div className="list-latestUpdate">
      <div className="competing-container">
        <p className="competing-Team">{competingTeam}</p>
        <p className="date">{date}</p>
        <p className="venue">{venue}</p>
        <p className="result">{result}</p>
      </div>
      <img
        src={competingTeamLogo}
        alt={`latest match ${competingTeam}`}
        className="image-competing-Team"
      />
      <div className="container-Innings">
        <h1 className="First-heading">First Innings</h1>
        <p className="first-Innings">{firstInnings}</p>
        <h1 className="Second-heading">Second Innings</h1>
        <p className="second-Innings">{secondInnings}</p>
        <h1 className="Man-heading">Man Of The Match</h1>
        <p className="man-Of-TheMatch">{manOfTheMatch}</p>
        <h1 className="Umpires-heading">Umpires</h1>
        <p className="umpires">{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
