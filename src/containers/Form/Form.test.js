import React from 'react';
import { shallow } from 'enzyme';

import { Form, mapStateToProps, mapDispatchToProps } from './Form';
import { setRestaurants, setLocation, setRedirect, isLoading } from '../../actions';

describe('Form', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Form />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  describe('mapStateToProps', () => {

    let mockState = { loading: false }
    
    it('should return a props object', () => {
      const results = mapStateToProps(mockState);
      expect(results).toEqual(mockState);
    })

  })

  describe('mapDispatchToProps', () => {

    let mockDispatch = jest.fn();

    it('should dispatch setRestaurants when its prop is called', () => {
      let mockRestaurants = [{}, {}];
      const actionToDispatch = setRestaurants(mockRestaurants);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setRestaurants(mockRestaurants);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })

    it('should dispatch setLocation when its prop is called', () => {
      let mockLocation = { name: 'Hawaii', coords: {} };
      const actionToDispatch = setLocation(mockLocation);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setLocation(mockLocation);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })

    it('should dispatch setRedirect when its props is called', () => {
      let mockRedirect = 'home';
      const actionToDispatch = setRedirect(mockRedirect);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setRedirect(mockRedirect);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })

    it('should dispatch isLoading when its prop is called', () => {
      let mockBoolean = false;
      const actionToDispatch = isLoading(mockBoolean);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.isLoading(mockBoolean);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })

  })

})