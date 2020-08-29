import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ text }) => {
  return (
    <div className="textArea">
      <label htmlFor={ text }>{ `${text ?? 'text'}:` }</label>
      <textarea name={ text } id={ text } cols="30" rows="10"></textarea>
    </div>
  );
};

TextArea.propTypes = {
  text: PropTypes.string.isRequired
}

export default TextArea;