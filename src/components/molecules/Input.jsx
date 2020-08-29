import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Input = ({ text, type, alignedLeft }) => {
  const inputClass = classNames(
    'input',
    { 'input-alignedLeft': alignedLeft }
  );
  return (
    <div className={ inputClass }>
      <label htmlFor={ `${text}` }>{ `${text}:` ?? 'texto:'}</label>
      <input className="input" type={ type ?? 'text' } placeholder={ `${text}` ?? 'text' } />
    </div>
  );
};

Input.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  alignedLeft: PropTypes.bool
}

export default Input;