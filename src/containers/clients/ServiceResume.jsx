import React from 'react';
import Caption from '../../components/molecules/Caption';

const ServiceResume = () => {
  return (
    <div className="serviceResume">
      <div className="serviceResume-container">
        <h1>Resumen</h1>
        <div className="serviceResume-divide">
          <div className="serviceResume-left">
            <h3>Día: 12/08/2020</h3>
            <h3>Hora: 13:30PM</h3>
            <h3>Tiempo: 2 Horas</h3>
            <h3>Costo: 40$</h3>
            <h3>Niños: 2</h3>
          </div>
          <div className="serviceResume-right">
            <Caption />
          </div>
        </div>
        <h3>Lugar: Primera Constitucion #325 Morelos 1</h3>
        <h3>Cuidados especiales</h3>
        <p>Juan tiene problemas con el frio, por tanto mantenerlo muy abrigado</p>
        <button className="button-blue">Confirmar</button>
      </div>
    </div>
  );
};

export default ServiceResume;