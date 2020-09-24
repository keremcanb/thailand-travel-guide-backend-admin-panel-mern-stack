import axios from 'axios';
import {
  GET_PLACES,
  SET_LOADING,
  PLACES_ERROR,
  ADD_PLACE,
  DELETE_PLACE,
  UPDATE_PLACE,
  SEARCH_PLACES,
  SET_CURRENT,
  CLEAR_CURRENT
} from './types';

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

// Get places
export const getPlaces = () => async (dispatch) => {
  try {
    setLoading();

    const res = await axios.get('/api/places');
    const data = await res.data;

    dispatch({
      type: GET_PLACES,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: PLACES_ERROR,
      payload: err.response.statusText
    });
  }
};

// Add place
export const addPlace = (place) => async (dispatch) => {
  try {
    setLoading();

    const res = await axios.post('/api/places', place);
    const data = await res.data;

    dispatch({
      type: ADD_PLACE,
      payload: data
    });
  } catch (err) {
    console.place(err);
    dispatch({
      type: PLACES_ERROR,
      payload: err.response.statusText
    });
  }
};

// Update place
export const updatePlace = (place) => async (dispatch) => {
  try {
    setLoading();

    const res = await axios.put(`/api/places/${place.id}`, place);
    const data = await res.data;

    dispatch({
      type: UPDATE_PLACE,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: PLACES_ERROR,
      payload: err.response.statusText
    });
  }
};

// Delete place
export const deletePlace = (id) => async (dispatch) => {
  try {
    setLoading();

    await axios.delete(`/api/places/${id}`);

    dispatch({
      type: DELETE_PLACE,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: PLACES_ERROR,
      payload: err.response.statusText
    });
  }
};

// Set current place
export const setCurrent = (place) => {
  return {
    type: SET_CURRENT,
    payload: place
  };
};

// Clear current place
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  };
};

// Search places
export const searchPlaces = (text) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(`/api/places?q=${text}`);
    const data = await res.json();

    dispatch({
      type: SEARCH_PLACES,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: PLACES_ERROR,
      payload: err.response.data
    });
  }
};