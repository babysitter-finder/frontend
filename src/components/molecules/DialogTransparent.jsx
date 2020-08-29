import React from 'react';
import Button from '../atoms/Button';
import PropTypes from 'prop-types';

const DialogTransparent = ({ header, buttonText }) => {
  return (
    <div className="dialog-transparent">
      <h1>{ header ?? 'Bienvenido a Hi Sitter'}</h1>
      <Button className="button-blue" text={ buttonText } />
    </div>
  );
};

DialogTransparent.propTypes = {
  header: PropTypes.string,
  buttonText: PropTypes.string,
}

export default DialogTransparent;