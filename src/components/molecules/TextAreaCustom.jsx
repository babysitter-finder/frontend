import React from 'react';
import PropTypes from 'prop-types';

const TextAreaCustom = ({ text, label }) => {
  return (
    <div className="textArea">
      <label htmlFor={ text }>{ `${label ?? 'text'}:` }</label>
      <textarea name={ text } id={ text } cols="30" rows="10"></textarea>
    </div>
  );
};

TextAreaCustom.propTypes = {
  text: PropTypes.string.isRequired
}

export default TextAreaCustom;