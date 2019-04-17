import * as creators from './index';

describe('setRestaurants', () => {

  let mockType = 'SET_RESTAURANTS';
  let mockRestaurant = [];

  it('should return a type of "SET_RESTAURANTS" and a restaurants array', () => {
    const results = creators.setRestaurants(mockRestaurant);
    const expected = { 
      type: mockType, 
      restaurants: mockRestaurant 
    };
    expect(results).toEqual(expected);
  })

})

describe('setLocation', () => {

  let mockType = 'SET_LOCATION';
  let mockLocation = {};

  it('should return a type of "SET_RESTAURANTS" and a restaurants array', () => {
    const results = creators.setLocation(mockLocation);
    const expected = { 
      type: mockType, 
      location: mockLocation 
    };
    expect(results).toEqual(expected);
  })

})

describe('setCard', () => {

  let mockType = 'SET_CARD';
  let mockCard = {};

  it('should return a type of "SET_CARD" and a restaurants array', () => {
    const results = creators.setCard(mockCard);
    const expected = { 
      type: mockType, 
      card: mockCard 
    };
    expect(results).toEqual(expected);
  })

})

describe('isLoading', () => {

  let mockType = 'IS_LOADING';
  let mockBoolean = true;

  it('should return a type of "IS_LOADING" and a restaurants array', () => {
    const results = creators.isLoading(mockBoolean);
    const expected = { 
      type: mockType, 
      boolean: mockBoolean 
    };
    expect(results).toEqual(expected);
  })

})