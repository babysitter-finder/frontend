import React from 'react';
import Header from '../components/organisms/Header';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      { children }
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired
}

export default Layout;