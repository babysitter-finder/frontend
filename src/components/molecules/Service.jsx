import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Service = ({ service, user }) => {

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
      {!user.user_bbs && <h2>{ service.user_bbs.fullname ?? 'Marcela Socorro'}</h2>}
      {user.user_bbs && <h2>{ service.user_client.fullname ?? 'Marcela Socorro'}</h2>}
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
        {!user.user_bbs && !service.service_start && <Link className="button button-blue" to={ `/service/${service.id}/edit` }>Editar Cita</Link>}
        {!user.user_bbs && service.service_end && <Link className="button button-blue" to={ `/review/${service.id}` }>Calificar</Link>}
        {!user.user_bbs && service.service_end && <Link className="button button-blue" to={ `/review/${service.id}` }>Calificar</Link>}
        {user.user_bbs && !service.service_end && <Link className="button button-blue" to={ `/service/${service.id}` }>Ver más</Link>}
      </div>
    </div>
  );
};

Service.propTypes = {
  service: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = (reducer) => {
  return reducer.usersReducer;
};

export default connect(mapStateToProps)(Service);