import React from 'react';
import photo from '../../assets/girl.jpeg';
import PropTypes from 'prop-types';

const Caption = ({ name, image }) => {
  return (
    <div className="caption">
      <img src={ image ?? photo } alt="Profile picture" />
      <h2>{ name ?? 'Jessica Ramirez' }</h2>
    </div>
  );
};

Caption.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string
}

export default Caption;