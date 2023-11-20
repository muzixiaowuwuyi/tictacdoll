import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PieceSize, PiecePlayer } from '../../models/enums';
import { GameState } from '../../utils/types';

import {
  PlacePiecePayload,
  SelectPiecePayload,
  SetIntervalIdPayload,
  UpdateDurationPayload,
} from '../../utils/payloadTypes';

export const initialState: GameState = {
  gameEnded: false,
  isInGame: false,
  duration: 0,
  intervalId: undefined,
  startTime: null,

  cells: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],

  allPieces: [
    {
      id: 0,
      position: [15, 1.5, 0],
      size: PieceSize.LARGE,
      player: PiecePlayer.HUMAN,
    },
    {
      id: 1,
      position: [15, 1.5, 3],
      size: PieceSize.LARGE,
      player: PiecePlayer.HUMAN,
    },
    {
      id: 2,
      position: [15, 1.5, 6],
      size: PieceSize.LARGE,
      player: PiecePlayer.HUMAN,
    },
    {
      id: 3,
      position: [12, 0.9, 0],
      size: PieceSize.MEDIUM,
      player: PiecePlayer.HUMAN,
    },
    {
      id: 4,
      position: [12, 0.9, 3],
      size: PieceSize.MEDIUM,
      player: PiecePlayer.HUMAN,
    },
    {
      id: 5,
      position: [12, 0.9, 6],
      size: PieceSize.MEDIUM,
      player: PiecePlayer.HUMAN,
    },
    {
      id: 6,
      position: [10, 0.57, 0],
      size: PieceSize.SMALL,
      player: PiecePlayer.HUMAN,
    },
    {
      id: 7,
      position: [10, 0.57, 3],
      size: PieceSize.SMALL,
      player: PiecePlayer.HUMAN,
    },
    {
      id: 8,
      position: [10, 0.57, 6],
      size: PieceSize.SMALL,
      player: PiecePlayer.HUMAN,
    },
    {
      id: 9,
      position: [-15, 1.5, 0],
      size: PieceSize.LARGE,
      player: PiecePlayer.COMPUTER,
    },
    {
      id: 10,
      position: [-15, 1.5, -3],
      size: PieceSize.LARGE,
      player: PiecePlayer.COMPUTER,
    },
    {
      id: 11,
      position: [-15, 1.5, -6],
      size: PieceSize.LARGE,
      player: PiecePlayer.COMPUTER,
    },
    {
      id: 12,
      position: [-12, 0.9, 0],
      size: PieceSize.MEDIUM,
      player: PiecePlayer.COMPUTER,
    },
    {
      id: 13,
      position: [-12, 0.9, -3],
      size: PieceSize.MEDIUM,
      player: PiecePlayer.COMPUTER,
    },
    {
      id: 14,
      position: [-12, 0.9, -6],
      size: PieceSize.MEDIUM,
      player: PiecePlayer.COMPUTER,
    },
    {
      id: 15,
      position: [-10, 0.57, 0],
      size: PieceSize.SMALL,
      player: PiecePlayer.COMPUTER,
    },
    {
      id: 16,
      position: [-10, 0.57, -3],
      size: PieceSize.SMALL,
      player: PiecePlayer.COMPUTER,
    },
    {
      id: 17,
      position: [-10, 0.57, -6],
      size: PieceSize.SMALL,
      player: PiecePlayer.COMPUTER,
    },
  ],

  placedPieceIds: [],

  currentPlayer: PiecePlayer.HUMAN,
  activePiece: undefined,
  winner: null,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
      state.isInGame = true;
      state.startTime = Date.now();
    },

    endGame: (state) => {
      clearInterval(state.intervalId);
      state.intervalId = undefined;
      state.gameEnded = true;
      state.isInGame = false;
    },

    setIntervalId: (
      state,
      { payload }: PayloadAction<SetIntervalIdPayload>
    ) => {
      const { intervalId } = payload;
      state.intervalId = intervalId;
    },

    updateDuration: (
      state,
      { payload }: PayloadAction<UpdateDurationPayload>
    ) => {
      const { duration } = payload;
      state.duration = duration;
    },

    selectPiece: (state, { payload }: PayloadAction<SelectPiecePayload>) => {
      const { piece } = payload;

      return { ...state, activePiece: piece };
    },

    unselectPiece: (state) => {
      state.activePiece = undefined;
    },

    placePiece: (state, { payload }: PayloadAction<PlacePiecePayload>) => {
      const { cell } = payload;

      const [cellX, cellY] = cell;

      state.cells[cellX][cellY] = state.activePiece!.id;
      state.placedPieceIds.push(state.activePiece!.id);

      state.currentPlayer =
        state.activePiece!.player === PiecePlayer.HUMAN
          ? PiecePlayer.COMPUTER
          : PiecePlayer.HUMAN;
    },

    // TODO: Check winning condition
    setWinner: (state, action) => {
      const { gamewinner } = action.payload;
      state.winner = gamewinner;
    },

    // ...其他 reducers
  },
});

// 导出 action creators
export const {
  startGame,
  setIntervalId,
  selectPiece,
  unselectPiece,
  placePiece,
  updateDuration,
  endGame,
} = gameSlice.actions;

// 导出 reducer
export default gameSlice.reducer;
