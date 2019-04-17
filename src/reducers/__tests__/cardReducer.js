import { cardReducer } from '../cardReducer';

describe('cardReducer', () => {

  const mockState = {};
  const mockAction = {
    type: 'SET_CARD',
    card: { name: 'TACO BELL' }
  };

  it('should return state by default', () => {
    const results = cardReducer(mockState, {});
    expect(results).toEqual(mockState);
  })

  it('should return action.card when the type is "SET_CARD"', () => {
    const results = cardReducer(mockState, mockAction);
    expect(results).toEqual(mockAction.card);
  })

})