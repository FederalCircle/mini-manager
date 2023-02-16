import useMatch from './hooks/useMatch';
import { Team } from './lib/MiniManager/types';
import './styles.scss';

const TeamA: Team = { id: '0', name: 'Team A', players: [] };
const TeamB: Team = { id: '1', name: 'Team B', players: [] };

export default function App() {
  const { match, startClock, stopClock } = useMatch(TeamA, TeamB);
  const lastImportantEvent = match.getLastImportantEvent();
  return (
    <div className="App">
      <h1>Mini Manager (pre-alpha)</h1>
      <div>
        <button onClick={() => startClock(5)}>Start Match</button>
        <button onClick={() => stopClock()}>Stop Match</button>
        <div>
          <h3>Match</h3>
          <p>Clock: {match.clock}'</p>
          <p>
            <b>{match.homeTeam.name}</b> {match.homeTeamScore} x{' '}
            {match.visitorTeamScore} <b>{match.visitorTeam.name}</b>
            {lastImportantEvent && (
              <span>{` | ${lastImportantEvent.timestamp}' ${lastImportantEvent.team?.name} ${lastImportantEvent.type}`}</span>
            )}
          </p>
        </div>
      </div>
      <div>
        <h3>Event logs</h3>
        <ul>
          {match.events.map((event) => (
            <li key={event.timestamp}>{`${event.timestamp}' ${event.type}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
