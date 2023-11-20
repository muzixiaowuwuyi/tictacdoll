import { endGame } from '../store/slices/gameSlice';
import { GamePiece } from '../utils/types';
import { addGamedata } from './apiService';

import winAudio from '../assets/sound/success.mp3';

import store from '../store/index';

const winSound = new Audio(winAudio);

const checkWinCondition = (
  piece1: GamePiece,
  piece2: GamePiece,
  piece3: GamePiece
) => {
  const gameState = store.getState().game;
  const duration = gameState.duration;
  const intervalId = gameState.intervalId;

  const username = sessionStorage.getItem('username');
  let seconds = Math.floor(duration / 1000);
  console.log(`username ${username} win in ${seconds} seconds`);

  const winnerData = {
    player: username!,
    winner: piece1.player,
    duration: seconds,
  };
  if (piece1.player === piece2.player && piece1.player === piece3.player) {
    winSound.play();

    console.log(`${piece1.player} you win`);
    clearInterval(intervalId);
    store.dispatch(endGame()); // 发送游戏数据到服务器 /send game data to server

    addGamedata(winnerData)
      .then((response) => {
        console.log('Game data saved:', response);
      })
      .catch((error) => {
        console.error('Failed to save game data:', error);
      });
  }
  ////TODO: add apiservise
};

export const checkWinner = (cell: number[], player: number) => {
  const gameState = store.getState().game;
  const cells = gameState.cells;
  const pieces = gameState.allPieces;

  const [row, col] = cell;

  //check rows
  if (
    cells[row].every((cell) => {
      if (cell != null) return pieces[cell].player === player;
      return false;
    })
  ) {
    return true;
  }

  //check cols
  if (
    cells.every((row) => {
      if (row[col] != null) return pieces[row[col]!].player === player;
      return false;
    })
  ) {
    return true;
  }

  //check left diagonal
  if (
    row === col &&
    cells.every((row, index) => {
      if (row[index] != null) return pieces[row[index]!].player === player;
      return false;
    })
  ) {
    return true;
  }

  //check right diagonal
  if (
    row + col === 2 &&
    cells.every((row, index) => {
      if (row[index] != null) return pieces[row[index]!].player === player;
      return false;
    })
  ) {
    return true;
  }

  return false;
};

export const checkDraw = (player: number) => {
  //I can't find the rules of the game as intended so I am defining a draw as any situation
  //where one player hasn't won and the person who's go it is cannot place a piece on the board
  //i.e the board is full and all of the other players pieces are bigger than any remaining pieces the player has
  const gameState = store.getState().game;
  const cells = gameState.cells;

  const boardHasSpace = !cells.every((row) =>
    row.every((cell) => cell != null)
  );

  if (boardHasSpace) return false;

  const pieces = gameState.allPieces;
  const placedPieceIds = gameState.placedPieceIds;

  const nextPlayer = player === 1 ? 2 : 1;

  const piecesStillToPlace = pieces.filter(
    (piece) => piece.player === nextPlayer && !placedPieceIds.includes(piece.id)
  );

  const piecesVisibleOnBoard = cells.map((row) =>
    row.map((cell) => pieces[cell!])
  );

  const piecesThatCanBePlaced = piecesStillToPlace.filter((pieceToPlace) =>
    piecesVisibleOnBoard.every((row) =>
      row.every((visiblePiece) => {
        return (
          visiblePiece.player !== pieceToPlace.player ||
          visiblePiece.size < pieceToPlace.size
        );
      })
    )
  );

  console.log(piecesThatCanBePlaced);
  return piecesThatCanBePlaced.length === 0;
};