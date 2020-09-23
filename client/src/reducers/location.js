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

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return { ...state, loading: true };
    case GET_LOCATIONS:
      return { ...state, locations: payload, loading: false };
    case ADD_LOCATION:
      return {
        ...state,
        locations: [...state.locations, payload],
        loading: false,
      };
    case DELETE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter(
          (location) => location._id !== payload
        ),
        loading: false,
      };
    case UPDATE_LOCATION:
      return {
        ...state,
        locations: state.locations.map((location) =>
          location._id === payload.id ? payload : location
        ),
        loading: false,
      };
    case SET_CURRENT:
      return { ...state, current: payload };
    case CLEAR_CURRENT:
      return { ...state, current: null };
    case SEARCH_LOCATIONS:
      return { ...state, locations: payload };
    case LOCATIONS_ERROR:
      console.error(payload);
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
