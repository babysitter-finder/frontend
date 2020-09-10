import React, { useState, useEffect } from 'react';
import ServiceInput from '../../components/molecules/ServiceInput';
import { Link, useLocation, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { setServiceForm } from '../../actions/servicesActions';
import { selectBabysitter } from '../../actions/babysittersActions';
import PropTypes from 'prop-types';

const ServiceForm = ({ setServiceForm, babysitter, selectBabysitter }) => {
  const [marker, setMarker] = useState({});
  const { username } = useParams();
  
  useEffect(() => {
    if (Object.keys(babysitter).length === 0) {
      selectBabysitter(username);
    }
  }, []);
  const editForm = useLocation().pathname !== `/service/new/${username}`;

  const handleInput = (event) => {
    let { name, value } = event.target;
    if (name === 'count_children') {
      value = parseInt(value)
    }
    setServiceForm({
      [name]: value,
    });
  };

  const handleClick = (e) => {
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    });
    setServiceForm({
      lat: e.latLng.lat(),
    });
    setServiceForm({
      long: e.latLng.lng()
    });
  };
  
  return (
    <div className="serviceForm">
      <div className="serviceForm-container">
        <h1>{ editForm ? 'Editar Cita' : 'Solicitar cita' }</h1>
        <form>
          <div className="serviceForm-divide">
            <div className="left">
              <div className="input input-alignedLeft">
                <label htmlFor="date">Día:</label>
                <input type="date" name="date" placeholder="Día" onChange={ handleInput } />
              </div>
              <div className="input input-alignedLeft">
                <label htmlFor="count_children">Numero de niños:</label>
                <input type="number" name="count_children" placeholder="Numero de niños" min="1" max="10" onChange={ handleInput } />
              </div>
            </div>
            <div className="right">
              <div className="select">
                <label htmlFor="shift">Horario:</label>
                <select name="shift" onChange={ handleInput } defaultValue="">
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="morning">Mañana</option>
                  <option value="afternoon">Mediodía</option>
                  <option value="evening">Tarde</option>
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
            <label htmlFor="special_cares">¿Tienen algún cuidado especial tus hijos?</label>
            <textarea name="special_cares" id="special_cares" rows="10" onChange={ handleInput }></textarea>
          </div>
          <Link to={ editForm ? '' : '/service/resume' } className="button-blue">{editForm ? 'Guardar' : 'Registrar'}</Link>

          {/* <strong>{ error }</strong> */}
        </form>
      </div>
    </div>
  );
};

ServiceForm.propTypes = {
  setServiceForm: PropTypes.func,
  selectBabysitter: PropTypes.func,
  babysitter: PropTypes.object
};

const mapDispatchToProps = {
  setServiceForm,
  selectBabysitter
};

const mapStateToProps = (reducer) => {
  return reducer.babysittersReducer;
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceForm);