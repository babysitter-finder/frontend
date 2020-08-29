import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Select = ({ text, options, alignedLeft }) => {
  const selectClass = classNames(
    'select',
    { 'select-alignedLeft': alignedLeft }
  );
  return (
    <div className={ selectClass }>
      <label htmlFor={ `${text}` }>{`${text ?? 'texto' }:`}</label>
      <select name={ text }>
        <option>{ text ?? 'Selecciona una opción' }</option>
        {
          options.map(option => (
            <option key={ option } value={ option }>{ option }</option>
          ))
        }
      </select>
    </div>
  );
};

Select.propTypes = {
  text: PropTypes.string,
  options: PropTypes.array.isRequired,
  alignedLeft: PropTypes.bool
}

export default Select;