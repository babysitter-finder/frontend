import {
  LOGIN_USER,
  LOADING,
  ERROR,
  REGISTER_USER,
  LOGOUT_USER,
  GET_USER_DATA,
  UPDATE_USER_DATA,
  CLOSE_POPUP
} from '../types/usersTypes';
import getCookie from '../utils/getCookie';

const token = getCookie('token');
const username = getCookie('username');
const name = getCookie('name');
const picture = getCookie('picture');
const user_bbs = getCookie('user_bbs');

const user = token ? {
  username,
  name,
  picture,
  user_bbs,
} : {};

const INITIAL_STATE = {
  user,
  loading: false,
  error: '',
  popUp: false
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
  case LOGOUT_USER:
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
      error: '',
      popUp: true
    };
  case GET_USER_DATA:
    return {
      ...state,
      user: action.payload,
      loading: false,
      error: ''
    };
  case UPDATE_USER_DATA:
    return {
      ...state,
      user: action.payload,
      loading: false,
      error: ''
    };
  case CLOSE_POPUP:
    return {
      ...state,
      popUp: false,
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