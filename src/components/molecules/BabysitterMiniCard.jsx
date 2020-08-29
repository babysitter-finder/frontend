import React from 'react';
import photo from '../../assets/girl.jpeg';
import PropTypes from 'prop-types';
import StarsRate from '../atoms/StarsRate';

const BabysitterMiniCard = ({ user }) => {
  return (
    <div className="babysitterMiniCard">
      <img src={ user?.image ?? photo } alt="" />
      <div className="babysitterMiniCard-info">
        <h4>{ user?.name ?? 'Jessica Ramirez' }</h4>
        <StarsRate rate={ user?.rate ?? 3.5 } />
      </div>
    </div>
  );
};

BabysitterMiniCard.propTypes = {
  user: PropTypes.object.isRequired
}

export default BabysitterMiniCard;