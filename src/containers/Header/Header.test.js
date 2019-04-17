import React from 'react';
import { shallow } from 'enzyme';

import { Header, mapStateToProps } from './Header';

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

  describe('mapStateToProps', () => {

    let mockState = { location: '' };
    let mockProps = { location: mockState.location };
  
    it('should return a props object', () => {
      const results = mapStateToProps(mockState);
      expect(results).toEqual(mockProps);
    })
  
  })

})