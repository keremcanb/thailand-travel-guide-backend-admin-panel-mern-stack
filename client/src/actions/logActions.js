import axios from 'axios';
import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  UPDATE_LOG,
  SEARCH_LOGS,
  SET_CURRENT,
  CLEAR_CURRENT,
} from './types';

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

// Get logs
export const getLogs = () => async (dispatch) => {
  try {
    setLoading();

    const res = await axios.get('/api/locations');
    const data = await res.data;

    dispatch({
      type: GET_LOGS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Add log
export const addLog = (log) => async (dispatch) => {
  try {
    setLoading();

    const res = await axios.post('/api/locations', log);
    const data = await res.data;

    dispatch({
      type: ADD_LOG,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Update log
export const updateLog = (log) => async (dispatch) => {
  try {
    setLoading();

    const res = await axios.put(`/api/locations/${log.id}`, log);
    const data = await res.data;

    dispatch({
      type: UPDATE_LOG,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Delete log
export const deleteLog = (id) => async (dispatch) => {
  try {
    setLoading();

    await axios.delete(`/api/locations/${id}`);

    dispatch({
      type: DELETE_LOG,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Set current log
export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log,
  };
};

// Clear current log
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};

// Search logs
export const searchLogs = (text) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(`/api/locations?q=${text}`);
    const data = await res.json();

    dispatch({
      type: SEARCH_LOGS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.data,
    });
  }
};
