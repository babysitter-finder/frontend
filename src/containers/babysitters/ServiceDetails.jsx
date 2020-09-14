import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import photo from '../../assets/girl.jpeg';
import MapWithMarker from '../../components/molecules/MapWithMarker';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getService, startService, endService } from '../../actions/servicesActions';
import differenceInYears from 'date-fns/differenceInYears';

const ServiceDetails = ({ getService, editForm, user, startService, endService }) => {
  const { id } = useParams();
  useEffect(() => {
    getService(id);
  }, []);

  const genres = {
    male: 'Masculino',
    female: 'Femenino'
  };

  const shifts = {
    morning: 'Mañana',
    afternoon: 'Mediodía',
    evening: 'Tarde',
    night: 'Noche'
  };

  const handleStart = () => {
    startService(id);
  };
  
  const handleEnd = () => {
    endService(id);
  };

  return (
    <div className="serviceDetails">
      <div className="serviceDetails-container">
        <h2>Perfil de Usuario</h2>
        {user.user_bbs ? <div className="profile-content">
          <div className="profile-divide">
            <div className="profile-imgContainer">
              <img src={ editForm?.user_client?.picture ?? photo } alt="Profile picture" />
            </div>
            <div className="profile-data">
              <h3>Nombre: { editForm?.user_client?.fullname ?? 'Nathan Socorro'}</h3>
              <h3>Edad: { differenceInYears(Date.now(), new Date(editForm?.user_client?.birthdate)) ?? '28' }</h3>
              <h3>Genero : { genres[editForm?.user_client?.genre] ?? 'Masculino' }</h3>
              <h3>Celular: { editForm?.user_client?.phone_number ?? '442678373' }</h3>
              <h3>Día: { editForm?.date ?? '12-08-2020'}</h3>
              <h3>Horario: { shifts[editForm?.shift] ?? 'Tarde'}</h3>
              <h3>Niños: { editForm?.count_children ?? '1'}</h3>
              {editForm?.total_cost && <h3>Costo: ${ editForm?.total_cost ?? '150'}</h3>}
            </div>
          </div>
          <h3>Direccion: { editForm?.address ?? 'Primera Constitucion 325  Morelos Aguascalientes, Ags.'}</h3>
          <Link to="/service/1/way" className="button-blue">Estoy en camino</Link>
        </div> :
          <div className="profile-content">
            <div className="profile-divide">
              <div className="profile-imgContainer">
                <img src={ editForm?.user_bbs?.picture ?? photo } alt="Profile picture" />
              </div>
              <div className="profile-data">
                <h3>Nombre: {editForm?.user_bbs?.fullname ?? 'Nathan Socorro'}</h3>
                <h3>Edad: {differenceInYears(Date.now(), new Date(editForm?.user_bbs?.birthdate)) ?? '28'}</h3>
                <h3>Genero : {genres[editForm?.user_bbs?.genre] ?? 'Masculino'}</h3>
                <h3>Celular: {editForm?.user_bbs?.phone_number ?? '442678373'}</h3>
                <h3>Día: {editForm?.date ?? '12-08-2020'}</h3>
                <h3>Horario: {shifts[editForm?.shift] ?? 'Tarde'}</h3>
                <h3>Niños: {editForm?.count_children ?? '1'}</h3>
              </div>
            </div>
            <h3>Direccion: {editForm?.address ?? 'Primera Constitucion 325  Morelos Aguascalientes, Ags.'}</h3>
            {!editForm?.service_start && !editForm?.service_end && <button onClick={ handleStart } className="button-highlight">Inciar Servicio</button>}
            {editForm?.service_start && !editForm?.service_end && <button onClick={ handleEnd } className="button-pink">Terminar Servicio</button>}
          </div>
        }
      </div>
      {user.user_bbs && <div className="serviceDetails-maps">
        <MapWithMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAeTBVGhPqkbeNcVh-sEXG5K_l4CBhzZCQ&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={ <div style={ { height: `100%` } } /> }
          containerElement={ <div style={ { height: `400px` } } /> }
          mapElement={ <div style={ { height: `100%`, borderRadius: '15px' } } /> }
          location={ { lat: parseFloat(editForm?.lat), lng: parseFloat(editForm?.long) } }
        />
      </div>}
    </div>
  );
};

ServiceDetails.propTypes = {
  getService: PropTypes.func,
  startService: PropTypes.func,
  endService: PropTypes.func,
  editForm: PropTypes.object,
  user: PropTypes.object,
}

const mapDispatchToProps = {
  getService,
  startService,
  endService,
};

const mapStateToProps = (reducer) => {
  return {
    ...reducer.servicesReducer,
    ...reducer.usersReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceDetails);