import React from 'react';
import { shallow } from 'enzyme';

import { App, mapStateToProps, mapDispatchToProps } from './App';
import { setRestaurants } from '../../actions';

describe('App', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <App />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  describe('mapStateToProps', () => {

    it('should return a props object', () => {
      let mockState = { redirect: false };
      let results = mapStateToProps(mockState);
      expect(results).toEqual(mockState);
    })

  })

  describe('mapDispatchToProps', () => {

    it('should dispatch setRestaurants when its prop is called', () => {
      let mockRestaurants = [{}, {}];
      const mockDispatch = jest.fn();
      const actionToDispatch = setRestaurants(mockRestaurants);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setRestaurants(mockRestaurants);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })  

  })

})