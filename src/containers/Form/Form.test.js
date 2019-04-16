import React from 'react';
import { shallow } from 'enzyme';

import { Form, mapStateToProps, mapDispatchToProps } from './Form';
import { setRestaurants, setLocation, setRedirect, isLoading } from '../../actions';

describe('Form', () => {

  let wrapper;
  let mockHandleClick = jest.fn();
  let mockGetLocation = jest.fn();
  let mockSetLocation = jest.fn();
  let mockSetRedirect = jest.fn();
  let mockHandleEnter = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Form handleClick={mockHandleClick}
            getLocation={mockGetLocation}
            setLocation={mockSetLocation}
            setRedirect={mockSetRedirect}
            handleEnter={mockHandleEnter} />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should have default state', () => {
    let mockState = { value: '' };
    expect(wrapper.state()).toEqual(mockState);
  })

  it.skip('should call handleClick on click', () => {
    let handleClick = jest.fn();
    wrapper = shallow( <Form  handleClick={handleClick} />);
    wrapper.update();
    wrapper.find('#test').simulate('click');
    expect(handleClick).toHaveBeenCalled();
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

  it('should dispatch setRedirect when gatherLocationInfo is called', () => {
    const mockResult = { 
      formatted_address: 'Denver',
      geometry: { location: {} } 
    };
    wrapper.instance().gatherLocationInfo(mockResult);
    expect(mockSetRedirect).toHaveBeenCalled();
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