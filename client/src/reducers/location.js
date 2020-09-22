import {
  GET_LOCATIONS,
  SET_LOADING,
  LOCATIONS_ERROR,
  ADD_LOCATION,
  DELETE_LOCATION,
  UPDATE_LOCATION,
  SEARCH_LOCATIONS,
  SET_CURRENT,
  CLEAR_CURRENT,
} from '../actions/types';

const initialState = {
  locations: null,
  current: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
        loading: false,
      };
    case ADD_LOCATION:
      return {
        ...state,
        locations: [...state.locations, action.payload],
        loading: false,
      };
    case DELETE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter(
          (location) => location.id !== action.payload
        ),
        loading: false,
      };
    case UPDATE_LOCATION:
      return {
        ...state,
        locations: state.locations.map((location) =>
          location.id === action.payload.id ? action.payload : location
        ),
      };
    case SEARCH_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOCATIONS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
