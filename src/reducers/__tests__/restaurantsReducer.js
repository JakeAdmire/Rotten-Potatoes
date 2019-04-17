import { restaurantsReducer } from '../restaurantsReducer';
import shortid from 'shortid';

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

  it('should return restaurant names and ids if case is "SET_RESTAURANTS"', () => {
    shortid.generate = jest.fn().mockImplementation(() => '43');

    const results = restaurantsReducer(mockState, mockAction);

    const expected = [
      {"id": '43', "name": {}}, 
      {"id": '43', "name": {}}
    ];

    expect(results).toEqual(expected);
  })

})