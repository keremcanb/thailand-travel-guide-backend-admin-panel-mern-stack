import api from '../../utils/api';
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
    const { data } = await api.get('/categories');
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
    const { data } = await api.post('/categories', category);
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
    const { data } = await api.patch(`/categories/${category._id}`, category);
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
    await api.delete(`/categories/${id}`);
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
