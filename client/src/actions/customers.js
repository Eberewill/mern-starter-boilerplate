import axios from 'axios';

import { GET_CUSTOMERS } from './types';

export const getCustomers = () => async (dispatch) => {
  try {
    const res = await axios.get(
      'https://easysaveapi.herokuapp.com/api/customers'
    );

    dispatch({
      type: GET_CUSTOMERS,
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
