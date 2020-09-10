import React, { useEffect } from 'react';
import photo from '../../assets/girl.jpeg';
import StarsRate from '../../components/atoms/StarsRate';
import AvailabilityInput from '../../components/molecules/AvailabilityInput';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectBabysitter } from '../../actions/babysittersActions';
import differenceInYears from 'date-fns/differenceInYears';

const BabysitterDetail = ({ babysitter, selectBabysitter }) => {
  const { username } = useParams();
  const {
    first_name: firstName,
    last_name: lastName,
    picture,
    birthdate
  } = babysitter;
  useEffect(() => {
    selectBabysitter(username);
  }, []);
  
  const fullName = `${firstName} ${lastName}`;
  const aboutMeMock = 'hola mi nombre es maria he trabajado como niñera hace tres años me gusta interactuar mucho con ellos y ayudarlos a sentir cómodos ayudarles en lo que necesiten estoy disponible en la semana si quieres saber de mi por favor no dudes en contactarme';
  const educationDegreeMock = 'Ingenieria Industrial en el Instituto Tecnologico Nacional de México Concluido';
  return (
    <div className="babysitterDetail">
      <div className="babysitterDetail-container">
        <section className="babysitterDetail-details">
          <div className="image-container">
            <img src={ picture || photo } alt="Profile picture" />
          </div>
          <div className="details-info">
            <h3>{ fullName ?? 'Jessica Ramirez'}</h3>
            <h3>Edad - { differenceInYears(Date.now(), new Date(birthdate)) ?? '24'}</h3>
            <StarsRate rate={ babysitter?.reputation ?? '4.0' } />
          </div>
        </section>
        <section className="babysitterDetail-about">
          <div className="about-container">
            <div className="textArea">
              <label htmlFor="about">Acerca de mí:</label>
              <textarea name="about" id="about" rows="10" disabled value={ babysitter?.user_bbs?.about_me ?? aboutMeMock }></textarea>
            </div>
            <div className="textArea">
              <label htmlFor="studies">Estudios:</label>
              <textarea name="studies" id="studies" rows="10" disabled value={ babysitter?.user_bbs?.education_degree ?? educationDegreeMock }></textarea>
            </div>
          </div>
          <div className="price">
            <h3>${ babysitter?.user_bbs?.cost_of_service } / Hora</h3>
            <Link to="/service/new" type="button" className="button-highlight">Contratar</Link>
          </div>
        </section>
        <section className="babysitterDetail-availability">
          <div className="availability-container">
            <h4>Disponibilidad horaria</h4>
            <AvailabilityInput availabilities={ babysitter?.user_bbs?.availabilities ?? [] } />
          </div>
        </section>
      </div>
    </div>
  );
};

BabysitterDetail.propTypes = {
  babysitter: PropTypes.object,
  selectBabysitter: PropTypes.func.isRequired,
};

const mapStateToProps = (reducers) => {
  return reducers.babysittersReducer;
};

const mapDispatchToProps = {
  selectBabysitter,
};

export default connect(mapStateToProps, mapDispatchToProps)(BabysitterDetail);