import {
  LOADING,
  ERROR,
  SET_SERVICE_FORM
} from '../types/servicesTypes';

const INITIAL_STATE = {
  serviceForm: {},
  loading: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_SERVICE_FORM:
    return {
      ...state,
      serviceForm: {
        ...state.serviceForm,
        ...action.payload
      },
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