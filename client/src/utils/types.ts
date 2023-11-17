import { Vector3 } from "@react-three/fiber";

export type GameState = {
  gameEnded: boolean;
  isInGame: boolean;
  duration: number;
  intervalId?: number;
  startTime: null | number;

  cells: (null | number)[][];

  chessPieces: ChessPiece[]

  currentPlayer: number;
  activePiece:  undefined | ChessPiece;
  winner: null
};

export type ChessPiece = {
  id: number;
  position: Vector3;
  hasMoved: boolean;
  size: number;
  player: number;
};