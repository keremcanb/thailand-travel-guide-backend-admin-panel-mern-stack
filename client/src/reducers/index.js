import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import location from './location';
import logReducer from './logReducer';
import techReducer from './techReducer';

export default combineReducers({
  alert,
  auth,
  profile,
  location,
  log: logReducer,
  tech: techReducer,
});
