import axios from 'axios';
import {
  GET_CATEGORIES,
  SET_LOADING,
  CATEGORIES_ERROR,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  SEARCH_CATEGORIES,
  SET_CURRENT,
  CLEAR_CURRENT
} from './types';

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

// Get categories
export const getCategories = () => async (dispatch) => {
  try {
    setLoading();

    const res = await axios.get('/api/categories');
    const data = await res.data;

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

    const res = await axios.post('/api/categories', category);
    const data = await res.data;

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

    const res = await axios.put(`/api/categories/${category.id}`, category);
    const data = await res.data;

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
export const setCurrent = (category) => {
  return {
    type: SET_CURRENT,
    payload: category
  };
};

// Clear current category
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  };
};

// Search categories
export const searchCategories = (text) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(`/api/categories?q=${text}`);
    const data = await res.json();

    dispatch({
      type: SEARCH_CATEGORIES,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: CATEGORIES_ERROR,
      payload: err.response.data
    });
  }
};
