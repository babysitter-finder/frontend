import {
  SET_SERVICE_FORM
} from '../types/servicesTypes';


export const setServiceForm = (input) => async (dispatch) => {
  dispatch({
    type: SET_SERVICE_FORM,
    payload: {
      ...input
    }
  });
}