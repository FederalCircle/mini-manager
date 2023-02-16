import { MatchEventType, MATCH_LENGTH } from './constants';
import { Team } from './types';

class MatchEvent {
  type: MatchEventType;
  timestamp: number;
  constructor(type: MatchEventType, timestamp: number) {
    this.type = type;
    this.timestamp = timestamp;
  }
}

class MatchEventNothing extends MatchEvent {
  constructor(timestamp: number) {
    super(MatchEventType.NOTHING, timestamp);
  }
}

class MatchEventGoal extends MatchEvent {
  team: Team;
  constructor(timestamp: number, team: Team) {
    super(MatchEventType.GOAL, timestamp);
    this.team = team;
  }
}

class Match {
  clock: number = 0;
  homeTeam: Team;
  homeTeamScore: number = 0;
  visitorTeam: Team;
  visitorTeamScore: number = 0;
  events: MatchEvent[] = [];

  constructor(homeTeam: Team, visitorTeam: Team) {
    this.homeTeam = homeTeam;
    this.visitorTeam = visitorTeam;
  }

  get isMatchFinished(): boolean {
    return this.clock >= MATCH_LENGTH;
  }

  getLastImportantEvent(): MatchEventGoal | undefined {
    for (let i = this.events.length - 1; i >= 0; i--) {
      const event = this.events[i];
      if (event instanceof MatchEventGoal) {
        return event;
      }
    }
  }

  createNewEvent(): MatchEvent {
    const eventDiceRoll = Math.ceil(Math.random() * 10);
    if (eventDiceRoll === 10) {
      const teamDiceRoll = Math.ceil(Math.random() * 10);
      const hasHomeTeamScored = teamDiceRoll % 2 === 0;
      if (hasHomeTeamScored) {
        this.homeTeamScore++;
        return new MatchEventGoal(this.clock, this.homeTeam);
      } else {
        this.visitorTeamScore++;
        return new MatchEventGoal(this.clock, this.visitorTeam);
      }
    } else {
      return new MatchEventNothing(this.clock);
    }
  }

  tickClock(): MatchEvent | undefined {
    if (this.isMatchFinished) return;
    const newEvent = this.createNewEvent();
    this.events.push(newEvent);
    this.clock++;
    return newEvent;
  }
}

export default Match;
