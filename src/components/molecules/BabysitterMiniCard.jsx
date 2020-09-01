import React from 'react';
import photo from '../../assets/girl.jpeg';
import PropTypes from 'prop-types';
import StarsRate from '../atoms/StarsRate';
import { Link } from 'react-router-dom';

const BabysitterMiniCard = ({ user }) => {
  return (
    <Link to={ `/user/${user.username}` } className="babysitterMiniCard">
      <img src={ user?.picture ?? photo } alt="" />
      <div className="babysitterMiniCard-info">
        <h4>{ user?.first_name ?? 'Jessica Ramirez' }</h4>
        <StarsRate rate={ parseFloat(user?.reputation) ?? 3.5 } />
      </div>
    </Link>
  );
};

BabysitterMiniCard.propTypes = {
  user: PropTypes.object.isRequired
}

export default BabysitterMiniCard;