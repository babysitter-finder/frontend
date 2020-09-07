import React from 'react';
import photo from '../../assets/girl.jpeg';
import PropTypes from 'prop-types';
import StarsRate from '../atoms/StarsRate';
import { Link } from 'react-router-dom';

const BabysitterMiniCard = ({ babysitter }) => {
  const completeName = `${babysitter?.first_name ?? 'Jessica'} ${babysitter?.last_name ?? 'Jessica Ramirez'}`
  return (
    <Link to={ `/babysitter/${babysitter.username}` } className="babysitterMiniCard">
      <img src={ babysitter?.picture ?? photo } alt="" />
      <div className="babysitterMiniCard-info">
        <h4>{ completeName }</h4>
        <StarsRate rate={ parseFloat(babysitter?.reputation).toFixed(1) ?? 3.5 } />
      </div>
    </Link>
  );
};

BabysitterMiniCard.propTypes = {
  babysitter: PropTypes.object.isRequired
}

export default BabysitterMiniCard;