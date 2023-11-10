import { createSlice } from "@reduxjs/toolkit";
import { ChessSize, ChessType } from "../../models/enums";

const initialState = {
  cells: [[null, null, null], [null, null, null], [null, null, null]],
  chessPieces: [
    {
      id: 0,
      position: [15, 1.5, 0],
      isMoved: false,
      size: ChessSize.LARGE,
      player: ChessType.HUMAN
    },
    {
      id: 1,
      position: [15, 1.5, 3],
      isMoved: false,
      size: ChessSize.LARGE,
      player: ChessType.HUMAN
    },
    {
      id: 2,
      position: [15, 1.5, 6],
      isMoved: false,
      size: ChessSize.LARGE,
      player: ChessType.HUMAN
    },
    {
      id: 3,
      position: [12, 0.9, 0],
      isMoved: false,
      size: ChessSize.MEDIUM,
      player: ChessType.HUMAN
    },
    {
      id: 4,
      position: [12, 0.9, 3],
      isMoved: false,
      size: ChessSize.MEDIUM,
      player: ChessType.HUMAN
    },
    {
      id: 5,
      position: [12, 0.9, 6],
      isMoved: false,
      size: ChessSize.MEDIUM,
      player: ChessType.HUMAN
    },
    {
      id: 6,
      position: [10, 0.57, 0],
      isMoved: false,
      size: ChessSize.SMALL,
      player: ChessType.HUMAN
    },
    {
      id: 7,
      position: [10, 0.57, 3],
      isMoved: false,
      size: ChessSize.SMALL,
      player: ChessType.HUMAN
    },
    {
      id: 8,
      position: [10, 0.57, 6],
      moved: false,
      size: ChessSize.SMALL,
      player: ChessType.HUMAN
    },
    { id: 10, position: [-15, 1.5, 0], size: ChessSize.LARGE, isMoved: false, player: ChessType.COMPUTER },
    { id: 11, position: [-15, 1.5, -3], size: ChessSize.LARGE, isMoved: false, player: ChessType.COMPUTER },
    { id: 12, position: [-15, 1.5, -6], size: ChessSize.LARGE, isMoved: false, player: ChessType.COMPUTER },
    { id: 10, position: [-12, 0.9, 0], size: ChessSize.MEDIUM, isMoved: false, player: ChessType.COMPUTER },
    { id: 11, position: [-12, 0.9, -3], size: ChessSize.MEDIUM, isMoved: false, player: ChessType.COMPUTER },
    { id: 12, position: [-12, 0.9, -6], size: ChessSize.MEDIUM, isMoved: false, player: ChessType.COMPUTER },
    { id: 10, position: [-10, 0.57, 0], size: ChessSize.SMALL, isMoved: false, player: ChessType.COMPUTER },
    { id: 11, position: [-10, 0.57, -3], size: ChessSize.SMALL, isMoved: false, player: ChessType.COMPUTER },
    { id: 12, position: [-10, 0.57, -6], size: ChessSize.SMALL, isMoved: false, player: ChessType.COMPUTER }
  ],
  currentPlayer: ChessType.HUMAN,
  activePiece: undefined
  // gameState: "playing", // 'won', 'lost', 'tie' 'playing'
  // winCondition: null // 胜利条件，例如 'row', 'column', 'diagonal', 'tie' 或 null
  // history: [],
};

export const chessSlice = createSlice({
  name: "chess",
  initialState,
  reducers: {
    // reducer 函数和对应的 action
    selectPiece: (state, action) => {
      const { piece } = action.payload;
      if (piece && piece.isMoved) state.activePiece = undefined;
      else state.activePiece = piece;

      // 找到并更新棋子的状态，例如设置为活动棋子
      // TODO: check if chess is moved, if moved, then return
      // 找到要update的棋子
      // let piece = Object.values(state.players.human.pieces)
      //   .flat()
      //   .find((p) => p.id === id);
    },

    unselectPiece: state => {
      state.activePiece = undefined;
    },

    placePiece: (state, action) => {
      const { activePiece, cell } = action.payload;

      // find piece and update status
      const currentPiece = state.chessPieces.find(p => p.id === activePiece.id);
      const [cellX, cellY] = cell;
      // update piece status
      currentPiece.isMoved = true;
      currentPiece.position = activePiece.position;

      // 更新棋盘状态
      state.cells[cellX][cellY] = activePiece.id;
      // TODO: Check winning condition
    },
    movePiece: (state, action) => {
      // 处理移动棋子的逻辑
    }
    // ...其他 reducers
  }
});

// 导出 action creators
export const { selectPiece, unselectPiece, placePiece, movePiece } = chessSlice.actions;

// 导出 reducer
export default chessSlice.reducer;
