import React from 'react';
import { shallow } from 'enzyme';

import { CardContainer, mapStateToProps, mapDispatchToProps } from './CardContainer';
import { isLoading } from '../../actions';

describe('CardContainer', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <CardContainer />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
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