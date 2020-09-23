import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import category from './category';
import place from './place';
import location from './location';
import techReducer from './techReducer';

export default combineReducers({
  alert,
  auth,
  profile,
  category,
  place,
  location,
  tech: techReducer
});
