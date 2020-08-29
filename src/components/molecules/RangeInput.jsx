import React from 'react';
import PropTypes from 'prop-types';

const RangeInput = ({ kidsNumber }) => {
  return (
    <div className="rangeInput">
      <label htmlFor="">{ kidsNumber ? 'Numero de niños' : 'Edad' }</label>
      <input type="range" min="1" max="23" />
      <div>
        <p>{ kidsNumber ? '1' : '1 mes' }</p>
        <p>{ kidsNumber ? '5' : '12 años' }</p>
      </div>
    </div>
  );
};

RangeInput.propTypes = {
  kidsNumber: PropTypes.bool,
};

export default RangeInput;