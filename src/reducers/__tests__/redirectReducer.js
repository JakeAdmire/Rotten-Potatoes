import { redirectReducer } from '../redirectReducer';

describe('redirectReducer', () => {

  let mockState = '';
  let mockAction = {
    type: 'SET_REDIRECT',
    redirect: 'home'
  }

  it('should return state by default', () => {
    const results = redirectReducer(mockState, {});
    expect(results).toEqual(mockState);
  })

  it('should return action.redirect if case is "SET_REDIRECT"', () => {
    const results = redirectReducer(mockState, mockAction);
    expect(results).toEqual(mockAction.redirect);
  })

})