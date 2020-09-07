import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import babysittersReducer from './babysittersReducer';

export default combineReducers({
  usersReducer,
  babysittersReducer,
});