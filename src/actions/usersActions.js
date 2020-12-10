import axios from 'axios';
import {
  LOGIN_USER,
  LOADING,
  ERROR,
  LOGOUT_USER,
  GET_USER_DATA,
  UPDATE_USER_DATA,
  REGISTER_USER,
  CLOSE_POPUP
} from '../types/usersTypes';
import { GET_SERVICES } from '../types/servicesTypes'
import getCookie from '../utils/getCookie';

export const loginUser = ( form ) => async (dispatch) => {
  dispatch({
    type: LOADING
  });
  try {
    const response = await axios({
      'method': 'post',
      // TODO:
      // The URL for API should be a const to avoid override in all functions
      'url': 'https://hisitter.xyz/users/login/',
      data: form
    });
    const { data } = response;
    // TODO:
    // Only the token should be saved in a cookie the missing data about the user could be saved in sessionStorage or LocalStorage.
    document.cookie = `picture=${data.user.picture ?? ''}`;
    document.cookie = `name=${data.user.first_name}`;
    document.cookie = `username=${data.user.username}`;
    document.cookie = `token=${data.access_token}`;
    document.cookie = `user_bbs=${data.user.user_bbs ? 'true' : ''}`;
    dispatch({
      type: LOGIN_USER,
      payload: data.user
    });
    // TODO:
    // When using this way to redirect, the app is reloaded, is bad practice in SPA you could use the redirect with `history.push("/somePath")` from react-router.
    // https://dev.to/projectescape/programmatic-navigation-in-react-3p1l
    window.location.href = '/';

  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Ocurrió un error'
    });
  }
}

export const logoutUser = () => async (dispatch) => {
  document.cookie = `picture=`;
  document.cookie = `name=`;
  document.cookie = `username=`;
  document.cookie = `token=`;
  document.cookie = `user_bbs=`;
  dispatch({
    type: LOGOUT_USER,
    payload: {}
  });
  // TODO:
  // When using this way to redirect, the app is reloaded, is bad practice in SPA you could use the redirect with `history.push("/somePath")` from react-router.
  // https://dev.to/projectescape/programmatic-navigation-in-react-3p1l
  window.location.href = '/';
}

export const registerUser = ( form ) => async (dispatch) => {
  dispatch({
    type: LOADING
  });
  try {
    const formData = new FormData();
    Object.keys(form).forEach(key => {
      formData.append(key, form[key]);
    });
    await axios({
      'method': 'post',
      // TODO:
      // The URL for API should be a const to avoid override in all functions
      'url': 'https://hisitter.xyz/users/signup/',
      data: formData,
    });
    dispatch({
      type: REGISTER_USER,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Ocurrió un error'
    });
  }
}

export const getUserData = () => async (dispatch, getState) => {
  dispatch({
    type: LOADING
  });
  const { user } = getState().usersReducer;
  const token = getCookie('token');
  if (token) {
    // Why do you want to check the obj have 4 attrs?
    if (Object.keys(user).length > 4) {
      dispatch({
        type: LOGIN_USER,
        payload: user
      });
    } else {
      try {
        const response = await axios({
          'method': 'get',
          // TODO:
          // The URL for API should be a const to avoid override in all functions
          'url': `https://hisitter.xyz/users/${getCookie('username')}/`,
          'headers': {
            'Authorization': `Token ${getCookie('token')}`
          },
        });
        const { data } = response;
        dispatch({
          type: GET_USER_DATA,
          payload: data.user
        });
        dispatch({
          type: GET_SERVICES,
          payload: data.services
        });
      } catch (error) {
        dispatch({
          type: ERROR,
          payload: 'Ocurrió un error'
        });
      }
    }
  }
}

export const updateUserData = (form) => async (dispatch) => {
  dispatch({
    type: LOADING
  });
  try {
    const formData = new FormData();
    Object.keys(form).forEach(key => {
      if (form.picture === form[key] && typeof form.picture === 'string') {
        return
      }
      formData.append(key, form[key]);
    });
    const response = await axios({
      'method': 'patch',
      // TODO:
      // The URL for API should be a const to avoid override in all functions
      'url': `https://hisitter.xyz/users/${getCookie('username')}/`,
      'data': formData,
      'headers': {
        'Authorization': `Token ${getCookie('token')}`
      },
    });
    const { data } = response;
    // TODO:
    // When using this way to redirect, the app is reloaded, is bad practice in SPA you could use the redirect with `history.push("/somePath")` from react-router.
    // https://dev.to/projectescape/programmatic-navigation-in-react-3p1l
    document.location.href = '/';
    dispatch({
      type: UPDATE_USER_DATA,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Ocurrió un error'
    });
  }
}

export const closePopUp = () => async (dispatch) => {
  dispatch({
    type: CLOSE_POPUP
  });
}