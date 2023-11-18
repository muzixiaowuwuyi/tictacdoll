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
    const action = {type: 'chess/startGame'}

    const result = chessReducer(stateBeforeAction, action);

    expect(result).toStrictEqual({...initialState, isInGame: true, startTime: Date.now()})
  })

  it('should handle ending the game', () => {
    const stateBeforeAction = {...initialState, isInGame: true}
    const action = {type: 'chess/endGame'}

    const result = chessReducer(stateBeforeAction, action);

    expect(result).toStrictEqual({...initialState, gameEnded: true})
  })
});
