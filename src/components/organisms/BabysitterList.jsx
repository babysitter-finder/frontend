import React from 'react';
import BabysitterMiniCard from '../molecules/BabysitterMiniCard';
import PropTypes from 'prop-types';

const BabysitterList = ({ babysitters }) => {
  return (
    <div className="babysitterList">
      {
        babysitters.map(babysitter => (
          <BabysitterMiniCard key={ babysitter.username } babysitter={ babysitter } />
        ))
      }
    </div>
  );
};

BabysitterList.propTypes = {
  babysitters: PropTypes.array.isRequired,
}

export default BabysitterList;