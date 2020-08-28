import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const StarsRate = ({ rate }) => {
  const rateFixed = Math.floor(rate);
  const rateDecimals = rate.toFixed(1).toString().split('.')[1];
  const starsNumber = [1, 2, 3, 4, 5];
  console.log(rateFixed);
  useEffect(() => {
    const stars = document.querySelector('.starsRate');
    stars.setAttribute('data-stars', rateFixed);
  }, [])
  return (
    <div className="starsRate" data-stars={ rateFixed }>
      {
        starsNumber.map(number => (
          <svg key={ number} className="star rating" data-rating={ `${number}` } width="25" height="23" fill="#d8d8d8" viewBox="0 0 25 23" xmlns="http://www.w3.org/2000/svg">
            <linearGradient id="lg" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopOpacity="1" stopColor="#f0e26e" />
              <stop offset={ `${rateDecimals}0%` } stopOpacity="1" stopColor="#f0e26e" />
              <stop offset="40%" stopOpacity="1" stopColor="#d8d8d8" />
              <stop offset="100%" stopOpacity="1" stopColor="#d8d8d8" />
            </linearGradient>
            <path d="M12.5 1.61804L14.8309 8.7918L14.9432 9.13729H15.3064H22.8494L16.747 13.5709L16.4531 13.7844L16.5654 14.1299L18.8963 21.3037L12.7939 16.8701L12.5 16.6565L12.2061 16.8701L6.10374 21.3037L8.43464 14.1299L8.54689 13.7844L8.253 13.5709L2.15064 9.13729H9.69357H10.0568L10.1691 8.7918L12.5 1.61804Z" fill={ number === rateFixed + 1 ? 'url(#lg)' : '' } stroke="black" />
          </svg>
        ))
      }
    </div>
  );
};

StarsRate.propTypes = {
  rate: PropTypes.number.isRequired
}

export default StarsRate;