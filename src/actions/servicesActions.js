import {
  SET_SERVICE_FORM,
  REGISTER_SERVICE,
  GET_SERVICE,
  LOADING,
  ERROR,
  START_SERVICE
} from '../types/servicesTypes';
import axios from 'axios';
import getCookie from '../utils/getCookie';


export const setServiceForm = (form) => (dispatch) => {
  dispatch({
    type: SET_SERVICE_FORM,
    payload: form
  });
};

export const registerService = () => async (dispatch, getState) => {
  dispatch({
    type: LOADING
  });
  try {
    const { serviceForm } = getState().servicesReducer;
    const { username } = getState().babysittersReducer.babysitter;
    const response = await axios({
      'method': 'post',
      'url': `https://hisitter.xyz/services/create/${username}/`,
      'headers': {
        'Authorization': `Token ${getCookie('token')}`
      },
      'data': serviceForm
    });
    document.location.href = '/';
    dispatch({
      type: REGISTER_SERVICE,
      payload: response.data
    });
  } catch(error) {
    dispatch({
      type: ERROR,
      payload: 'Ocurrió un error'
    });
  }
};

export const updateService = (form, id) => async (dispatch) => {
  dispatch({
    type: LOADING
  });
  try {
    const response = await axios({
      'method': 'patch',
      'url': `https://hisitter.xyz/services/${id}/`,
      'headers': {
        'Authorization': `Token ${getCookie('token')}`
      },
      'data': form
    });
    document.location.href = '/';
    dispatch({
      type: REGISTER_SERVICE,
      payload: response.data
    });
  } catch(error) {
    dispatch({
      type: ERROR,
      payload: 'Ocurrió un error'
    });
  }
};

export const getService = (id) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    const response = await axios({
      'method': 'get',
      'url': `https://hisitter.xyz/services/${id}/`,
      'headers': {
        'Authorization': `Token ${getCookie('token')}`
      }
    });
    dispatch({
      type: GET_SERVICE,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Ocurrió un error'
    });
  }
}

export const startService = (id) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    await axios({
      'method': 'patch',
      'url': `https://hisitter.xyz/services/${id}/start`,
      'headers': {
        'Authorization': `Token ${getCookie('token')}`
      }
    });
    dispatch({
      type: START_SERVICE,
    });
    document.location.href = '/';
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Ocurrió un error'
    });
  }
}

export const endService = (id) => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
  try {
    await axios({
      'method': 'patch',
      'url': `https://hisitter.xyz/services/${id}/end`,
      'headers': {
        'Authorization': `Token ${getCookie('token')}`
      }
    });
    dispatch({
      type: START_SERVICE,
    });
    document.location.href = '/';
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Ocurrió un error'
    });
  }
}