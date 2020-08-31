import { LOADING, ERROR, GET_BABYSITTERS } from '../types/babysittersTypes';

const INITIAL_STATE = {
  user: {},
  loading: false,
  error: '',
  babysitters: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_BABYSITTERS:
    return {
      ...state,
      loading: false,
      error: '',
      babysitters: action.payload
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