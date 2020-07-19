import { GET_USER, USER_ERROR } from '../actions/types';

const initialState = {
  currentUser: {},
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER:
      return {
        ...state,
        currentUser: payload,
        loading: false
      };
    default:
      return state;
  }
}
