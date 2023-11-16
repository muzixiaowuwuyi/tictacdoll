import { ChessPiece } from './types';

export type SetIntervalIdPayload = {
  intervalId: number;
};

export type UpdateDurationPayload = {
  duration: number;
};

export type SelectPiecePayload = {
  piece: ChessPiece;
};

export type PlacePiecePayload = {
  activePiece: ChessPiece;
  cell: number[];
};
