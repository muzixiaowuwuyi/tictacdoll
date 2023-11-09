import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  players: {
    human: {
      pieces: {
        large: [
          { id: 131, position: [6.8, 0.72, 3.4] },
          { id: 132, position: [6.8, 0.72, 1.8] },
          { id: 133, position: [6.8, 0.72, 0.2] },
        ],
        medium: [
          { id: 121, position: [8.7, 0, 7.2] },
          { id: 122, position: [8.7, 0, 5] },
          { id: 123, position: [8.7, 0, 2.8] },
        ],
        small: [
          { id: 111, position: [5.8, 0, 7.5] },
          { id: 112, position: [5.8, 0, 5.8] },
          { id: 113, position: [5.8, 0, 4.1] },
        ],
      },
      activePiece: null,
    },
    computer: {
      pieces: {
        large: [
          { id: 231, position: [-7, 0.72, -3] },
          { id: 232, position: [-7, 0.72, -1.5] },
          { id: 233, position: [-7, 0.72, 0] },
        ],
        medium: [
          { id: 221, position: [-13, 0, -6] },
          { id: 222, position: [-13, 0, -3.5] },
          { id: 223, position: [-13, 0, -1] },
        ],
        small: [
          { id: 211, position: [-12, 0, -6] },
          { id: 212, position: [-12, 0, -4] },
          { id: 213, position: [-12, 0, -2] },
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
      const { id } = action.payload;
      // 找到并更新棋子的状态，例如设置为活动棋子
      state.players.human.activePiece = id;
    },

    placePiece: (state, action) => {
      const { pieceId, position } = action.payload;
      // 这里的 position 是一个数组 [x, y], 表示棋盘的坐标

      // 找到要放置的棋子
      const piece = Object.values(state.players.human.pieces)
        .flat()
        .find((p) => p.id === pieceId);

      // 检查目标位置是否为空或者可以覆盖
      const targetCell = state.board[position[0]][position[1]];
      const canPlace =
        !targetCell ||
        state.players.human.pieces[targetCell.size].id > pieceId.size;

      if (piece && canPlace) {
        // 更新棋子位置
        piece.position = position;

        // 更新棋盘状态
        state.board[position[0]][position[1]] = {
          size: piece.size,
          id: pieceId,
        };
      }
    },
    movePiece: (state, action) => {
      // 处理移动棋子的逻辑
    },
    // ...其他 reducers
  },
});

// 导出 action creators
export const { selectPiece, placePiece, movePiece } = chessSlice.actions;

// 导出 reducer
export default chessSlice.reducer;
