import React from 'react';
import { Link } from 'react-router-dom';

const Service = () => {
  return (
    <div className="service">
      <h2>Marcela Socorro</h2>
      <hr />
      <div className="service-info">
        <h4>Dia: 12/08/2020</h4>
        <h4>Hora: 13:30 PM</h4>
      </div>
      <h3 className="service-state">Pendiente</h3>
      <div className="service-buttons">
        <button className="button button-pink">Eliminar</button>
        <Link className="button button-blue" to="/service/sakdsakld/edit">Editar Cita</Link>
      </div>
    </div>
  );
};

export default Service;