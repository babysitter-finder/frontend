import React from 'react';
import PropTypes from 'prop-types';
import Background from '../../assets/background.jpg';
import '../../styles/animations/index.scss';
import { Link } from 'react-router-dom';

const DialogTransparent = ({ header }) => {
  
  return (
    <div className="containerLanding">
      <img src={ Background } />
      <div className="dialog-transparent fadeInUp">
        <h1>{ header ?? 'Bienvenido a Hi Sitter'}</h1>
        <Link to="/register" className="button-blue"> Comenzar</Link>
        
      </div>
    </div>
    
  );
};

DialogTransparent.propTypes = {
  header: PropTypes.string,
  buttonText: PropTypes.string,
}

export default DialogTransparent;