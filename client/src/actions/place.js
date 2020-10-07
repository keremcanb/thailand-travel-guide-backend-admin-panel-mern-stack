import axios from 'axios';
import {
  GET_PLACES,
  SET_LOADING,
  PLACES_ERROR,
  ADD_PLACE,
  DELETE_PLACE,
  UPDATE_PLACE,
  CURRENT_PLACE,
  CLEAR_CURRENT,
  FILTER_PLACES,
  CLEAR_FILTER
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
    const res = await axios.patch(`/api/places/${place._id}`, place);
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
    type: CURRENT_PLACE,
    payload: place
  };
};

// Clear current place
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  };
};

// Filter
export const filterPlaces = (text) => {
  return { type: FILTER_PLACES, payload: text };
};

// Clear Filter
export const clearFilter = () => {
  return { type: CLEAR_FILTER };
};
