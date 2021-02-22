import axios, { get, post, patch } from 'axios';
import {
  GET_CATEGORIES,
  SET_LOADING,
  CATEGORIES_ERROR,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  CURRENT_CATEGORY,
  CLEAR_CURRENT,
  FILTER_CATEGORIES,
  CLEAR_FILTER
} from '../types';

export const setLoading = () => ({
  type: SET_LOADING
});

export const getCategories = () => async (dispatch) => {
  try {
    setLoading();
    const { data } = await get('/api/categories');
    dispatch({
      type: GET_CATEGORIES,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: CATEGORIES_ERROR,
      payload: err.response.statusText
    });
  }
};

export const addCategory = (category) => async (dispatch) => {
  try {
    setLoading();
    const { data } = await post('/api/categories', category);
    dispatch({
      type: ADD_CATEGORY,
      payload: data
    });
  } catch (err) {
    console.category(err);
    dispatch({
      type: CATEGORIES_ERROR,
      payload: err.response.statusText
    });
  }
};

export const updateCategory = (category) => async (dispatch) => {
  try {
    setLoading();
    const { data } = await patch(`/api/categories/${category._id}`, category);
    dispatch({
      type: UPDATE_CATEGORY,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: CATEGORIES_ERROR,
      payload: err.response.statusText
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    setLoading();
    await axios.delete(`/api/categories/${id}`);
    dispatch({
      type: DELETE_CATEGORY,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: CATEGORIES_ERROR,
      payload: err.response.statusText
    });
  }
};

export const setCurrent = (category) => ({
  type: CURRENT_CATEGORY,
  payload: category
});

export const clearCurrent = () => ({
  type: CLEAR_CURRENT
});

export const filterCategories = (text) => ({ type: FILTER_CATEGORIES, payload: text });

export const clearFilter = () => ({ type: CLEAR_FILTER });
