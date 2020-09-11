import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Service = ({ service }) => {

  const shifts = {
    morning: 'Mañana',
    afternoon: 'Mediodía',
    evening: 'Tarde',
    night: 'Noche'
  };
  let state;
  if (service.is_active && !service.service_start) {
    state = 'Pendiente'
  }
  else if(service.is_active && service.service_start) {
    state = 'En progreso'
  }
  else if(service.is_active && service.service_end) {
    state = 'Concluido'
  }
  return (
    <div className="service">
      <h2>{ service.user_bbs.full_name ?? 'Marcela Socorro'}</h2>
      <hr />
      <div className="service-info">
        <h4>Dia: {service.date }</h4>
        <h4>Horario: { shifts[service.shift] }</h4>
      </div>
      <h3 className="service-state">
        {
          state
        }
      </h3>
      <div className="service-buttons">
        <button className="button button-pink">Eliminar</button>
        <Link className="button button-blue" to="/service/sakdsakld/edit">Editar Cita</Link>
      </div>
    </div>
  );
};

Service.propTypes = {
  service: PropTypes.object
};

export default Service;