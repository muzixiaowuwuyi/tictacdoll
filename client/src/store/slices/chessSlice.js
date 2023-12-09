import { createSlice } from "@reduxjs/toolkit";
import { ChessSize, ChessType } from "../../models/enums";

const initialState = {
  gameEnded: false,
  isInGame: false,
  duration: 0,
  intervalId: null,
  startTime: null,

  cells: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  chessPieces: [
    {
      id: 1,
      position: [15, 1.5, 0],
      isMoved: false,
      size: ChessSize.LARGE,
      player: ChessType.HUMAN,
    },
    {
      id: 2,
      position: [15, 1.5, 3],
      isMoved: false,
      size: ChessSize.LARGE,
      player: ChessType.HUMAN,
    },
    {
      id: 3,
      position: [15, 1.5, 6],
      isMoved: false,
      size: ChessSize.LARGE,
      player: ChessType.HUMAN,
    },
    {
      id: 4,
      position: [12, 0.9, 0],
      isMoved: false,
      size: ChessSize.MEDIUM,
      player: ChessType.HUMAN,
    },
    {
      id: 5,
      position: [12, 0.9, 3],
      isMoved: false,
      size: ChessSize.MEDIUM,
      player: ChessType.HUMAN,
    },
    {
      id: 6,
      position: [12, 0.9, 6],
      isMoved: false,
      size: ChessSize.MEDIUM,
      player: ChessType.HUMAN,
    },
    {
      id: 7,
      position: [10, 0.57, 0],
      isMoved: false,
      size: ChessSize.SMALL,
      player: ChessType.HUMAN,
    },
    {
      id: 8,
      position: [10, 0.57, 3],
      isMoved: false,
      size: ChessSize.SMALL,
      player: ChessType.HUMAN,
    },
    {
      id: 9,
      position: [10, 0.57, 6],
      isMoved: false,
      size: ChessSize.SMALL,
      player: ChessType.HUMAN,
    },
    {
      id: 10,
      position: [-15, 1.5, 0],
      size: ChessSize.LARGE,
      isMoved: false,
      player: ChessType.COMPUTER,
    },
    {
      id: 11,
      position: [-15, 1.5, -3],
      size: ChessSize.LARGE,
      isMoved: false,
      player: ChessType.COMPUTER,
    },
    {
      id: 12,
      position: [-15, 1.5, -6],
      size: ChessSize.LARGE,
      isMoved: false,
      player: ChessType.COMPUTER,
    },
    {
      id: 13,
      position: [-12, 0.9, 0],
      size: ChessSize.MEDIUM,
      isMoved: false,
      player: ChessType.COMPUTER,
    },
    {
      id: 14,
      position: [-12, 0.9, -3],
      size: ChessSize.MEDIUM,
      isMoved: false,
      player: ChessType.COMPUTER,
    },
    {
      id: 15,
      position: [-12, 0.9, -6],
      size: ChessSize.MEDIUM,
      isMoved: false,
      player: ChessType.COMPUTER,
    },
    {
      id: 16,
      position: [-10, 0.57, 0],
      size: ChessSize.SMALL,
      isMoved: false,
      player: ChessType.COMPUTER,
    },
    {
      id: 17,
      position: [-10, 0.57, -3],
      size: ChessSize.SMALL,
      isMoved: false,
      player: ChessType.COMPUTER,
    },
    {
      id: 18,
      position: [-10, 0.57, -6],
      size: ChessSize.SMALL,
      isMoved: false,
      player: ChessType.COMPUTER,
    },
  ],
  currentPlayer: ChessType.HUMAN,
  activePiece: undefined,
  winner: null,
};

export const chessSlice = createSlice({
  name: "chess",
  initialState,
  reducers: {
    startGame: (state) => {
      state.isInGame = true;
      state.startTime = Date.now();
      localStorage.setItem("gameStarted", "true");
    },

    endGame: (state) => {
      state.gameEnded = true;
      state.isInGame = false;
      localStorage.setItem("gameStarted", "false");
    },

    setIntervalId: (state, action) => {
      const { intervalId } = action.payload;
      state.intervalId = intervalId;
    },

    updateDuration: (state, action) => {
      const { duration } = action.payload;
      state.duration = duration;
    },

    // resetTimer: (state) => {
    //   state.timeDuration = 0;
    // },

    // reducer 函数和对应的 action
    selectPiece: (state, action) => {
      const { piece } = action.payload;
      if (piece && piece.isMoved) state.activePiece = undefined;
      else state.activePiece = piece;
    },

    unselectPiece: (state) => {
      state.activePiece = undefined;
    },

    placePiece: (state, action) => {
      const { activePiece, cell } = action.payload;

      // find piece and update status
      const currentPiece = state.chessPieces.find(
        (p) => p.id === activePiece.id
      );
      const [cellX, cellY] = cell;
      // update piece status
      currentPiece.isMoved = true;
      currentPiece.position = activePiece.position;

      // 更新棋盘状态
      state.cells[cellX][cellY] = activePiece.id;

      state.currentPlayer =
        activePiece.player === ChessType.HUMAN
          ? ChessType.COMPUTER
          : ChessType.HUMAN;
    },
    // TODO: Check winning condition
    checkWinner: (state, action) => {
      const { gamewinner } = action.payload;
      state.winner = gamewinner;
    },

    // ...其他 reducers
  },
});

// 导出 action creators
export const {
  startGame,
  setIntervalId,
  selectPiece,
  unselectPiece,
  placePiece,
  updateDuration,
  resetGame,
  endGame,
} = chessSlice.actions;

// 导出 reducer
export default chessSlice.reducer;
