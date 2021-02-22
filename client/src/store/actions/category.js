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

// Set loading to true
export const setLoading = () => ({
  type: SET_LOADING
});

// Get categories
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

// Add category
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

// Update category
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

// Delete category
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

// Set current category
export const setCurrent = (category) => ({
  type: CURRENT_CATEGORY,
  payload: category
});

// Clear current category
export const clearCurrent = () => ({
  type: CLEAR_CURRENT
});

// Filter
export const filterCategories = (text) => ({ type: FILTER_CATEGORIES, payload: text });

// Clear Filter
export const clearFilter = () => ({ type: CLEAR_FILTER });
