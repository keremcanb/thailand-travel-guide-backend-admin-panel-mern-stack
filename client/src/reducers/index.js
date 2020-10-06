import { combineReducers } from 'redux';
import auth from './auth';
import category from './category';
import place from './place';
import location from './location';
import upload from './upload';

export default combineReducers({
  auth,
  category,
  place,
  location,
  upload
});
