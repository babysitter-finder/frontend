import React, { useState } from 'react';
import { loginUser } from '../actions/usersActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Login = ({ error, loginUser }) => {
  const [ form, setValues ] = useState({
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
    loginUser(form)
  };

  return (
    <div className="login">
      <h2>Bienvenidos a Hi Sitter</h2>
      <form onSubmit={ handleSubmit }>
        <div className="input input-alignedLeft">
          <label htmlFor="email">Correo:</label>
          <input type="text" name="email" placeholder="Correo" onChange={ handleInput } />
        </div>
        <div className="input input-alignedLeft">
          <label htmlFor="password">Contraseña:</label>
          <input type="password" name="password" placeholder="Contraseña" onChange={ handleInput } />
        </div>
        <button className="button-green" type="submit">Ingresar</button>
        <strong>{ error }</strong>
      </form>
    </div>
  );
};

Login.propTypes = {
  error: PropTypes.string,
  loginUser: PropTypes.func,
};

const mapStateToProps = (reducers) => {
  return reducers.usersReducer;
};

const mapDispatchToProps = {
  loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);