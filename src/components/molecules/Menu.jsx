import React from 'react';
import PropTypes from 'prop-types';
import photo from '../../assets/girl.jpeg';
import { Link } from 'react-router-dom';

const Menu = ({ user }) => {
  return (
    <nav className="menu">
      <ul>
        {Object.keys(user ?? {}) ?
          <>
            <li><Link to="/register"><h3>Registro</h3></Link></li>
            <li><Link to="/login"><h3>Iniciar sesión</h3></Link></li>
          </>
          :
          <>
            <li><Link to="/babysitters"><h3>Encontrar niñera</h3></Link></li>
            <li><Link to="/schedule"><h3>Agenda</h3></Link></li>
            <li><img src={ user?.image ?? photo } alt="" /></li>
          </>
        }

      </ul>
    </nav>
  );
};

Menu.propTypes = {
  user: PropTypes.object
}

export default Menu;