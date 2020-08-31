import axios from 'axios';
import { GET_BABYSITTERS, LOADING, ERROR } from '../types/babysittersTypes';

export const getBabysitters = () => async (dispatch) => {
  dispatch({
    type: LOADING
  });
  const getCookie = (cname) => {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  try {
    axios.defaults.headers.common['Authorization'] = `Token ${document.cookie['token']}`;
    const response = await axios({
      'method': 'get',
      'url': 'https://hisitter.xyz/babysitters/',
      'headers': {
        'Authorization': `Token ${getCookie('token')}` },
    });
    const { data } = response;
    console.log(data);
    dispatch({
      type: GET_BABYSITTERS,
      payload: data.results
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Ocurrió un error'
    });
  }
}