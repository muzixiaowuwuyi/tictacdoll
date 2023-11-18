import { mockPiece1, mockPiece2 } from '../../mocks/mocks';
import chessReducer, { initialState } from './chessSlice';

describe('chessReducer', () => {
  it('should handle initial state', () => {
    const stateBeforeAction = undefined;
    const action = { type: '@@redux/init' };

    const result = chessReducer(stateBeforeAction, action);

    expect(result).toEqual(initialState);
  });

  it('should handle starting the game', () => {
    const stateBeforeAction = initialState;
    const action = { type: 'chess/startGame' };

    const result = chessReducer(stateBeforeAction, action);

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
    const action = { type: 'chess/endGame' };

    const result = chessReducer(stateBeforeAction, action);

    expect(result).toStrictEqual({ ...initialState, gameEnded: true });
  });

  it('should handle updating intervalId', () => {
    const stateBeforeAction = initialState;
    const intervalId = setInterval(() => 'placeholder', 10);
    const action = { type: 'chess/setIntervalId', payload: { intervalId } };

    const result = chessReducer(stateBeforeAction, action);

    expect(result).toStrictEqual({ ...initialState, intervalId });
  });

  it('should handle updating duration', () => {
    const stateBeforeAction = initialState;
    const action = { type: 'chess/updateDuration', payload: { duration: 10 } };

    const result1 = chessReducer(stateBeforeAction, action);

    expect(result1).toStrictEqual({ ...initialState, duration: 10 });
  });

  it('should handle slecting a piece', () => {
    const stateBeforeAction = initialState;
    const action1 = { type: 'chess/selectPiece', payload: {piece: mockPiece1}}
    const action2 = { type: 'chess/selectPiece', payload: {piece: mockPiece2}}
    const action3 = { type: 'chess/selectPiece', payload: {piece: undefined}}

    const result1 = chessReducer(stateBeforeAction, action1);

    expect(result1).toStrictEqual({...initialState, activePiece: mockPiece1})

    const result2 = chessReducer(result1, action2)
    
    expect(result2).toStrictEqual({...initialState, activePiece: mockPiece2})
    
    const result3 = chessReducer(result2, action3)

    expect(result3).toStrictEqual({...initialState, activePiece: undefined})
  })
});


