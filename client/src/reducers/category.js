import {
  GET_CATEGORIES,
  SET_LOADING,
  CATEGORIES_ERROR,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  SEARCH_CATEGORIES,
  SET_CURRENT,
  CLEAR_CURRENT,
} from '../actions/types';

const initialState = {
  categories: null,
  current: null,
  loading: false,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return { ...state, loading: true };
    case GET_CATEGORIES:
      return { ...state, categories: payload, loading: false };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, payload],
        loading: false,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== payload
        ),
        loading: false,
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category._id === payload.id ? payload : category
        ),
        loading: false,
      };
    case SET_CURRENT:
      return { ...state, current: payload };
    case CLEAR_CURRENT:
      return { ...state, current: null };
    case SEARCH_CATEGORIES:
      return { ...state, categories: payload };
    case CATEGORIES_ERROR:
      console.error(payload);
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
