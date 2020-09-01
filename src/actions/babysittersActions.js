import axios from 'axios';
import { GET_BABYSITTERS, LOADING, ERROR, GET_BABYSITTERS_LOCATION } from '../types/babysittersTypes';

export const getBabysitters = () => async (dispatch) => {
  dispatch({
    type: LOADING
  });
  const getCookie = (cname) => {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
  try {
    const response = await axios({
      'method': 'get',
      'url': 'https://hisitter.xyz/babysitters/',
      'headers': {
        'Authorization': `Token ${getCookie('token')}` },
    });
    const { data } = response;
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

export const getBabysittersLocation = () => async (dispatch, getState) => {
  dispatch({
    type: LOADING
  });
  try {
    const KEY = 'AIzaSyAeTBVGhPqkbeNcVh-sEXG5K_l4CBhzZCQ';
    const { babysitters } = getState().babysittersReducer;
    const locationsData = await Promise.all(babysitters.map(async (babysitter) => {
      const URL = `https://maps.googleapis.com/maps/api/geocode/json?&key=${KEY}`;
      const response = await axios({
        'method': 'get',
        'url': URL,
        'params': {
          'address': babysitter.address
        }
      });
      const data = response.data.results[0].geometry.location
      return data;
    }));
    console.log(locationsData)
    
    dispatch({
      type: GET_BABYSITTERS_LOCATION,
      payload: locationsData
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Ocurrió un error'
    });
  }
}