import React from 'react';
import ServiceList from '../../components/organisms/ServiceList';

const Schedule = () => {
  return (
    <div className="schedule">
      <div className="schedule-container">
        <h1>Citas</h1>
        <ServiceList services={ [1, 2, 3, 4] } />
      </div>
    </div>
  );
};

export default Schedule;