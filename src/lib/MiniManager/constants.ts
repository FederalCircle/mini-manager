export const MATCH_LENGTH = 90;

export enum MatchEventType {
  NOTHING = 'NOTHING',
  PASS = 'PASS',
  SHOT = 'SHOT',
  GOAL = 'GOAL',
  DEFENSE = 'DEFENSE',
  FOUL = 'FOUL',
  INJURY = 'INJURY',
  CARD = 'CARD',
}

export enum PlayerPosition {
  GK = 'GK',
  DF = 'DF',
  MD = 'MD',
  FR = 'FR',
}

export enum Formation {
  A443 = '4-4-3',
  A533 = '5-3-3',
}
