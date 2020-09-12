import React from 'react';
import Caption from '../../components/molecules/Caption';
import MapWithDirection from '../../components/molecules/MapWithDirection';

const ServiceWay = () => {
  return (
    <div className="serviceWay">
      <div className="serviceWay-container">
        <Caption name="Nathan Socorro" />
        <h3>Puedes contactar a este numero:</h3>
        <h3>4492688232</h3>
        <MapWithDirection />
        <button className="button-blue">He llegado</button>
      </div>
    </div>
  );
};

export default ServiceWay;