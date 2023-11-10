import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  boardCells: [{}],
  players: {
    human: {
      pieces: {
        large: [
          { id: 120, position: [15, 1.5, 0], isMoved: false },
          { id: 121, position: [15, 1.5, 3], isMoved: false },
          { id: 122, position: [15, 1.5, 6], isMoved: false },
        ],
        medium: [
          { id: 110, position: [12, 0.9, 0], isMoved: false },
          { id: 111, position: [12, 0.9, 3], isMoved: false },
          { id: 112, position: [12, 0.9, 6], isMoved: false },
        ],
        small: [
          { id: 100, position: [10, 0.57, 0], isMoved: false },
          { id: 101, position: [10, 0.57, 3], isMoved: false },
          { id: 102, position: [10, 0.57, 6], isMoved: false },
        ],
      },
      activePiece: null,
    },
    computer: {
      pieces: {
        large: [
          { id: 220, position: [-15, 1.5, 0] },
          { id: 221, position: [-15, 1.5, -3] },
          { id: 222, position: [-15, 1.5, -6] },
        ],
        medium: [
          { id: 210, position: [-12, 0.9, 0] },
          { id: 211, position: [-12, 0.9, -3] },
          { id: 212, position: [-12, 0.9, -6] },
        ],
        small: [
          { id: 200, position: [-10, 0.57, 0] },
          { id: 201, position: [-10, 0.57, -3] },
          { id: 202, position: [-10, 0.57, -6] },
        ],
      },
    },
  },
  currentPlayer: "human",
  gameState: "playing", // 'won', 'lost', 'tie' 'playing'
  winCondition: null, // 胜利条件，例如 'row', 'column', 'diagonal', 'tie' 或 null
  // history: [],
};

export const chessSlice = createSlice({
  name: "chess",
  initialState,
  reducers: {
    // reducer 函数和对应的 action
    selectPiece: (state, action) => {
      const { id, position, isMoved } = action.payload;
      // 找到并更新棋子的状态，例如设置为活动棋子
      // TODO: check if chess is moved, if moved, then return
      // 找到要update的棋子
      // let piece = Object.values(state.players.human.pieces)
      //   .flat()
      //   .find((p) => p.id === id);

      state.players.human.activePiece = [id, position, isMoved];
    },

    unselectPiece: (state) => {
      state.players.human.activePiece = undefined;
      alert("unselected!");
    },

    placePiece: (state, action) => {
      const { pieceId, cell, position } = action.payload;

      // 找到要放置的棋子
      const piece = Object.values(state.players.human.pieces)
        .flat()
        .find((p) => p.id === pieceId);

      // 检查目标位置是否为空或者可以覆盖
      const [cellX, cellY] = cell;

      const targetCell = state.board[cellX][cellY];

      ///需要检查这里的可放置性的问题
      const canPlace =
        !targetCell ||
        state.players.human.pieces[targetCell.size].id > pieceId.size;

      if (piece && canPlace) {
        // 更新棋子位置
        piece.position = position;
        piece.isMoved = true;
        // TODO: Unset active chess and reference

        // 更新棋盘状态
        state.board[cellX][cellY] = {
          size: piece.size,
          id: pieceId,
        };
        // TODO: Check winning condition
      }
    },
    movePiece: (state, action) => {
      // 处理移动棋子的逻辑
    },
    // ...其他 reducers
  },
});

// 导出 action creators
export const { selectPiece, unselectPiece, placePiece, movePiece } =
  chessSlice.actions;

// 导出 reducer
export default chessSlice.reducer;
