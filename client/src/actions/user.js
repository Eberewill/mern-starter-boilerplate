import axios from 'axios';
import { GET_USER, USER_ERROR } from './types';
import { setAlert } from './alert';
import api from '../utils/api';

//get currentUser
export const getCurrentUser = () => async (dispatch) => {
  try {
    const res = await api.get('/users/profile');

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch(setAlert(err.message, 'danger'));
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
