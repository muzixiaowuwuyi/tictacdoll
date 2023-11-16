export type GameState = {
  gameEnded: boolean;
  isInGame: boolean;
  duration: 0;
  intervalId: null;
  startTime: null | number;

  cells: null[][];

  chessPiece: chessPiece[]

  currentPlayer: 1 | 2;
  activePiece?: chessPiece;
  winner: null
};

export type chessPiece = {
  id: number;
  position: number[];
  isMoved: boolean;
  size: 1 | 2 | 3;
  player: 1 | 2;
};
