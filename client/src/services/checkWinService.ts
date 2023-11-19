import { endGame } from "../store/slices/gameSlice";
import { GamePiece } from "../utils/types";
import { addGamedata } from "./apiService";

import winAudio from '../assets/sound/success.mp3';

import store from '../store/index';

const winSound = new Audio(winAudio);

const checkWinCondition = (
  piece1: GamePiece,
  piece2: GamePiece,
  piece3: GamePiece,
) => {
  const gameState = store.getState().game
  const duration = gameState.duration
  const intervalId = gameState.intervalId

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

const CheckWinner = () => {
  const gameState = store.getState().game
  const cells = gameState.cells;
  const pieces = gameState.pieces;
  const intervalId = gameState.intervalId;

  if (cells[0][0] && cells[0][1] && cells[0][2]) {
    const piece1 = pieces.find((p) => p.id === cells[0][0]);
    const piece2 = pieces.find((p) => p.id === cells[0][1]);
    const piece3 = pieces.find((p) => p.id === cells[0][2]);

    checkWinCondition(piece1!, piece2!, piece3!);
  }
  if (cells[1][0] && cells[1][1] && cells[1][2]) {
    const piece1 = pieces.find((p) => p.id === cells[1][0]);
    const piece2 = pieces.find((p) => p.id === cells[1][1]);
    const piece3 = pieces.find((p) => p.id === cells[1][2]);
    checkWinCondition(piece1!, piece2!, piece3!);
  }
  if (cells[2][0] && cells[2][1] && cells[2][2]) {
    const piece1 = pieces.find((p) => p.id === cells[2][0]);
    const piece2 = pieces.find((p) => p.id === cells[2][1]);
    const piece3 = pieces.find((p) => p.id === cells[2][2]);
    checkWinCondition(piece1!, piece2!, piece3!);
  }
  if (cells[0][0] && cells[1][0] && cells[2][0]) {
    const piece1 = pieces.find((p) => p.id === cells[0][0]);
    const piece2 = pieces.find((p) => p.id === cells[1][0]);
    const piece3 = pieces.find((p) => p.id === cells[2][0]);
    checkWinCondition(piece1!, piece2!, piece3!);
  }
  if (cells[0][1] && cells[1][1] && cells[2][1]) {
    const piece1 = pieces.find((p) => p.id === cells[0][1]);
    const piece2 = pieces.find((p) => p.id === cells[1][1]);
    const piece3 = pieces.find((p) => p.id === cells[2][1]);
    checkWinCondition(piece1!, piece2!, piece3!);
  }
  if (cells[0][2] && cells[1][2] && cells[2][2]) {
    const piece1 = pieces.find((p) => p.id === cells[0][2]);
    const piece2 = pieces.find((p) => p.id === cells[1][2]);
    const piece3 = pieces.find((p) => p.id === cells[2][2]);
    checkWinCondition(piece1!, piece2!, piece3!);
  }
  if (cells[0][0] && cells[1][1] && cells[2][2]) {
    const piece1 = pieces.find((p) => p.id === cells[0][0]);
    const piece2 = pieces.find((p) => p.id === cells[1][1]);
    const piece3 = pieces.find((p) => p.id === cells[2][2]);
    checkWinCondition(piece1!, piece2!, piece3!);
  }
  if (cells[0][2] && cells[1][1] && cells[2][0]) {
    const piece1 = pieces.find((p) => p.id === cells[0][2]);
    const piece2 = pieces.find((p) => p.id === cells[1][1]);
    const piece3 = pieces.find((p) => p.id === cells[2][0]);
    checkWinCondition(piece1!, piece2!, piece3!);
  }

  //TODO: Fix this. Currently says its a draw if the board fills up even if pieces can be placed on smaller ones
  if (
    cells[0][0] &&
    cells[0][1] &&
    cells[0][2] &&
    cells[1][0] &&
    cells[1][1] &&
    cells[1][2] &&
    cells[2][0] &&
    cells[2][1] &&
    cells[2][2]
  ) {
    console.log('it is  draw');
    clearInterval(intervalId);
    store.dispatch(endGame());
  }
};

export default CheckWinner;
