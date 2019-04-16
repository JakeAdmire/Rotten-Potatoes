import React from 'react';
import { shallow } from 'enzyme';

import { Header, mapStateToProps, mapDispatchToProps } from './Header';
import { setRedirect } from '../../actions';

describe('Header', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Header />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

})

describe('mapStateToProps', () => {

  let mockState = { location: '' };
  let mockProps = { location: mockState.location };

  it('should return a props object', () => {
    const results = mapStateToProps(mockState);
    expect(results).toEqual(mockProps);
  })

})

describe('mapDispatchToProps', () => {

  it('should return a props object', () => {
    let mockDispatch = jest.fn();
    let actionToDispatch = setRedirect('home');
    let mappedProps = mapDispatchToProps(mockDispatch);
    mappedProps.setRedirect('home');
    expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
  })

})