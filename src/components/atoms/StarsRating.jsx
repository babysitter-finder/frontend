import React, { useEffect } from 'react';

const StarsRating = () => {
  useEffect(() => {
    const starEls = document.querySelectorAll('.starRating.rating');

    starEls.forEach(star => {
      star.addEventListener('click', function (e) {
        let starEl = e.currentTarget;
        starEl.parentNode.setAttribute('data-stars', starEl.dataset.rating);
      });
    });

    return () => {
      starEls.forEach(star => {
        star.removeEventListener('click', function (e) {
          let starEl = e.currentTarget;
          starEl.parentNode.setAttribute('data-stars', starEl.dataset.rating);
        });
      });
    }
  }, [])
  return (
    <div className="starsRating" data-stars="1">
      <svg className="starRating rating" data-rating="1" width="25" height="23" viewBox="0 0 25 23" fill="#d8d8d8" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 1.61804L14.8309 8.7918L14.9432 9.13729H15.3064H22.8494L16.747 13.5709L16.4531 13.7844L16.5654 14.1299L18.8963 21.3037L12.7939 16.8701L12.5 16.6565L12.2061 16.8701L6.10374 21.3037L8.43464 14.1299L8.54689 13.7844L8.253 13.5709L2.15064 9.13729H9.69357H10.0568L10.1691 8.7918L12.5 1.61804Z" stroke="black" />
      </svg>
      <svg className="starRating rating" data-rating="2" width="25" height="23" viewBox="0 0 25 23" fill="#d8d8d8" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 1.61804L14.8309 8.7918L14.9432 9.13729H15.3064H22.8494L16.747 13.5709L16.4531 13.7844L16.5654 14.1299L18.8963 21.3037L12.7939 16.8701L12.5 16.6565L12.2061 16.8701L6.10374 21.3037L8.43464 14.1299L8.54689 13.7844L8.253 13.5709L2.15064 9.13729H9.69357H10.0568L10.1691 8.7918L12.5 1.61804Z" stroke="black" />
      </svg>
      <svg className="starRating rating" data-rating="3" width="25" height="23" viewBox="0 0 25 23" fill="#d8d8d8" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 1.61804L14.8309 8.7918L14.9432 9.13729H15.3064H22.8494L16.747 13.5709L16.4531 13.7844L16.5654 14.1299L18.8963 21.3037L12.7939 16.8701L12.5 16.6565L12.2061 16.8701L6.10374 21.3037L8.43464 14.1299L8.54689 13.7844L8.253 13.5709L2.15064 9.13729H9.69357H10.0568L10.1691 8.7918L12.5 1.61804Z" stroke="black" />
      </svg>
      <svg className="starRating rating" data-rating="4" width="25" height="23" viewBox="0 0 25 23" fill="#d8d8d8" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 1.61804L14.8309 8.7918L14.9432 9.13729H15.3064H22.8494L16.747 13.5709L16.4531 13.7844L16.5654 14.1299L18.8963 21.3037L12.7939 16.8701L12.5 16.6565L12.2061 16.8701L6.10374 21.3037L8.43464 14.1299L8.54689 13.7844L8.253 13.5709L2.15064 9.13729H9.69357H10.0568L10.1691 8.7918L12.5 1.61804Z" stroke="black" />
      </svg>
      <svg className="starRating rating" data-rating="5" width="25" height="23" viewBox="0 0 25 23" fill="#d8d8d8" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 1.61804L14.8309 8.7918L14.9432 9.13729H15.3064H22.8494L16.747 13.5709L16.4531 13.7844L16.5654 14.1299L18.8963 21.3037L12.7939 16.8701L12.5 16.6565L12.2061 16.8701L6.10374 21.3037L8.43464 14.1299L8.54689 13.7844L8.253 13.5709L2.15064 9.13729H9.69357H10.0568L10.1691 8.7918L12.5 1.61804Z" stroke="black" />
      </svg>
    </div>
  );
};

export default StarsRating;