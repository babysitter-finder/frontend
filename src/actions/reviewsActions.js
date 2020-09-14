import {
  REGISTER_REVIEW,
  LOADING,
  ERROR
} from '../types/reviewsTypes';
import axios from 'axios';
import getCookie from '../utils/getCookie';


export const registerReview = (id, form) => async (dispatch) => {
  dispatch({
    type: LOADING
  });
  try {
    const response = await axios({
      'method': 'post',
      'url': `https://hisitter.xyz/reviews/${id}/service/`,
      'headers': {
        'Authorization': `Token ${getCookie('token')}`
      },
      'data': form
    });
    dispatch({
      type: REGISTER_REVIEW,
      payload: response.data
    });
    document.location.href = '/';
  } catch(error) {
    dispatch({
      type: ERROR,
      payload: 'Ocurrió un error'
    });
  }
};