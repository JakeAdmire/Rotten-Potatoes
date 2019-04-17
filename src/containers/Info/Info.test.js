import React from 'react';
import { Info } from './Info';
import { shallow } from 'enzyme';

describe('Info', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Info />
    )
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

})