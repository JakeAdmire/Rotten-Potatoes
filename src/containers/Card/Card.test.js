import React from 'react';
import { shallow } from 'enzyme';

import { Card } from './Card';

describe('Card', () => {

  let wrapper;
  const mockProps = {
    facilityname: 'Taco Bell',
    address: '123 Street St. Denver, CO',
    inspectionscore: 25,
    violationtype: 'critical'
  }

  beforeEach(() => {
    wrapper = shallow (
      <Card {...mockProps} />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('buildTitle should return null if props is empty', () => {
    wrapper = shallow( <Card /> )
    wrapper.instance().buildTitle();
    expect(wrapper).toMatchSnapshot();
  })

  it('buildAddress should return null if props is empty', () => {
    wrapper = shallow( <Card /> )
    wrapper.instance().buildAddress();
    expect(wrapper).toMatchSnapshot();
  })

  it('buildDistance should return null if props is empty', () => {
    wrapper = shallow( <Card /> )
    wrapper.instance().buildDistance();
    expect(wrapper).toMatchSnapshot();
  })
  
})