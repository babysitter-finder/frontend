import axios from 'axios';
import {
  GET_BABYSITTERS,
  LOADING,
  ERROR,
  GET_BABYSITTERS_LOCATION,
  SELECT_BABYSITTER
} from '../types/babysittersTypes';
import getCookie from '../utils/getCookie';

export const getBabysitters = () => async (dispatch, getState) => {
  if (!getState().usersReducer.user.user_bbs) {
    dispatch({
      type: LOADING
    });
    try {
      const response = await axios({
        'method': 'get',
        'url': 'https://hisitter.xyz/users/',
        'headers': {
          'Authorization': `Token ${getCookie('token')}`
        },
        'params': {
          'limit': 30
        }
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

export const selectBabysitter = (username) => async (dispatch, getState) => {
  dispatch({
    type: LOADING
  });
  try {
    const babysitters = getState().babysittersReducer.babysitters;
    let babysitter;
    if (babysitters.length > 0) {
      babysitter = babysitters.filter(babysitter => {
        return babysitter.username === username;
      })[0];
    } else {
      const response = await axios({
        'method': 'get',
        'url': `https://hisitter.xyz/users/${username}/babysitter_data/`,
        'headers': {
          'Authorization': `Token ${getCookie('token')}`
        },
      });
      const { data } = response;
      babysitter = data;
    }
    dispatch({
      type: SELECT_BABYSITTER,
      payload: babysitter
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Ocurrió un error'
    });
  }
}