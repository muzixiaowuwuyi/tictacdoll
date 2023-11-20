import { GamePiece } from './types';

export type SetIntervalIdPayload = {
  intervalId: NodeJS.Timeout;
};

export type UpdateDurationPayload = {
  duration: number;
};

export type SelectPiecePayload = {
  piece: GamePiece;
};

export type PlacePiecePayload = {
  cell: number[];
};
