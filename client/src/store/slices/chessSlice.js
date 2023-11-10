import { createSlice } from "@reduxjs/toolkit";
import { ChessSize, ChessType } from "../../models/enums";

const initialState = {
  cells: [[null, null, null], [null, null, null], [null, null, null]],
  chessPieces: [
    {
      id: 120,
      position: [15, 1.5, 0],
      isMoved: false,
      size: ChessSize.LARGE,
      player: ChessType.HUMAN
    },
    {
      id: 121,
      position: [15, 1.5, 3],
      isMoved: false,
      size: ChessSize.LARGE,
      player: ChessType.HUMAN
    },
    {
      id: 122,
      position: [15, 1.5, 6],
      isMoved: false,
      size: ChessSize.LARGE,
      player: ChessType.HUMAN
    },
    {
      id: 110,
      position: [12, 0.9, 0],
      isMoved: false,
      size: ChessSize.MEDIUM,
      player: ChessType.HUMAN
    },
    {
      id: 111,
      position: [12, 0.9, 3],
      isMoved: false,
      size: ChessSize.MEDIUM,
      player: ChessType.HUMAN
    },
    {
      id: 112,
      position: [12, 0.9, 6],
      isMoved: false,
      size: ChessSize.MEDIUM,
      player: ChessType.HUMAN
    },
    {
      id: 100,
      position: [10, 0.57, 0],
      isMoved: false,
      size: ChessSize.SMALL,
      player: ChessType.HUMAN
    },
    {
      id: 101,
      position: [10, 0.57, 3],
      isMoved: false,
      size: ChessSize.SMALL,
      player: ChessType.HUMAN
    },
    {
      id: 102,
      position: [10, 0.57, 6],
      isMoved: false,
      size: ChessSize.SMALL,
      player: ChessType.HUMAN
    },
    { id: 220, position: [-15, 1.5, 0], size: ChessSize.LARGE, isMoved: false, player: ChessType.COMPUTER },
    { id: 221, position: [-15, 1.5, -3], size: ChessSize.LARGE, isMoved: false, player: ChessType.COMPUTER },
    { id: 222, position: [-15, 1.5, -6], size: ChessSize.LARGE, isMoved: false, player: ChessType.COMPUTER },
    { id: 210, position: [-12, 0.9, 0], size: ChessSize.MEDIUM, isMoved: false, player: ChessType.COMPUTER },
    { id: 211, position: [-12, 0.9, -3], size: ChessSize.MEDIUM, isMoved: false, player: ChessType.COMPUTER },
    { id: 212, position: [-12, 0.9, -6], size: ChessSize.MEDIUM, isMoved: false, player: ChessType.COMPUTER },
    { id: 200, position: [-10, 0.57, 0], size: ChessSize.SMALL, isMoved: false, player: ChessType.COMPUTER },
    { id: 201, position: [-10, 0.57, -3], size: ChessSize.SMALL, isMoved: false, player: ChessType.COMPUTER },
    { id: 202, position: [-10, 0.57, -6], size: ChessSize.SMALL, isMoved: false, player: ChessType.COMPUTER }
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
      const { pieceId, cell, position } = action.payload;

      // 找到要放置的棋子
      const piece = state.pieces.find(p => p.id === pieceId);

      // 检查目标位置是否为空或者可以覆盖
      const [cellX, cellY] = cell;

      const targetPiece = state.cells[cellX][cellY];

      // If cell exists, check if we can place a new chess piece there.
      if (targetPiece && state.cells[cellX][cellY]) {
        const itemOnBoard = state.cells[cellX][cellY];
        // If item on board has a bigger size, then do nothing and return
        if (itemOnBoard.ChessSize - piece.ChessSize > 0) {
          // TODO: Add logic showing error placement
          return;
        }
      }

      // 更新棋子位置
      piece.position = position;
      piece.isMoved = true;

      // 更新棋盘状态
      state.cells[cellX][cellY] = piece;
      // TODO: Check winning condition

      // TODO: Unset active chess and reference
      dispatchEvent({});
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
