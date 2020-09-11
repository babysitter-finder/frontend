import {
  LOADING,
  ERROR,
  SET_SERVICE_FORM, REGISTER_SERVICE, GET_SERVICES
} from '../types/servicesTypes';

const INITIAL_STATE = {
  serviceForm: {},
  loading: false,
  error: '',
  services: [],
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
  case REGISTER_SERVICE:
    return {
      ...state,
      services: [
        ...state.services,
        ...action.payload
      ],
      error: '',
      loading: false
    };
  case GET_SERVICES:
    return {
      ...state,
      services: action.payload
    }
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