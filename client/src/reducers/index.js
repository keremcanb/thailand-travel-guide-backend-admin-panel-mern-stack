import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import category from './category';
import place from './place';
import location from './location';

export default combineReducers({
  alert,
  auth,
  category,
  place,
  location
});
