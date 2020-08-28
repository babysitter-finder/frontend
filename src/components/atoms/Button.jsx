import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, className }) => (
  <button className={ className } type="button">{ text }</button>
);

Button.propTypes = {
  className: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default Button;
