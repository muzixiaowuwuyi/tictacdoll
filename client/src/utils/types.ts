import { Vector3 } from '@react-three/fiber';

export type GameState = {
  gameEnded: boolean;
  isInGame: boolean;
  duration: number;
  intervalId?: NodeJS.Timeout;
  startTime: null | number;

  cells: (null | number)[][];

  chessPieces: ChessPiece[];

  currentPlayer: number;
  activePiece: undefined | ChessPiece;
  winner: null | string;
};

export type ChessPiece = {
  id: number;
  position: Vector3;
  hasMoved: boolean;
  size: number;
  player: number;
};

export type NewGameSession = {
  player: string;
  winner: number;
  duration: number;
};

export type GameSession = NewGameSession & {
  _id: string;
  createdAt: Date;
};
