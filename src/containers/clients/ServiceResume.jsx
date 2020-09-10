import React from 'react';
import Caption from '../../components/molecules/Caption';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerService } from '../../actions/servicesActions';

const ServiceResume = ({ serviceForm, babysitter, registerService }) => {
  const shifts = {
    morning: 'Mañana',
    afternoon: 'Mediodía',
    evening: 'Tarde',
    night: 'Noche'
  };

  const handleClick = () => {
    registerService();
  };

  return (
    <div className="serviceResume">
      <div className="serviceResume-container">
        <h1>Resumen</h1>
        <div className="serviceResume-divide">
          <div className="serviceResume-left">
            <h3>Día: { serviceForm.day ?? '12/08/2020'}</h3>
            <h3>Horario: { shifts[serviceForm.shift] ?? 'Tarde'}</h3>
            <h3>Niños: { serviceForm.count_children ?? '2'}</h3>
          </div>
          <div className="serviceResume-right">
            <Caption name={ `${babysitter.first_name} ${babysitter.last_name}` } />
          </div>
        </div>
        <h3>Lugar: { serviceForm.address ?? 'Primera Constitucion #325 Morelos 1'}</h3>
        <h3>Cuidados especiales</h3>
        <p>{ serviceForm.special_cares ?? 'Juan tiene problemas con el frio, por tanto mantenerlo muy abrigado'}</p>
        <button onClick={ handleClick } className="button-blue">Confirmar</button>
      </div>
    </div>
  );
};

ServiceResume.propTypes = {
  serviceForm: PropTypes.object.isRequired,
  babysitter: PropTypes.object.isRequired,
  registerService: PropTypes.func,
};

const mapStateToProps = (reducer) => {
  return {
    ...reducer.servicesReducer,
    ...reducer.babysittersReducer,
  };
};

const mapDispatchToProps = {
  registerService
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceResume);