import React from 'react';
import { Link } from 'react-router-dom';
import photo from '../../assets/girl.jpeg';
import MapWithMarker from '../../components/molecules/MapWithMarker';

const ServiceDetails = () => {
  return (
    <div className="serviceDetails">
      <div className="serviceDetails-container">
        <h2>Perfil de Usuario</h2>
        <div className="profile-content">
          <div className="profile-divide">
            <div className="profile-imgContainer">
              <img src={ photo } alt="" />
            </div>
            <div className="profile-data">
              <h3>Nombre: Nathan Socorro</h3>
              <h3>Edad: 28</h3>
              <h3>Genero : Masculino</h3>
              <h3>Celular: 442678373</h3>
            </div>
          </div>
          <h3>Direccion: Primera Constitucion 325  Morelos Aguascalientes, Ags.</h3>
          <Link to="/service/1/way" className="button-blue">Estoy en camino</Link>
        </div>
      </div>
      <div className="serviceDetails-maps">
        <MapWithMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAeTBVGhPqkbeNcVh-sEXG5K_l4CBhzZCQ&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={ <div style={ { height: `100%` } } /> }
          containerElement={ <div style={ { height: `400px` } } /> }
          mapElement={ <div style={ { height: `100%`, borderRadius: '15px' } } /> }
        />
      </div>
    </div>
  );
};

export default ServiceDetails;