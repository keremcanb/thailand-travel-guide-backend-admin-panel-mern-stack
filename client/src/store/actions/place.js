import axios, { get, post, patch } from 'axios';
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
} from '../types';

export const setLoading = () => ({
  type: SET_LOADING
});

export const getPlaces = () => async (dispatch) => {
  try {
    setLoading();
    const { data } = await get('/api/places');
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

export const addPlace = (place) => async (dispatch) => {
  try {
    setLoading();
    const { data } = await post('/api/places', place);
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

export const updatePlace = (place) => async (dispatch) => {
  try {
    setLoading();
    const { data } = await patch(`/api/places/${place._id}`, place);
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

export const setCurrent = (place) => ({
  type: CURRENT_PLACE,
  payload: place
});

export const clearCurrent = () => ({
  type: CLEAR_CURRENT
});

export const filterPlaces = (text) => ({ type: FILTER_PLACES, payload: text });

export const clearFilter = () => ({ type: CLEAR_FILTER });
