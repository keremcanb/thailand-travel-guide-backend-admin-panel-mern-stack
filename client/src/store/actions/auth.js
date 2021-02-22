import { get, post } from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../types';
import setAuthToken from '../../utils/setAuthToken';

const headers = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const { data } = await get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const register = ({ firstName, lastName, email, password }) => async (dispatch) => {
  const body = JSON.stringify({ firstName, lastName, email, password });
  try {
    const { data } = await post('/api/users', body, headers);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data
    });
  } catch (err) {
    const { errors } = err.response.data;
    if (errors) {
      // errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const body = JSON.stringify({ email, password });
  try {
    const { data } = await post('/api/auth', body, headers);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data
    });
    dispatch(loadUser());
  } catch (err) {
    const { errors } = err.response.data;
    if (errors) {
      // errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
