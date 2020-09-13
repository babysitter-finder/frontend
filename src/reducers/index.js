import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import babysittersReducer from './babysittersReducer';
import servicesReducer from './servicesReducer';
import reviewsReducer from './reviewsReducer';

export default combineReducers({
  usersReducer,
  babysittersReducer,
  servicesReducer,
  reviewsReducer,
});