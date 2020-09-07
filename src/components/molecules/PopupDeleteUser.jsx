import React from 'react';

const PopupDeleteUser = () => {
  return (
    <>
      <h2>¿Estás seguro de eliminar  tu cuenta?</h2>
      <div className="input">
        <label className="popupDeleteUser-label" htmlFor="">Escribe tu correo:</label>
        <input type="text" placeholder="Correo" />
      </div>
      <div className="buttons">
        <button className="button-red">Cancelar</button>
        <button className="button-green">Eliminar</button>
      </div>
    </>
  );
};

export default PopupDeleteUser;