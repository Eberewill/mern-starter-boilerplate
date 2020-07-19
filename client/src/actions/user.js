import axios from 'axios';
import { GET_USER, USER_ERROR } from './types';

export const getCurrentUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/users');

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
