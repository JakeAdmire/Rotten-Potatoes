import React from 'react';
import { Info } from './Info';
import { shallow } from 'enzyme';

describe('Info', () => {

  let wrapper;

  let mockProps = {
    name: 'TACO BELL', 
    address: '123 FAKE ST. FORT COLLINS, CO', 
    correctPlaces: [
      { inspectiondate: '1234543' }
    ], 
    distance: 12.3123
  };

  beforeEach(() => {
    wrapper = shallow(
      <Info {...mockProps} />
    )
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('should return a manipulated string when buildDate is invoked', () => {
    const mockDate = '2019-12-04T000000';
    const buildDate = wrapper.instance().buildDate(mockDate);
    expect(buildDate).toEqual("2019-12-04");
  })

  it('should return a manipulated string when buildDistance is invoked', () => {
    const buildDistance = wrapper.instance().buildDistance(mockProps.distance);
    expect(buildDistance).toEqual("12.3m away");
  })

})