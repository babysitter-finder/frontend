import React, { useState } from 'react';
import photo from '../../assets/girl.jpeg';
import { Link } from 'react-router-dom';
import PopupDeleteUser from '../../components/molecules/PopupDeleteUser';

const Profile = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const handleClose = () => {
    setIsOpenPopup(false);
  };

  return (
    <div className="profile">
      <div className="profile-container">
        <h2>Perfil de Usuario</h2>
        <div className="profile-content">
          <div className="profile-divide">
            <div className="profile-imgContainer">
              <img src={ photo } alt="" />
            </div>
            <div className="profile-data">
              <h3>Nombre: Nathan Socorro</h3>
              <h3>Edad: 28</h3>
              <h3>Genero: Masculino</h3>
              <h3>Celular: 442678373</h3>
            </div>
          </div>
          <h3>Direccion: Primera, Constitucion 325  Morelos Aguascalientes, Ags.</h3>
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

export default Profile;