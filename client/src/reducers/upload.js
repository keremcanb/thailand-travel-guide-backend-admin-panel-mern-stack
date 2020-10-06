import { FILE_UPLOAD, UPLOAD_ERROR } from '../actions/types';

const initialState = {
  file: null,
  filename: null,
  message: null,
  error: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FILE_UPLOAD:
      return {
        ...state,
        locations: [...state.locations, payload],
        loading: false
      };
    case UPLOAD_ERROR:
      console.error(payload);
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
}
