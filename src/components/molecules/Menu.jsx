import React from 'react';
import PropTypes from 'prop-types';
import photo from '../../assets/girl.jpeg';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/usersActions';

const Menu = ({ user, logoutUser }) => {
  const handleLogout = () => {
    logoutUser();
  };
  return (
    <nav className="menu">
      <ul>
        {(Object.keys(user).length > 0) ?
          <>
            <li><Link to="/"><h3>Encontrar niñera</h3></Link></li>
            <li><Link to="/schedule"><h3>Agenda</h3></Link></li>
            <li>
              <img src={ user?.picture || photo } alt="photo" />
              <ul className="menu-list">
                <li><Link to="/profile">Cuenta</Link></li>
                <li><a href="#logout" onClick={ handleLogout }>Cerrar sesión</a></li>
              </ul>
            </li>
          </>
          :
          <>
            <li><Link to="/register"><h3>Registro</h3></Link></li>
            <li><Link to="/"><h3>Iniciar sesión</h3></Link></li>
          </>
        }

      </ul>
    </nav>
  );
};

Menu.propTypes = {
  user: PropTypes.object,
  logoutUser: PropTypes.func,
};

const mapStateToProps = (reducers) => {
  return reducers.usersReducer;
};

const mapDispatchToProps = {
  logoutUser
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));