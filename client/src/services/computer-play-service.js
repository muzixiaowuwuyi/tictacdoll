import { ChessType } from "../models/enums";

const switchPlayer = player => {
  return player === ChessType.HUMAN ? ChessType.COMPUTER : ChessType.HUMAN;
};

const findBestSpot = board => {
  const [score, bestMove] = minimax(board, ChessType.COMPUTER);
  return bestMove;
};

const findRandomSpot = (board, maxChessSize, availableChess) => {
  let randomX = -1;
  let randomY = -1;

  const hasSlot = board.flat().filter(b => b !== null || b < maxChessSize).length > 0;
  if (!hasSlot) return null;

  while (randomX === -1 || randomY === -1) {
    randomY = Math.floor(Math.random() * 3);

    const rows = board[randomY];
    const rowHasSlot = rows.filter(b => b !== null || b < maxChessSize).length > 0;
    if (!rowHasSlot) continue;

    while (randomX === -1) {
      randomX = Math.floor(Math.random() * 3);
      if (rows[randomX] !== null && rows[randomX] > maxChessSize) {
        randomX = -1;
      }
    }
  }

  const chessSize = 0;

  const chess = availableChess.find(c => c.id === board[randomX][randomY]);
  if (chess !== null && chess !== undefined) {
    chessSize = chess.size;
  }
  return [[randomX, randomY], chessSize];
};

const restoreToGrid = bestMove => {
  const x = bestMove % 3;
  const y = Math.floor(bestMove / 3);
  return [x, y];
};

const SCORES = {
  1: 1,
  0: 0,
  2: -1
};

const DRAW = 0;

const getWinner = grid => {
  const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  let res = null;
  winningCombos.forEach((piece, i) => {
    if (
      grid[piece[0]]?.player !== null &&
      grid[piece[0]]?.player === grid[piece[1]]?.player &&
      grid[piece[0]]?.player === grid[piece[2]]?.player
    ) {
      res = grid[piece[0]];
    } else if (res === null && getEmptySquares(grid).length === 0) {
      res = DRAW;
    }
  });
  return res;
};

const makeMove = (square, player, grid) => {
  if (grid[square] === null) {
    grid[square] = player;
  }
};

const getEmptySquares = grid => {
  let squares = [];
  grid.forEach((square, i) => {
    if (square === null) squares.push(i);
  });
  return squares;
};

const minimax = (board, player) => {
  // initialize the multiplier to adjust scores based on the player's perspective
  const multiplier = SCORES[String(player)];
  let thisScore;
  let maxScore = -1;
  let bestMove = null;
  // check if the game is over and return the score and move if so
  const winner = getWinner(board);
  if (winner !== null) {
    return [SCORES[winner], 0];
  } else {
    // loop through each empty square on the board
    for (const square of getEmptySquares(board)) {
      // create a copy of the board and make a move for the current player
      let copy = [...board];
      makeMove(square, player, copy);
      // recursively call minimax on the resulting board state,
      // switching the player and multiplying the resulting score by the multiplier
      thisScore = multiplier * minimax(copy, switchPlayer(player))[0];

      // update the maxScore and bestMove variables if the current move
      // produces a higher score than previous moves
      if (thisScore >= maxScore) {
        maxScore = thisScore;
        bestMove = square;
      }
    }

    // return the best score found, multiplied by the multiplier,
    // and the corresponding best move as a tuple
    return [multiplier * maxScore, bestMove];
  }
};

export { findBestSpot, findRandomSpot, restoreToGrid, getWinner };
