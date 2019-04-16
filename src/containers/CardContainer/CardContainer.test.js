import React from 'react';
import { shallow } from 'enzyme';

import { CardContainer, mapStateToProps, mapDispatchToProps } from './CardContainer';
import { isLoading } from '../../actions';

describe('CardContainer', () => {

  let wrapper;
  let mockIsLoading = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <CardContainer  isLoading={mockIsLoading}/>
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should have default state', () => {
    let mockState = { cards: [] };
    expect(wrapper.state()).toEqual(mockState);
  })

  it.skip('should call sortRestaurants when gatherRestaurants is invoked', () => {
    let mockRestaurants = [
      { distance: 13.2131231 },
      { distance: 15.2341134 } 
    ];
    let instance = wrapper.instance();
    jest.spyOn(instance, 'sortRestaurants');
    wrapper.instance().gatherRestaurants(mockRestaurants);
    expect(instance.sortRestaurants).toBeCalled();
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