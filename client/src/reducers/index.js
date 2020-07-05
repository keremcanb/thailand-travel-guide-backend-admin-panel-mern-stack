import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
// import items from './items';

export default combineReducers({
  alert,
  auth,
  profile,
  // items,
});
