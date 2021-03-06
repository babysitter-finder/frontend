import React, { useState, useEffect } from 'react';
import { registerUser, updateUserData, closePopUp } from '../../actions/usersActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImageInput from '../../components/molecules/ImageInput';
import { Link, useLocation } from 'react-router-dom';
import picture from '../../assets/girl.jpeg';
import PopupWithoutCloseButton from '../../components/molecules/PopupWithoutCloseButton';

const PersonalInfoForm = ({ error, registerUser, user, updateUserData, popUp, closePopUp }) => {

  const editForm = useLocation().pathname === '/profile/edit';
  const [form, setValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    birthdate: '',
    phone_number: '',
    address: '',
    genre: '',
  });
  useEffect(() => {
    if (Object.keys(user ?? {}).length > 3 && editForm) {
      setValues(user);
    }

    return () => {
      setValues({});
      closePopUp();
    }
  }, [user])
  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (editForm) {
      updateUserData(form);
    } else {
      registerUser(form);
    }
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
              <input type="text" name="first_name" placeholder="Nombres" value={ form.first_name } onChange={ handleInput } />
            </div>
            <div className="input input-alignedLeft">
              <label htmlFor="last_name">Apellidos:</label>
              <input type="text" name="last_name" placeholder="Apellidos" value={ form.last_name } onChange={ handleInput } />
            </div>
            <div className="input input-alignedLeft">
              <label htmlFor="email">Correo:</label>
              <input type="text" name="email" placeholder="Correo" value={ form.email } onChange={ handleInput } />
            </div>
            {!editForm && <><div className="input input-alignedLeft">
              <label htmlFor="password">Contraseña:</label>
              <input type="password" name="password" placeholder="Contraseña" onChange={ handleInput } />
            </div>
            <div className="input input-alignedLeft">
              <label htmlFor="password_confirmation">Confirmar contraseña:</label>
              <input type="password" name="password_confirmation" placeholder="Contraseña" onChange={ handleInput } />
            </div></>}
            <div className="input input-alignedLeft">
              <label htmlFor="username">Nombre de usuario:</label>
              <input type="text" name="username" placeholder="Nombre de usuario" value={ form.username } onChange={ handleInput } />
            </div>
            <div className="input input-alignedLeft">
              <label htmlFor="birthdate">Fecha de nacimiento:</label>
              <input type="date" name="birthdate" placeholder="Fecha de nacimiento" value={ form.birthdate } onChange={ handleInput } />
            </div>
          </div>
          <div className="right">
            {editForm ?
              <ImageInput handleImage={ handleImage } imageValue={ form.picture || picture } /> :
              <ImageInput handleImage={ handleImage } />
            }
            <div className="input">
              <label htmlFor="phone_number">Celular:</label>
              <input type="number" name="phone_number" placeholder="Celular" value={ form.phone_number } onChange={ handleInput } />
            </div>
            <div className="select">
              <label htmlFor="genre">Género:</label>
              <select name="genre" onChange={ handleInput } value={ form.genre }>
                <option>Selecciona una opción</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
              </select>
            </div>
          </div>
          <div className="input">
            <label htmlFor="address">Dirección:</label>
            <input type="text" name="address" placeholder="Dirección" value={ form.address } onChange={ handleInput } />
          </div>
          <button className="button-blue" type="submit">{ editForm ? 'Guardar' : 'Registrar'}</button>
          <strong>{ error }</strong>
          {popUp &&
            <PopupWithoutCloseButton>
              <h2>Te hemos enviado un correo para finalizar tu inscripcion</h2>
              <Link className="button" to="/login">Continuar</Link>
            </PopupWithoutCloseButton>
          }
        </form>
      </div>
    </div>
  );
};

PersonalInfoForm.propTypes = {
  error: PropTypes.string,
  registerUser: PropTypes.func,
  updateUserData: PropTypes.func,
  closePopUp: PropTypes.func,
  user: PropTypes.object,
  popUp: PropTypes.bool,
};

const mapStateToProps = (reducers) => {
  return reducers.usersReducer;
};

const mapDispatchToProps = {
  registerUser,
  updateUserData,
  closePopUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfoForm);