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
      // TODO:
      // The URL for API should be a const to avoid override in all functions
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
    // TODO:
    // When using this way to redirect, the app is reloaded, is bad practice in SPA you could use the redirect with `history.push("/somePath")` from react-router.
    // https://dev.to/projectescape/programmatic-navigation-in-react-3p1l
    document.location.href = '/';
  } catch(error) {
    dispatch({
      type: ERROR,
      payload: 'Ocurrió un error'
    });
  }
};