import React from 'react';
import photo from '../../assets/girl.jpeg';
import StarsRate from '../../components/atoms/StarsRate';
import AvailabilityInput from '../../components/molecules/AvailabilityInput';
import { Link } from 'react-router-dom';

const BabysitterDetail = () => {
  return (
    <div className="babysitterDetail">
      <div className="babysitterDetail-container">
        <section className="babysitterDetail-details">
          <div className="image-container">
            <img src={ photo } alt="Profile picture" />
          </div>
          <div className="details-info">
            <h3>Jessica Ramirez</h3>
            <h3>Edad - 24</h3>
            <StarsRate rate="3.0" />
          </div>
        </section>
        <section className="babysitterDetail-about">
          <div className="about-container">
            <div className="textArea">
              <label htmlFor="about">Acerca de mí:</label>
              <textarea name="about" id="about" rows="10" disabled></textarea>
            </div>
            <div className="textArea">
              <label htmlFor="studies">Estudios:</label>
              <textarea name="studies" id="studies" rows="10" disabled></textarea>
            </div>
          </div>
          <div className="price">
            <h3>$120.00 / Hora</h3>
            <Link to="/service/new" type="button" className="button-highlight">Contratar</Link>
          </div>
        </section>
        <section className="babysitterDetail-availability">
          <div className="availability-container">
            <h4>Disponibilidad horaria</h4>
            <AvailabilityInput />
          </div>
        </section>
      </div>
    </div>
  );
};

export default BabysitterDetail;