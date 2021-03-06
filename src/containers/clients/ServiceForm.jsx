import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { setServiceForm, getService, updateService } from '../../actions/servicesActions';
import { selectBabysitter } from '../../actions/babysittersActions';
import PropTypes from 'prop-types';

const ServiceForm = ({ babysitter, selectBabysitter, getService, editForm, updateService, setServiceForm }) => {
  const [form, setForm] = useState({
    date: '',
    count_children: '',
    shift: '',
    address: '',
    special_cares: '',
    lat: '',
    long: ''
  });
  let username = useParams().username;
  let id = useParams().id;
  const isEditForm = useLocation().pathname !== `/service/new/${username}`;
  

  useEffect(() => {
    if (Object.keys(babysitter).length === 0 && !isEditForm) {
      selectBabysitter(username);
    }
    if(id) {
      getService(id);
      if (editForm.shift) {
        setForm(editForm);
      }
    }
  }, [editForm.shift]);

  const handleInput = (event) => {
    let { name, value } = event.target;
    if (name === 'count_children') {
      value = parseInt(value)
    }
    setForm({
      ...form,
      [name]: value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateService(form, id);
  };

  const continueResume = () => {
    setServiceForm(form);
  };
  
  return (
    <div className="serviceForm">
      <div className="serviceForm-container">
        <h1>{ isEditForm ? 'Editar Cita' : 'Solicitar cita' }</h1>
        <form onSubmit={ handleSubmit }>
          <div className="serviceForm-divide">
            <div className="left">
              <div className="input input-alignedLeft">
                <label htmlFor="date">Día:</label>
                <input type="date" name="date" placeholder="Día" value={ form.date } onChange={ handleInput } />
              </div>
              <div className="input input-alignedLeft">
                <label htmlFor="count_children">Numero de niños:</label>
                <input type="number" name="count_children" placeholder="Numero de niños" min="1" max="10" value={ form.count_children } onChange={ handleInput } />
              </div>
            </div>
            <div className="right">
              <div className="select">
                <label htmlFor="shift">Horario:</label>
                <select name="shift" onChange={ handleInput } value={ form.shift }>
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="morning">Mañana</option>
                  <option value="afternoon">Mediodía</option>
                  <option value="evening">Tarde</option>
                  <option value="night">Noche</option>
                </select>
              </div>
            </div>
          </div>
          <div className="textArea">
            <label htmlFor="special_cares">¿Tienen algún cuidado especial tus hijos?</label>
            <textarea name="special_cares" value={ form.special_cares } id="special_cares" rows="10" onChange={ handleInput }></textarea>
          </div>
          {!isEditForm ?
            <Link onClick={ continueResume } to="/service/resume" className="button-blue">Registrar</Link> :
            <button type="submit" className="button-blue">Guardar</button>
          }

          {/* <strong>{ error }</strong> */}
        </form>
      </div>
    </div>
  );
};

ServiceForm.propTypes = {
  setServiceForm: PropTypes.func,
  selectBabysitter: PropTypes.func,
  getService: PropTypes.func,
  babysitter: PropTypes.object,
  editForm: PropTypes.object,
  updateService: PropTypes.func,
};

const mapDispatchToProps = {
  setServiceForm,
  selectBabysitter,
  getService,
  updateService,
};

const mapStateToProps = (reducer) => {
  return {
    ...reducer.babysittersReducer,
    ...reducer.servicesReducer
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceForm);