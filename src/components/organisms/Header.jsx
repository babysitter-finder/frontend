import React from 'react';
import Logo from '../atoms/Logo'
import Menu from '../molecules/Menu';
import classNames from 'classnames';
import PropTypes from 'prop-types';


const Header = ({ pink }) => {
  const headerClass = classNames({
    'header': true,
    'header-pink': pink
  });
  return (
    <header className={ headerClass }>
      <Logo />
      <Menu />
    </header>
  );
};

Header.propTypes = {
  pink: PropTypes.bool
};

export default Header;