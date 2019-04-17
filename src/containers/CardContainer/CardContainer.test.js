import React from 'react';
import { shallow } from 'enzyme';

import { CardContainer, mapStateToProps, mapDispatchToProps } from './CardContainer';
import { isLoading } from '../../actions';

describe('CardContainer', () => {

  let wrapper;
  let mockIsLoading = jest.fn();
  let mockProps = {
    loading: false,
    location: {
      coords: {lat: 40.5491556, lng: -105.0322899},
      name: "2821 Willow Tree Ln, Fort Collins, CO 80525, USA"
    },
    restaurants: ['TACO BELL', 'MCDONALDS']
  }

  beforeEach(() => {
    wrapper = shallow(
      <CardContainer  isLoading={mockIsLoading}
                      {...mockProps} />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should have default state', () => {
    let mockState = { cards: [] };
    expect(wrapper.state()).toEqual(mockState);
  })

  it('should update state when sortByDistance is called', () => {
    expect(wrapper.state('cards')).toEqual([]);
    wrapper.instance().sortByDistance(mockProps.restaurants);
    expect(wrapper.state('cards')).toEqual(mockProps.restaurants);
  })

  it('should call fetchRestaurants when it has the correct props', () => {
    const mockSpy = jest.spyOn(wrapper.instance(), 'fetchRestaurants');
    wrapper.update();

    wrapper.setState({cards: []});
    expect(mockSpy).toBeCalled()
  })

  it.skip('should call gatherRestaurantData when fetchRestaurants is invoked', () => {
    const mockSpy = jest.spyOn(wrapper.instance(), 'gatherRestaurantData');
    wrapper.update();

    wrapper.instance().fetchRestaurants();
    expect(mockSpy).toBeCalled();
  })

  it('should set state when sortByDistance is called', () => {
    let mockRestaurants = [
      { distance: 13.2131231 },
      { distance: 15.2341134 } 
    ];
    wrapper.instance().sortByDistance(mockRestaurants);
    expect(wrapper.state('cards')).toEqual(mockRestaurants);
  })

  it('should dispatch isLoading when sortByDistance is called', () => {
    let mockRestaurants = [
      { distance: 13.2131231 },
      { distance: 15.2341134 } 
    ];
    wrapper.instance().sortByDistance(mockRestaurants);
    expect(mockIsLoading).toHaveBeenCalled();
  })

  describe('mapStateToProps', () => {

    it('should return a props object', () => {
      let mockState = {
        location: {},
        restaurants: [],
        loading: false
      }
      const results = mapStateToProps(mockState);
      expect(results).toEqual(mockState);
    })

  })

  describe('mapDispatchToProps', () => {

    it('should dispatch isLoading when its prop is called', () => {
      const mockDispatch = jest.fn();
      let mockBoolean = false;
      const actionToDispatch = isLoading(mockBoolean);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.isLoading(mockBoolean);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    })

  })

})