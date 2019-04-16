import { locationReducer } from '../locationReducer';

describe('locationReducer', () => {

  let mockState = {};
  let mockAction = {
    type: 'SET_LOCATION',
    location: 'cards'
  };

  it('should return state by default', () => {
    const results = locationReducer(mockState, {});
    expect(results).toEqual(mockState);
  })

  it('should return action.location if type is "SET_LOCATION"', () => {
    const results = locationReducer(mockState, mockAction);
    expect(results).toEqual(mockAction.location);
  })

})