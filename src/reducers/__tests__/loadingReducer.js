import { loadingReducer } from '../loadingReducer';

describe('loadingReducer', () => {

  let mockState = false;
  let mockAction = {
    type: 'IS_LOADING',
    boolean: true
  };

  it('should return state by defualt', () => {
    const results = loadingReducer(mockState, {});
    expect(results).toEqual(mockState);
  })

  it('should return action.boolean if case is "IS_LOADING"', () => {
    const results = loadingReducer(mockState, mockAction);
    expect(results).toEqual(mockAction.boolean);
  })

})