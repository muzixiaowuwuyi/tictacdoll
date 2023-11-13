import { createSlice } from "@reduxjs/toolkit";
import { ChessSize, ChessType } from "../../models/enums";

const initialState = {
  gameStarted: false,

  timeDuration: 0,
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
  // gameState: "playing", // 'won', 'lost', 'tie' 'playing'
  // winCondition: null // 胜利条件，例如 'row', 'column', 'diagonal', 'tie' 或 null
  // history: [],
};

export const chessSlice = createSlice({
  name: "chess",
  initialState,
  reducers: {
    startGame: (state) => {
      state.gameStarted = true;
      state.startTime = Date.now();
      state.timeDuration = 0;
    },

    endGame: (state) => {
      state.gameStarted = false;
    },

    resetGame: (state) => {
      // 重置游戏到初始状态
      // 这里你需要根据你的游戏逻辑来重置所有相关状态
      state.gameStarted = false;
      state.startTime = null;
      state.timeDuration = 0;
      // ...重置棋盘和棋子等
    },

    updateDuration: (state, action) => {
      state.timeDuration = action.payload;
    },

    resetTimer: (state) => {
      state.timeDuration = 0;
      state.startTime = null;
    },

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
      const test = state.cells.flat();
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
  selectPiece,
  unselectPiece,
  placePiece,
  updateDuration,
  resetGame,
  resetTimer,
} = chessSlice.actions;

// 导出 reducer
export default chessSlice.reducer;
