import React from 'react';
import { shallow } from 'enzyme';

import { App, mapStateToProps, mapDispatchToProps } from './App';
import { setRestaurants } from '../../actions';

describe('App', () => {

  let wrapper;
  let mockSetRestaurants = jest.fn()
  let mockFetchRestaurants = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <App  setRestaurants={mockSetRestaurants}
            fetchRestaurants={mockFetchRestaurants} />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should invoke the fetchRestaurants function on componentDidMount', () => {
    const instance = wrapper.instance();
    jest.spyOn(instance, 'fetchRestaurants')
    wrapper.instance().componentDidMount();
    expect(instance.fetchRestaurants).toBeCalled();
  })

  it('should dispatch setRestaurants when gatherRestaurantNames is called', () => {
    let mockData = [
      { facilityname: 'East Moon Bistro' },
      { facilityname: 'Taco Johns' },
    ]
    wrapper.instance().gatherRestaurantNames(mockData);
    expect(mockSetRestaurants).toHaveBeenCalled();
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