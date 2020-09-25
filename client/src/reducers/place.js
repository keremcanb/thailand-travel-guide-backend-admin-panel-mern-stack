import {
  GET_PLACES,
  SET_LOADING,
  PLACES_ERROR,
  ADD_PLACE,
  DELETE_PLACE,
  UPDATE_PLACE,
  SEARCH_PLACES,
  CURRENT_PLACE,
  CLEAR_CURRENT
} from '../actions/types';

const initialState = {
  places: null,
  current: null,
  loading: false,
  error: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PLACES:
      return { ...state, places: payload, loading: false };
    case ADD_PLACE:
      return {
        ...state,
        places: [...state.places, payload],
        loading: false
      };
    case UPDATE_PLACE:
      return {
        ...state,
        places: state.places.map((place) =>
          place._id === payload._id ? payload : place
        ),
        loading: false
      };
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter((place) => place._id !== payload),
        loading: false
      };
    case CURRENT_PLACE:
      return { ...state, current: payload };
    case CLEAR_CURRENT:
      return { ...state, current: null };
    case SEARCH_PLACES:
      return { ...state, places: payload };
    case SET_LOADING:
      return { ...state, loading: true };
    case PLACES_ERROR:
      console.error(payload);
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
}
