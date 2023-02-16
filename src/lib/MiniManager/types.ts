import { PlayerPosition } from './constants';

export interface Player {
  id: string;
  name: string;
  position: PlayerPosition;
  attributes: {
    attack: number;
    defense: number;
    passing: number;
    goalkeeper: number;
  };
}

export interface Team {
  id: string;
  name: string;
  players: Player[];
}
