import React, { useState } from 'react';
import photo from '../../assets/girl.jpeg';
import { Link } from 'react-router-dom';
import PopupDeleteUser from '../../components/molecules/PopupDeleteUser';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import differenceInYears from 'date-fns/differenceInYears';

const Profile = ({ user }) => {


  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const handleClose = () => {
    setIsOpenPopup(false);
  };

  const genres = {
    male: 'Masculino',
    female: 'Femenino'
  };

  return (
    <div className="profile">
      <div className="profile-container">
        <h2>Perfil de Usuario</h2>
        <div className="profile-content">
          <div className="profile-divide">
            <div className="profile-imgContainer">
              <img src={ user?.picture ?? photo } alt="" />
            </div>
            <div className="profile-data">
              <h3>Nombre: { `${user.first_name} ${user.last_name}` }</h3>
              <h3>Edad: { differenceInYears(Date.now(), new Date(user.birthdate)) ?? '28' }</h3>
              <h3>Genero: { genres[user.genre] ?? 'Masculino'}</h3>
              <h3>Celular: { user.phone_number ?? '442678373'}</h3>
            </div>
          </div>
          <h3>Direccion: { user.address ?? 'Primera, Constitucion 325  Morelos Aguascalientes, Ags.'}</h3>
          <div className="buttons">
            <button className="button-pink" onClick={ () => setIsOpenPopup(true) }>Eliminar cuenta</button>
            {isOpenPopup && <PopupDeleteUser closePopup={ handleClose } />}
            <Link to="/profile/edit" className="button-blue">Editar perfil</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (reducer) => {
  return reducer.usersReducer;
};

export default connect(mapStateToProps)(Profile);