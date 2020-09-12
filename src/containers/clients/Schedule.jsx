import React from 'react';
import ServiceList from '../../components/organisms/ServiceList';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Schedule = ({ services }) => {
  return (
    <div className="schedule">
      <div className="schedule-container">
        <h1>Citas</h1>
        { services.length > 0 ? <ServiceList services={ services } /> : <h2>No tienes citas</h2>}
      </div>
    </div>
  );
};

Schedule.propTypes = {
  services: PropTypes.array
};

const mapStateToProps = (reducer) => {
  return reducer.servicesReducer
};

export default connect(mapStateToProps)(Schedule);