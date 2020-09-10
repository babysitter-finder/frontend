import axios from 'axios';
import {
  LOGIN_USER,
  LOADING,
  ERROR,
  LOGOUT_USER,
  GET_USER_DATA,
  UPDATE_USER_DATA
} from '../types/usersTypes';
import getCookie from '../utils/getCookie';

export const loginUser = ( form ) => async (dispatch) => {
  dispatch({
    type: LOADING
  });
  try {
    const response = await axios({
      'method': 'post',
      'url': 'https://hisitter.xyz/users/login/',
      data: form
    });
    const { data } = response;
    document.cookie = `picture=${data.user.picture ?? ''}`;
    document.cookie = `name=${data.user.first_name}`;
    document.cookie = `username=${data.user.username}`;
    document.cookie = `token=${data.access_token}`;
    dispatch({
      type: LOGIN_USER,
      payload: data.user
    });
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
  dispatch({
    type: LOGOUT_USER,
    payload: {}
  });
  window.location.href = '/';
}

export const registerUser = ( form ) => async (dispatch) => {
  dispatch({
    type: LOADING
  });
  try {
    const response = await axios({
      'method': 'post',
      'url': 'https://hisitter.xyz/users/signup/',
      data: form
    });
    const { data } = response;
    dispatch({
      type: LOGIN_USER,
      payload: data.user
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
  if (Object.keys(user).length > 3) {
    dispatch({
      type: LOGIN_USER,
      payload: user
    });
  } else {
    try {
      const response = await axios({
        'method': 'get',
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
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: 'Ocurrió un error'
      });
    }
  }
}

export const updateUserData = (form) => async (dispatch) => {
  dispatch({
    type: LOADING
  });
  try {
    const response = await axios({
      'method': 'patch',
      'url': `https://hisitter.xyz/users/${getCookie('username')}/`,
      'headers': {
        'Authorization': `Token ${getCookie('token')}`
      },
      'data': form
    });
    const { data } = response;
    dispatch({
      type: UPDATE_USER_DATA,
      payload: data.user
    });
    document.location.href = '/profile';
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Ocurrió un error'
    });
  }
}