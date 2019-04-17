import { combineReducers } from 'redux';

import { restaurantsReducer } from './restaurantsReducer';
import { locationReducer } from './locationReducer';
import { cardReducer } from './cardReducer';
import { loadingReducer } from './loadingReducer';

export const rootReducer = combineReducers({
  restaurants: restaurantsReducer,
  location: locationReducer,
  card: cardReducer,
  loading: loadingReducer
})