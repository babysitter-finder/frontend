import React from 'react';
import PropTypes from 'prop-types';
import photo from '../../assets/girl.jpeg';

const Menu = ({ user }) => {
  return (
    <nav className="menu">
      <ul>
        { user ?
          <>
            <li><a href=""><h3>Registro</h3></a></li>
            <li><a href=""><h3>Iniciar sesión</h3></a></li>
          </>
          :
          <>
            <li><a href=""><h3>Encontrar niñera</h3></a></li>
            <li><a href=""><h3>Agenda</h3></a></li>
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