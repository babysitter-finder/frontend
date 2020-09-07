import React from 'react';
import PropTypes from 'prop-types';
import Service from '../molecules/Service';

const ServiceList = ({ services }) => {
  return (
    <div className="serviceList">
      {services.map((service, index) => (
        <Service key={ index } />
      ))}
    </div>
  );
};

ServiceList.propTypes = {
  services: PropTypes.array.isRequired
}

export default ServiceList;