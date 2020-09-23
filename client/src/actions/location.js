import axios from 'axios';
import {
  GET_LOCATIONS,
  SET_LOADING,
  LOCATIONS_ERROR,
  ADD_LOCATION,
  DELETE_LOCATION,
  UPDATE_LOCATION,
  SEARCH_LOCATIONS,
  SET_CURRENT,
  CLEAR_CURRENT
} from './types';

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

// Get locations
export const getLocations = () => async (dispatch) => {
  try {
    setLoading();

    const res = await axios.get('/api/locations');
    const data = await res.data;

    dispatch({
      type: GET_LOCATIONS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOCATIONS_ERROR,
      payload: err.response.statusText
    });
  }
};

// Add location
export const addLocation = (location) => async (dispatch) => {
  try {
    setLoading();

    const res = await axios.post('/api/locations', location);
    const data = await res.data;

    dispatch({
      type: ADD_LOCATION,
      payload: data
    });
  } catch (err) {
    console.location(err);
    dispatch({
      type: LOCATIONS_ERROR,
      payload: err.response.statusText
    });
  }
};

// Update location
export const updateLocation = (location) => async (dispatch) => {
  try {
    setLoading();

    const res = await axios.put(`/api/locations/${location.id}`, location);
    const data = await res.data;

    dispatch({
      type: UPDATE_LOCATION,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOCATIONS_ERROR,
      payload: err.response.statusText
    });
  }
};

// Delete location
export const deleteLocation = (id) => async (dispatch) => {
  try {
    setLoading();

    await axios.delete(`/api/locations/${id}`);

    dispatch({
      type: DELETE_LOCATION,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: LOCATIONS_ERROR,
      payload: err.response.statusText
    });
  }
};

// Set current location
export const setCurrent = (location) => {
  return {
    type: SET_CURRENT,
    payload: location
  };
};

// Clear current location
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  };
};

// Search locations
export const searchLocations = (text) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(`/api/locations?q=${text}`);
    const data = await res.json();

    dispatch({
      type: SEARCH_LOCATIONS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOCATIONS_ERROR,
      payload: err.response.data
    });
  }
};
