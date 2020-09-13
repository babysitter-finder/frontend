import React from 'react';
import photo from '../../assets/girl.jpeg';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Caption = ({ name, image, size }) => {
  const captionClass = classNames({
    'caption': true,
    [`caption-${size}`]: size
  })
  return (
    <div className={ captionClass }>
      <div className="caption-imgContainer">
        <img src={ image ?? photo } alt="Profile picture" />
      </div>
      <h2>{ name ?? 'Jessica Ramirez' }</h2>
    </div>
  );
};

Caption.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  size: PropTypes.string
}

export default Caption;