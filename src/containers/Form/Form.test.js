import React from 'react';
import { shallow } from 'enzyme';

import { Form, mapStateToProps, mapDispatchToProps } from './Form';
import { setRestaurants, setLocation, isLoading } from '../../actions';

describe('Form', () => {

  let wrapper;
  let mockSetLocation = jest.fn();
  let mockIsLoading = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Form setLocation={mockSetLocation}
            isLoading={mockIsLoading} />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should have default state', () => {
    let mockState = {redirect: false, value: ''};
    expect(wrapper.state()).toEqual(mockState);
  })

  it('should update state when handleChange is invoked', () => {
    const mockStateChange = { value: "test" }
    const mockEvent = { target: mockStateChange };
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state('value')).toEqual(mockStateChange.value);
  })

  it('should update state when gatherLocationInfo is invoked', () => {
    const mockStateChange = { redirect: true };
    const mockResult = { formatted_address: 'HOME', geometry: { location: 'NOT HOME' }};
    wrapper.instance().gatherLocationInfo(mockResult);
    expect(wrapper.state('redirect')).toEqual(mockStateChange.redirect)
  })

  it.skip('should call handleClick on click', () => {
    const mockSpy = jest.spyOn(wrapper.instance(), 'handleClick');
    wrapper.update();

    wrapper.find('NavLink').simulate('click');
    expect(mockSpy).toBeCalled();
  })

  it('should return an error message when geolocation is not enabled', () => {
    const handleClick = wrapper.instance().handleClick();
    expect(handleClick).toEqual("geolocation is not enabled/supported in this browser");
  })
  
  it('should dispatch isLoading when handleClick is called', () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn(),
      watchPosition: jest.fn()
    };
    global.navigator.geolocation = mockGeolocation;
    wrapper.instance().handleClick();
    expect(mockIsLoading).toHaveBeenCalledWith(true);
  })

  it('should invoke getCurrentPosition when handleClick is invoked', () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn(),
      watchPosition: jest.fn()
    };
    global.navigator.geolocation = mockGeolocation;
    wrapper.instance().handleClick();
    expect(mockGeolocation.getCurrentPosition).toBeCalled();
  })

  it.skip('should call handleEnter if key is pressed', () => {
    const mockEvent = { key: 'Enter' };
    let mockSpy = jest.spyOn(wrapper.instance(), 'handleEnter');
    wrapper.update();
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

  it('should call gatherLocationInfo when getAddress is invoked with proper coordinates', async () => {
    const mockPosition = {
      accuracy: 201573,
      latitude: 39.5500507,
      longitude: -105.78206739999999
    }
    const mockSpy = jest.spyOn(wrapper.instance(), 'gatherLocationInfo');
    await wrapper.instance().getAddress(mockPosition);
    expect(mockSpy).toBeCalled();
  })

  it('should throw an error message when getAddress is called with improper coordinates', async () => {
    const mockPosition = { latitude: 12.123123, longitude: 132.12313 };
    const getAddress = await wrapper.instance().getAddress(mockPosition);
    expect(getAddress).toEqual("Server returned status code ZERO_RESULTS");
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