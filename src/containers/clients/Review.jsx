import React from 'react';
import Caption from '../../components/molecules/Caption';
import StarsRating from '../../components/atoms/StarsRating';

const Review = () => {
  return (
    <div className="review">
      <div className="review-container">
        <Caption name="Johnatan Dude" />
        <h2>Califica a tu cliente</h2>
        <StarsRating />
        <div className="textArea">
          <label htmlFor="special_cares">¿Tienen algún cuidado especial tus hijos?</label>
          <textarea name="special_cares" id="special_cares" rows="10"></textarea>
        </div>
      </div>
    </div>
  );
};

export default Review;