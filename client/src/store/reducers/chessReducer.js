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
          { id: 1, position: [6.8, 0.72, 3.4] },
          { id: 2, position: [6.8, 0.72, 1.8] },
          { id: 3, position: [6.8, 0.72, 0.2] },
        ],
        medium: [
          { id: 4, position: [8.7, 0, 7.2] },
          { id: 5, position: [8.7, 0, 5] },
          { id: 6, position: [8.7, 0, 2.8] },
        ],
        small: [
          { id: 7, position: [5.8, 0, 7.5] },
          { id: 8, position: [5.8, 0, 5.8] },
          { id: 9, position: [5.8, 0, 4.1] },
        ],
      },
      activePiece: null,
    },
    computer: {
      pieces: {
        large: [
          { id: 10, position: [-7, 0.72, -3] },
          { id: 11, position: [-7, 0.72, -1.5] },
          { id: 12, position: [-7, 0.72, 0] },
        ],
        medium: [
          { id: 13, position: [-13, 0, -6] },
          { id: 14, position: [-13, 0, -3.5] },
          { id: 15, position: [-13, 0, -1] },
        ],
        small: [
          { id: 16, position: [-12, 0, -6] },
          { id: 17, position: [-12, 0, -4] },
          { id: 18, position: [-12, 0, -2] },
        ],
      },
    },
  },
  currentPlayer: "human",
  gameState: "playing", // 'won', 'lost', 'tie' 'playing'
  winCondition: null, // 胜利条件，例如 'row', 'column', 'diagonal', 'tie' 或 null
  // history: [],
};

const chessReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default chessReducer;
