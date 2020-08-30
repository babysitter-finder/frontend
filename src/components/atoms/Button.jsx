import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, className }) => (
  <button className={ className ?? 'button-blue' } type="button">{ text ?? 'Type me' }</button>
);

Button.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired
}

export default Button;
