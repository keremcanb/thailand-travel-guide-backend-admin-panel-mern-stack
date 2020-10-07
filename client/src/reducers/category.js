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
} from '../actions/types';

const initialState = {
  categories: null,
  current: null,
  loading: false,
  filtered: null,
  error: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORIES:
      return { ...state, categories: payload, loading: false };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, payload],
        loading: false
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category._id === payload._id ? payload : category
        ),
        loading: false
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== payload
        ),
        loading: false
      };
    case FILTER_CATEGORIES:
      return {
        ...state,
        filtered: state.categories.filter((category) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return category.title.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case CURRENT_CATEGORY:
      return { ...state, current: payload };
    case CLEAR_CURRENT:
      return { ...state, current: null };
    case SET_LOADING:
      return { ...state, loading: true };
    case CATEGORIES_ERROR:
      console.error(payload);
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
}
