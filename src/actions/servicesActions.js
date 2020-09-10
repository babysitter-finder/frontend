import {
  SET_SERVICE_FORM,
  REGISTER_SERVICE,
  LOADING,
  ERROR
} from '../types/servicesTypes';
import axios from 'axios';
import getCookie from '../utils/getCookie';


export const setServiceForm = (input) => (dispatch) => {
  dispatch({
    type: SET_SERVICE_FORM,
    payload: {
      ...input
    }
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
    dispatch({
      type: REGISTER_SERVICE,
      payload: response.data
    });
    document.location.href = '/schedule';
  } catch(error) {
    dispatch({
      type: ERROR,
      payload: 'Ocurrió un error'
    });
  }
};