import { combineReducers } from 'redux';

import { restaurantsReducer } from './restaurantsReducer';
import { locationReducer } from './locationReducer';
import { redirectReducer } from './redirectReducer';

export const rootReducer = combineReducers({
  restaurants: restaurantsReducer,
  location: locationReducer,
  redirect: redirectReducer
})