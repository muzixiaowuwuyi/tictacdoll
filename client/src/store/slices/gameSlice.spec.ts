import { mockPiece1, mockPiece2 } from '../../mocks/mocks';
import { PiecePlayer } from '../../models/enums';
import gameReducer, { initialState } from './gameSlice';

describe('gameReducer', () => {
  it('should handle initial state', () => {
    const stateBeforeAction = undefined;
    const action = { type: '@@redux/init' };

    const result = gameReducer(stateBeforeAction, action);
    expect(result).toEqual(initialState);
  });

  it('should handle starting the game', () => {
    const stateBeforeAction = initialState;
    const action = { type: 'game/startGame' };

    const result = gameReducer(stateBeforeAction, action);
    expect(result).toStrictEqual({
      ...initialState,
      isInGame: true,
      startTime: result.startTime,
    });

    expect(result.startTime).toBeTruthy();
    expect(Date.now() - result.startTime!).toBeLessThan(5);
  });

  it('should handle ending the game', () => {
    const stateBeforeAction = { ...initialState, isInGame: true };
    const action = { type: 'game/endGame' };

    const result = gameReducer(stateBeforeAction, action);
    expect(result).toStrictEqual({ ...initialState, gameEnded: true });
  });

  it('should handle updating intervalId', () => {
    const stateBeforeAction = initialState;
    const intervalId = setInterval(() => 'placeholder', 10);
    const action = { type: 'game/setIntervalId', payload: { intervalId } };

    const result = gameReducer(stateBeforeAction, action);
    expect(result).toStrictEqual({ ...initialState, intervalId });
    clearInterval(intervalId);
  });

  it('should handle updating duration', () => {
    const stateBeforeAction = initialState;
    const action = { type: 'game/updateDuration', payload: { duration: 10 } };

    const result1 = gameReducer(stateBeforeAction, action);
    expect(result1).toStrictEqual({ ...initialState, duration: 10 });
  });

  it('should handle slecting a piece', () => {
    const stateBeforeAction = initialState;
    const action1 = {
      type: 'game/selectPiece',
      payload: { piece: mockPiece1 },
    };
    const action2 = {
      type: 'game/selectPiece',
      payload: { piece: mockPiece2 },
    };
    const action3 = {
      type: 'game/selectPiece',
      payload: { piece: undefined },
    };

    const result1 = gameReducer(stateBeforeAction, action1);
    expect(result1).toStrictEqual({ ...initialState, activePiece: mockPiece1 });

    const result2 = gameReducer(result1, action2);
    expect(result2).toStrictEqual({ ...initialState, activePiece: mockPiece2 });

    const result3 = gameReducer(result2, action3);
    expect(result3).toStrictEqual({ ...initialState, activePiece: undefined });
  });

  it('should handle unselecting a piece', () => {
    const stateBeforeAction = { ...initialState, activePiece: mockPiece1 };
    const action = { type: 'game/unselectPiece' };

    const result = gameReducer(stateBeforeAction, action);
    expect(result).toStrictEqual(initialState);
  });

  it('should handle placing a piece', () => {
    const stateBeforeAction = { ...initialState, activePiece: mockPiece1 };
    const oldCells = stateBeforeAction.cells;
    const [cellX, cellY] = [0, 0];
    const action = {
      type: 'game/placePiece',
      payload: { activePiece: mockPiece1, cell: [cellX, cellY] },
    };

    const result = gameReducer(stateBeforeAction, action);

    expect(result.cells[cellX][cellY]).toBe(mockPiece1.id);

    const newCells = oldCells.map((cellRow, rowI) =>
      cellRow.map((cell, colI) =>
        rowI === cellX && colI === cellY ? mockPiece1.id : cell
      )
    );

    const newPieces = initialState.pieces.map((piece) =>
      piece.id === mockPiece1.id ? { ...mockPiece1, hasMoved: true } : piece
    );

    expect(result).toStrictEqual({
      ...initialState,
      cells: newCells,
      pieces: newPieces,
      currentPlayer: PiecePlayer.COMPUTER,
      activePiece: mockPiece1,
    });
  });

  it('should handle settingWinner', () => {
    const stateBeforeAction = initialState;
    const action = {type: 'game/checkWinner', payload: {gamewinner: 'guy'}}

    const result = gameReducer(stateBeforeAction, action)

    expect(result).toStrictEqual({...initialState, winner: 'guy'})
  })
});
