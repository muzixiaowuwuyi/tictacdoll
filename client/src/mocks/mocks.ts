import { ChessSize, ChessType } from '../models/enums';
import { ChessPiece } from '../utils/types';

export const mockGames = [
  {
    player: 'Alice',
    winner: 1,
    duration: 45,
    createdAt: new Date().toISOString(),
  },
  {
    player: 'Bob',
    winner: 2,
    duration: 30,
    createdAt: new Date().toISOString(),
  },
  {
    player: 'Charlie',
    winner: 1,
    duration: 50,
    createdAt: new Date().toISOString(),
  },
  {
    player: 'David',
    winner: 2,
    duration: 20,
    createdAt: new Date().toISOString(),
  },
  {
    player: 'Eva',
    winner: 1,
    duration: 35,
    createdAt: new Date().toISOString(),
  },
  {
    player: 'Frank',
    winner: 2,
    duration: 40,
    createdAt: new Date().toISOString(),
  },
  {
    player: 'Grace',
    winner: 1,
    duration: 55,
    createdAt: new Date().toISOString(),
  },
  {
    player: 'Henry',
    winner: 2,
    duration: 25,
    createdAt: new Date().toISOString(),
  },
  {
    player: 'Ivy',
    winner: 1,
    duration: 42,
    createdAt: new Date().toISOString(),
  },
  {
    player: 'Jack',
    winner: 2,
    duration: 28,
    createdAt: new Date().toISOString(),
  },
  {
    player: 'Kate',
    winner: 1,
    duration: 48,
    createdAt: new Date().toISOString(),
  },
  {
    player: 'Leo',
    winner: 2,
    duration: 18,
    createdAt: new Date().toISOString(),
  },
  {
    player: 'Mia',
    winner: 1,
    duration: 37,
    createdAt: new Date().toISOString(),
  },
  {
    player: 'Noah',
    winner: 2,
    duration: 32,
    createdAt: new Date().toISOString(),
  },
  {
    player: 'Olivia',
    winner: 1,
    duration: 53,
    createdAt: new Date().toISOString(),
  },
  {
    player: 'Peter',
    winner: 2,
    duration: 22,
    createdAt: new Date().toISOString(),
  },
];

export const mockNewGames = [
  {
    player: 'Alice',
    winner: 1,
    duration: 45,
  },
  {
    player: 'Bob',
    winner: 2,
    duration: 30,
  },
  {
    player: 'Charlie',
    winner: 1,
    duration: 50,
  },
  {
    player: 'David',
    winner: 2,
    duration: 20,
  },
  {
    player: 'Eva',
    winner: 1,
    duration: 35,
  },
  {
    player: 'Frank',
    winner: 2,
    duration: 40,
  },
  {
    player: 'Grace',
    winner: 1,
    duration: 55,
  },
  {
    player: 'Henry',
    winner: 2,
    duration: 25,
  },
  {
    player: 'Ivy',
    winner: 1,
    duration: 42,
  },
  {
    player: 'Jack',
    winner: 2,
    duration: 28,
  },
  {
    player: 'Kate',
    winner: 1,
    duration: 48,
  },
  {
    player: 'Leo',
    winner: 2,
    duration: 18,
  },
  {
    player: 'Mia',
    winner: 1,
    duration: 37,
  },
  {
    player: 'Noah',
    winner: 2,
    duration: 32,
  },
  {
    player: 'Olivia',
    winner: 1,
    duration: 53,
  },
  {
    player: 'Peter',
    winner: 2,
    duration: 22,
  },
];

export const mockPiece1 : ChessPiece = {
  id: 2,
  position: [15, 1.5, 3],
  hasMoved: false,
  size: ChessSize.LARGE,
  player: ChessType.HUMAN,
};

export const mockPiece2 : ChessPiece = {
  id: 5,
  position: [12, 0.9, 3],
  hasMoved: false,
  size: ChessSize.MEDIUM,
  player: ChessType.HUMAN,
};
