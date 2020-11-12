import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import user from './user';
import customers from './customers';

export default combineReducers({
  alert,
  auth,
  user,
  customers
});
