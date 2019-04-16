import { restaurantsReducer } from '../restaurantsReducer';

describe('restaurantsReducer', () => {

  let mockState = [];
  let mockAction = {
    type: 'SET_RESTAURANTS',
    restaurants: [{}, {}]
  };

  it('should return state by default', () => {
    const results = restaurantsReducer(mockState, {});
    expect(results).toEqual(mockState);
  })

  it('should return action.restaurants if case is "SET_RESTAURANTS"', () => {
    const results = restaurantsReducer(mockState, mockAction);
    expect(results).toEqual(mockAction.restaurants);
  })

})