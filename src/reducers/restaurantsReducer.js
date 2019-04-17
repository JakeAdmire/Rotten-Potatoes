// const shortid = require('shortid');
import shortid from 'shortid';

export const restaurantsReducer = (state = [], action) => {
  switch(action.type) {

    case('SET_RESTAURANTS') :
      return action.restaurants.map(restaurant => {
        return { name: restaurant, id: shortid.generate() }
      });

    default :
      return state;
  }
}