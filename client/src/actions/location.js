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
} from './types';

// Get locations from server
export const getLocations = () => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch('/api/locations');
    const data = await res.json();

    dispatch({
      type: GET_LOCATIONS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOCATIONS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Add new location
export const addLocation = (location) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch('/api/locations', {
      method: 'POST',
      body: JSON.stringify(location),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    dispatch({
      type: ADD_LOCATION,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOCATIONS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Delete location from server
export const deleteLocation = (id) => async (dispatch) => {
  try {
    setLoading();

    await fetch(`/api/locations/${id}`, {
      method: 'DELETE',
    });

    dispatch({
      type: DELETE_LOCATION,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: LOCATIONS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Update location on server
export const updateLocation = (location) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(`/api/locations/${location.id}`, {
      method: 'PUT',
      body: JSON.stringify(location),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    dispatch({
      type: UPDATE_LOCATION,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOCATIONS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Search server locations
export const searchLocations = (text) => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch(`/api/locations?q=${text}`);
    const data = await res.json();

    dispatch({
      type: SEARCH_LOCATIONS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: LOCATIONS_ERROR,
      payload: err.response.statusText,
    });
  }
};

// Set current location
export const setCurrent = (location) => {
  return {
    type: SET_CURRENT,
    payload: location,
  };
};

// Clear current location
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
