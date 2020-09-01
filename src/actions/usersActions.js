import axios from 'axios';
import { LOGIN_USER, LOADING, ERROR, LOGOUT_USER } from '../types/usersTypes';
import { useHistory } from 'react-router-dom';

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
    document.cookie = `email=${data.user.email}`;
    document.cookie = `name=${data.user.first_name}`;
    document.cookie = `username=${data.user.username}`;
    document.cookie = `token=${data.access_token}`;
    dispatch({
      type: LOGIN_USER,
      payload: data.user
    });
    useHistory().push = '/';
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Ocurrió un error'
    });
  }
}

export const logoutUser = () => async (dispatch) => {
  document.cookie = `email=`;
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
      data: form,
      'headers': { 'Authorization': '' }
    });
    const { data } = response;
    window.location.href = '/email';
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