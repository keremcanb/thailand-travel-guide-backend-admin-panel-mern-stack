import { combineReducers } from 'redux';
import auth from './auth';
import category from './category';
import place from './place';
import location from './location';

export default combineReducers({
  auth,
  category,
  place,
  location
});
