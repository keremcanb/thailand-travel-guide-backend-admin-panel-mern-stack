import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import logReducer from './logReducer';
import techReducer from './techReducer';

export default combineReducers({
  alert,
  auth,
  profile,
  log: logReducer,
  tech: techReducer,
});
