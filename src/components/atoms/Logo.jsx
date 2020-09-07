import React from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/">
      <img src={ logo } alt="Logo" />
    </Link>
  );
};

export default Logo;