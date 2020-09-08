import React from 'react';
import Popup from '../molecules/Popup';
import PropTypes from 'prop-types';

const PopupDeleteUser = ({ closePopup }) => {
  return (
    <Popup closePopup={ closePopup }>
      <h2>¿Estás seguro de eliminar  tu cuenta?</h2>
      <div className="input">
        <label className="popupDeleteUser-label" htmlFor="">Escribe tu correo:</label>
        <input type="text" placeholder="Correo" />
      </div>
      <div className="buttons">
        <button onClick={ closePopup } className="button-red">Cancelar</button>
        <button className="button-green">Eliminar</button>
      </div>
    </Popup>
  );
};

PopupDeleteUser.propTypes = {
  closePopup: PropTypes.func.isRequired,
}

export default PopupDeleteUser;