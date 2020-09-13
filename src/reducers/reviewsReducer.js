import {
  LOADING,
  ERROR,
  REGISTER_REVIEW
} from '../types/reviewsTypes';

const INITIAL_STATE = {
  serviceForm: {},
  editForm: {},
  loading: false,
  error: '',
  services: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REGISTER_REVIEW:
    return {
      ...state,
      error: '',
      loading: false
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