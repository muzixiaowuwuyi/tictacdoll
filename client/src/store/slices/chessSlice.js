import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  board: [[null, null, null], [null, null, null], [null, null, null]],
  players: {
    human: {
      pieces: {
        large: [{ id: 120, position: [15, 1.5, 0] }, { id: 121, position: [15, 1.5, 3] }, { id: 122, position: [15, 1.5, 6] }],
        medium: [{ id: 110, position: [12, 0.9, 0] }, { id: 111, position: [12, 0.9, 3] }, { id: 112, position: [12, 0.9, 6] }],
        small: [
          { id: 100, position: [10, 0.57, 0] },
          { id: 101, position: [10, 0.57, 3] },
          { id: 102, position: [10, 0.57, 6] }
        ]
      },
      activePiece: null
    },
    computer: {
      pieces: {
        large: [
          { id: 220, position: [-15, 1.5, 0] },
          { id: 221, position: [-15, 1.5, -3] },
          { id: 222, position: [-15, 1.5, -6] }
        ],
        medium: [
          { id: 210, position: [-12, 0.9, 0] },
          { id: 211, position: [-12, 0.9, -3] },
          { id: 212, position: [-12, 0.9, -6] }
        ],
        small: [
          { id: 200, position: [-10, 0.57, 0] },
          { id: 201, position: [-10, 0.57, -3] },
          { id: 202, position: [-10, 0.57, -6] }
        ]
      }
    }
  },
  currentPlayer: "human",
  gameState: "playing", // 'won', 'lost', 'tie' 'playing'
  winCondition: null // 胜利条件，例如 'row', 'column', 'diagonal', 'tie' 或 null
  // history: [],
};

export const chessSlice = createSlice({
  name: "chess",
  initialState,
  reducers: {
    // reducer 函数和对应的 action
    selectPiece: (state, action) => {
      const { id, position } = action.payload;
      // 找到并更新棋子的状态，例如设置为活动棋子
      state.players.human.activePiece = [id, position];
    },

    placePiece: (state, action) => {
      const { pieceId, position } = action.payload;
      // 这里的 position 是一个数组 [x, y], 表示棋盘的坐标

      // 找到要放置的棋子
      const piece = Object.values(state.players.human.pieces)
        .flat()
        .find(p => p.id === pieceId);

      // 检查目标位置是否为空或者可以覆盖
      const targetCell = state.board[position[0]][position[1]];
      const canPlace = !targetCell || state.players.human.pieces[targetCell.size].id > pieceId.size;

      if (piece && canPlace) {
        // 更新棋子位置
        piece.position = position;

        // 更新棋盘状态
        state.board[position[0]][position[1]] = {
          size: piece.size,
          id: pieceId
        };
      }
    },
    movePiece: (state, action) => {
      // 处理移动棋子的逻辑
    }
    // ...其他 reducers
  }
});

// 导出 action creators
export const { selectPiece, placePiece, movePiece } = chessSlice.actions;

// 导出 reducer
export default chessSlice.reducer;
