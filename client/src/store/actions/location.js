import axios, { get, post, patch } from 'axios';
import {
  GET_LOCATIONS,
  SET_LOADING,
  LOCATIONS_ERROR,
  ADD_LOCATION,
  DELETE_LOCATION,
  UPDATE_LOCATION,
  CURRENT_LOCATION,
  CLEAR_CURRENT,
  FILTER_LOCATIONS,
  CLEAR_FILTER
} from '../types';

// Set loading to true
export const setLoading = () => ({
  type: SET_LOADING
});

// Get locations
export const getLocations = () => async (dispatch) => {
  try {
    setLoading();
    const { data } = await get('/api/locations');
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
    const { data } = await post('/api/locations', location);
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
    const { data } = await patch(`/api/locations/${location._id}`, location);
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
export const setCurrent = (location) => ({
  type: CURRENT_LOCATION,
  payload: location
});

// Clear current location
export const clearCurrent = () => ({
  type: CLEAR_CURRENT
});

// Filter
export const filterLocations = (text) => ({ type: FILTER_LOCATIONS, payload: text });

// Clear Filter
export const clearFilter = () => ({ type: CLEAR_FILTER });
