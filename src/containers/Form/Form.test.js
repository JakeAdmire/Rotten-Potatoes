import React from 'react';
import { shallow } from 'enzyme';

import { Form, mapStateToProps, mapDispatchToProps } from './Form';
import { setRestaurants, setLocation, setRedirect, isLoading } from '../../actions';

describe('Form', () => {

  let wrapper;
  let mockSetLocation = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <Form setLocation={mockSetLocation} />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should have default state', () => {
    let mockState = { value: '' };
    expect(wrapper.state()).toEqual(mockState);
  })

  it('should update state when handleChange is invoked', () => {
    const mockStateChange = { value: "test" }
    const mockEvent = { target: mockStateChange };
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state()).toEqual(mockStateChange);
  })

  it.skip('should call handleClick on click', () => {
    const mockSpy = jest.spyOn(wrapper.instance(), 'handleClick');
    wrapper.update();

    wrapper.find('NavLink').simulate('click');
    expect(mockSpy).toBeCalled();
  })

  it.skip('should call handleEnter if key is pressed', () => {
    const mockEvent = { key: 'Enter' };
    const instance = wrapper.instance();
    let mockSpy = jest.spyOn(instance, 'handleEnter');
    wrapper.setState({ value: 'test'});
    wrapper.find('div').simulate('keypress', mockEvent);
    expect(mockSpy).toHaveBeenCalled();
  })

  it('should dispatch setLocation when gatherLocationInfo is called', () => {
    const mockResult = { 
      formatted_address: 'Denver',
      geometry: { location: {} } 
    };
    wrapper.instance().gatherLocationInfo(mockResult);
    expect(mockSetLocation).toHaveBeenCalled();
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

    it('should dispatch isLoading when its prop is called', () => {
      let mockBoolean = false;
      const actionToDispatch = isLoading(mockBoolean);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.isLoading(mockBoolean);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })

  })

})