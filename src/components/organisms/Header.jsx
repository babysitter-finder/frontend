import React from 'react';
import Logo from '../atoms/Logo'
import Menu from '../molecules/Menu';

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <Menu />
    </header>
  );
};

export default Header;