import React, { useState } from 'react';
import ServiceInput from '../../components/molecules/ServiceInput';
import { Link, useLocation } from 'react-router-dom';

const ServiceForm = () => {
  const editForm = useLocation().pathname !== '/service/new';
  const [marker, setMarker] = useState({});
  const [form, setForm] = useState({});

  const handleSubmit = () => {

  }

  const handleInput = () => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = (e) => {
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    });
    setForm({
      ...form,
      location: {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
    })
  };
  
  return (
    <div className="serviceForm">
      <div className="serviceForm-container">
        <h1>{ editForm ? 'Editar Cita' : 'Solicitar cita' }</h1>
        <form onSubmit={ handleSubmit }>
          <div className="serviceForm-divide">
            <div className="left">
              <div className="input input-alignedLeft">
                <label htmlFor="day">Día:</label>
                <input type="date" name="day" placeholder="Día" onChange={ handleInput } />
              </div>
              <div className="input input-alignedLeft">
                <label htmlFor="count_children">Numero de niños:</label>
                <input type="number" name="count_children" placeholder="Numero de niños" min="1" onChange={ handleInput } />
              </div>
            </div>
            <div className="right">
              <div className="select">
                <label htmlFor="genre">Horario:</label>
                <select name="genre" onChange={ handleInput } defaultValue="">
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="morning">Mañana</option>
                  <option value="noon">Mediodía</option>
                  <option value="afternoon">Tarde</option>
                  <option value="night">Noche</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input inputMap">
            <label htmlFor="address">Lugar:</label>
            <input type="hidden" name="address" placeholder="Dirección" />
            <ServiceInput isMarkerShown={ Object.keys(marker).length > 0 } marker={ marker } onMapClick={ handleClick } />
          </div>
          <div className="textArea">
            <label htmlFor="about">¿Tienen algún cuidado especial tus hijos?</label>
            <textarea name="about" id="about" rows="10" onChange={ handleInput }></textarea>
          </div>
          <Link to={ editForm ? '' : '/service/resume' } className="button-blue">{editForm ? 'Guardar' : 'Registrar'}</Link>

          {/* <strong>{ error }</strong> */}
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;