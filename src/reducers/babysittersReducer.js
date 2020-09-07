import { LOADING, ERROR, GET_BABYSITTERS, GET_BABYSITTERS_LOCATION } from '../types/babysittersTypes';

const INITIAL_STATE = {
  user: {},
  loading: false,
  error: '',
  babysitters: [],
  locations: []
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
  case GET_BABYSITTERS_LOCATION:
    return {
      ...state,
      loading: false,
      error: '',
      locations: action.payload
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