import React, { useState } from 'react';
import { registerUser } from '../../actions/usersActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImageInput from '../../components/molecules/ImageInput';
import { useLocation } from 'react-router-dom';

const PersonalInfoForm = ({ error, registerUser }) => {

  const editForm = useLocation().pathname === '/profile/edit';
  console.log(editForm);
  const [form, setValues] = useState({
    email: '',
  });
  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    registerUser(form);
  };

  const handleImage = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.files[0],
    });
  }

  return (
    <div className="personalInfoForm">
      <div className="personalInfoForm-container">
        <h2>{ editForm ? 'Editar perfil' : 'Registro de usuarios' }</h2>
        <form onSubmit={ handleSubmit }>
          <div className="left">
            <div className="input input-alignedLeft">
              <label htmlFor="first_name">Nombres:</label>
              <input type="text" name="first_name" placeholder="Nombres" onChange={ handleInput } />
            </div>
            <div className="input input-alignedLeft">
              <label htmlFor="last_name">Apellidos:</label>
              <input type="text" name="last_name" placeholder="Apellidos" onChange={ handleInput } />
            </div>
            <div className="input input-alignedLeft">
              <label htmlFor="email">Correo:</label>
              <input type="text" name="email" placeholder="Correo" onChange={ handleInput } />
            </div>
            <div className="input input-alignedLeft">
              <label htmlFor="password">Contraseña:</label>
              <input type="password" name="password" placeholder="Contraseña" onChange={ handleInput } />
            </div>
            <div className="input input-alignedLeft">
              <label htmlFor="password_confirmation">Confirmar contraseña:</label>
              <input type="password" name="password_confirmation" placeholder="Contraseña" onChange={ handleInput } />
            </div>
            <div className="input input-alignedLeft">
              <label htmlFor="username">Nombre de usuario:</label>
              <input type="text" name="username" placeholder="Nombre de usuario" onChange={ handleInput } />
            </div>
            <div className="input input-alignedLeft">
              <label htmlFor="birthdate">Fecha de nacimiento:</label>
              <input type="date" name="birthdate" placeholder="Fecha de nacimiento" onChange={ handleInput } />
            </div>
          </div>
          <div className="right">
            <ImageInput handleImage={ handleImage } />
            <div className="input">
              <label htmlFor="phone_number">Celular:</label>
              <input type="number" name="phone_number" placeholder="Celular" onChange={ handleInput } />
            </div>
            <div className="select">
              <label htmlFor="genre">Género:</label>
              <select name="genre" onChange={ handleInput }>
                <option>Selecciona una opción</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
              </select>
            </div>
          </div>
          <div className="input">
            <label htmlFor="address">Dirección:</label>
            <input type="text" name="address" placeholder="Dirección" onChange={ handleInput } />
          </div>
          <button className="button-blue" type="submit">{ editForm ? 'Guardar' : 'Registrar'}</button>
          
          <strong>{ error }</strong>
        </form>
      </div>
    </div>
  );
};

PersonalInfoForm.propTypes = {
  error: PropTypes.string,
  registerUser: PropTypes.func,
};

const mapStateToProps = (reducers) => {
  return reducers.usersReducer;
};

const mapDispatchToProps = {
  registerUser
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfoForm);