/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { FILE_UPLOAD, UPLOAD_ERROR } from './types';
// import { FILE_UPLOAD, FILE_NAME, UPLOAD_MESSAGE, UPLOAD_ERROR } from './types';

export const uploadFile = (file) => async (dispatch) => {
  const formData = new FormData();

  formData.append('file', file);

  try {
    const res = await axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    const data = await res.data;

    dispatch({
      type: FILE_UPLOAD,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: UPLOAD_ERROR,
      payload: err.response.statusText
    });
  }
};
