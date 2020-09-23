import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import category from './category';
import place from './place';
import logReducer from './logReducer';
import techReducer from './techReducer';

export default combineReducers({
  alert,
  auth,
  profile,
  category,
  place,
  log: logReducer,
  tech: techReducer,
});
