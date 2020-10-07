import {
  GET_LOCATIONS,
  SET_LOADING,
  LOCATIONS_ERROR,
  ADD_LOCATION,
  DELETE_LOCATION,
  UPDATE_LOCATION,
  CURRENT_LOCATION,
  CLEAR_CURRENT,
  FILTER_LOCATIONS,
  CLEAR_FILTER
} from '../actions/types';

const initialState = {
  locations: null,
  current: null,
  loading: false,
  filtered: null,
  error: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LOCATIONS:
      return { ...state, locations: payload, loading: false };
    case ADD_LOCATION:
      return {
        ...state,
        locations: [...state.locations, payload],
        loading: false
      };
    case UPDATE_LOCATION:
      return {
        ...state,
        locations: state.locations.map((location) =>
          location._id === payload._id ? payload : location
        ),
        loading: false
      };
    case DELETE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter(
          (location) => location._id !== payload
        ),
        loading: false
      };
    case FILTER_LOCATIONS:
      return {
        ...state,
        filtered: state.locations.filter((location) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return location.title.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case CURRENT_LOCATION:
      return { ...state, current: payload };
    case CLEAR_CURRENT:
      return { ...state, current: null };
    case SET_LOADING:
      return { ...state, loading: true };
    case LOCATIONS_ERROR:
      console.error(payload);
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
}
