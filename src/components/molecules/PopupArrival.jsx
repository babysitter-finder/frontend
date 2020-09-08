import React from 'react';
import Popup from '../molecules/Popup';

const PopupArrival = () => {
  return (
    <Popup>
      <h2>!Marcela Socorro ha llegado¡</h2>
      <h3>Acercate a la puerta a recibirla</h3>
      <button className="button button-blue">Aceptar</button>
    </Popup>
  );
};

export default PopupArrival;