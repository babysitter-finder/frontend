import axios from 'axios';
import { LOGIN_USER, LOADING, ERROR } from '../types/usersTypes';

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
      payload: response.data.user
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Ocurrió un error'
    });
  }
}