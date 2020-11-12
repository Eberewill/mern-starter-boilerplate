import { GET_CUSTOMERS } from '../actions/types';

const initialState = {
  customers: {},
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: payload,
        loading: false
      };
    default:
      return state;
  }
}
