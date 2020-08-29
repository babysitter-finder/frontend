import React from 'react';
import Button from '../atoms/Button';

const PopupDeleteUser = () => {
  return (
    <div className="popupDeleteUser">
      <h2>¿Estás seguro de eliminar  tu cuenta?</h2>
      <div className="input">
        <label className="popupDeleteUser-label" htmlFor="">Escribe tu correo:</label>
        <input type="text" placeholder="Correo" />
      </div>
      <div className="buttons">
        <Button text="Cancelar" className="button-red" />
        <Button text="Cancelar" className="button-green" />
      </div>
    </div>
  );
};

export default PopupDeleteUser;