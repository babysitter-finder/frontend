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
      // TODO:
      // The URL for API should be a const to avoid override in all functions
      'url': `https://hisitter.xyz/services/create/${username}/`,
      'headers': {
        'Authorization': `Token ${getCookie('token')}`
      },
      'data': serviceForm
    });
    // TODO:
    // When using this way to redirect, the app is reloaded, is bad practice in SPA you could use the redirect with `history.push("/somePath")` from react-router.
    // https://dev.to/projectescape/programmatic-navigation-in-react-3p1l
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
      // TODO:
      // The URL for API should be a const to avoid override in all functions
      'url': `https://hisitter.xyz/services/${id}/`,
      'headers': {
        'Authorization': `Token ${getCookie('token')}`
      },
      'data': form
    });
    // TODO:
    // When using this way to redirect, the app is reloaded, is bad practice in SPA you could use the redirect with `history.push("/somePath")` from react-router.
    // https://dev.to/projectescape/programmatic-navigation-in-react-3p1l
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
      // TODO:
      // The URL for API should be a const to avoid override in all functions
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
      // TODO:
      // The URL for API should be a const to avoid override in all functions
      'url': `https://hisitter.xyz/services/${id}/start`,
      'headers': {
        'Authorization': `Token ${getCookie('token')}`
      }
    });
    dispatch({
      type: START_SERVICE,
    });
    // TODO:
    // When using this way to redirect, the app is reloaded, is bad practice in SPA you could use the redirect with `history.push("/somePath")` from react-router.
    // https://dev.to/projectescape/programmatic-navigation-in-react-3p1l
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
      // TODO:
      // The URL for API should be a const to avoid override in all functions
      'url': `https://hisitter.xyz/services/${id}/end`,
      'headers': {
        'Authorization': `Token ${getCookie('token')}`
      }
    });
    dispatch({
      type: START_SERVICE,
    });
    // TODO:
    // When using this way to redirect, the app is reloaded, is bad practice in SPA you could use the redirect with `history.push("/somePath")` from react-router.
    // https://dev.to/projectescape/programmatic-navigation-in-react-3p1l
    document.location.href = '/';
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Ocurrió un error'
    });
  }
}