import { createSlice } from '@reduxjs/toolkit';
import api from '../utils/api';

const initialState = {
  locations: [],
  current: {},
  isLoading: false,
  filtered: null,
  error: null
};

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    getLocations: (state, action) => {
      state.locations = action.payload;
      state.isLoading = false;
    },
    addLocation: (state, action) => {
      state.locations = action.payload;
      state.isLoading = false;
    },
    updateLocation: (state, action) => {
      state.locations = state.locations.map((location) =>
        location._id === action.payload._id ? action.payload : location
      );
      state.isLoading = false;
    },
    deleteLocation: (state, action) => {
      state.locations = state.locations.filter((location) => location._id !== action.payload);
      state.isLoading = false;
    }
  }
});

export const { getLocations, addLocation, updateLocation, deleteLocation } = slice.actions;

export default locationsSlice.reducer;

// export const getLocations = () => async (dispatch) => {
//   try {
//     await api.get('/locations').then((res) => dispatch(locationsSuccess(res.data)));
//   } catch (e) {
//     return console.error(e.message);
//   }
// };

// export const addLocation = (location) => async (dispatch) => {
//   try {
//     await api.post('/locations', location).then((res) => dispatch(locationsSuccess(res.data)));
//   } catch (e) {
//     return console.error(e.message);
//   }
// };

// export const updateLocation = (location) => async (dispatch) => {
//   try {
//     await api.patch(`/locations/${location._id}`, location).then((res) => dispatch(locationsSuccess(res.data)));
//   } catch (e) {
//     return console.error(e.message);
//   }
// };

// export const deleteLocation = (id) => async (dispatch) => {
//   try {
//     await api.delete(`/locations/${id}`).then(() => dispatch(locationsSuccess(id)));
//   } catch (e) {
//     return console.error(e.message);
//   }
// };

// export const filterLocations = (text) => {
//   return payload: text;
// };
