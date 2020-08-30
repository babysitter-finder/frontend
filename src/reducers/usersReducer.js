import { LOGIN_USER, LOADING, ERROR, REGISTER_USER } from '../types/usersTypes';

const INITIAL_STATE = {
  user: {},
  loading: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_USER:
    return {
      ...state,
      user: action.payload,
      loading: false,
      error: ''
    };
  case REGISTER_USER:
    return {
      ...state,
      loading: false,
      error: ''
    };
  case LOADING:
    return {
      ...state,
      loading: true
    };
  case ERROR:
    return {
      ...state,
      error: action.payload,
      loading: false
    };
  default: return state;
  }
}