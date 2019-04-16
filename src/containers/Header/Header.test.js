import React from 'react';
import { shallow } from 'enzyme';

import { Header, mapStateToProps, mapDispatchToProps } from './Header';
import { setRedirect } from '../../actions';

describe('Header', () => {

  let wrapper;
  let mockSetRedirect = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Header setRedirect={mockSetRedirect} />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should dispatch setRedirect when the redirect method is called', () => {
    wrapper.find('button').simulate('click');
    expect(mockSetRedirect).toHaveBeenCalledWith('');
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