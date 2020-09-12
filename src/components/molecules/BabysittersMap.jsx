import React, { useState } from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { compose, withProps } from 'recompose';
import Caption from './Caption';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const BabysittersMap = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAeTBVGhPqkbeNcVh-sEXG5K_l4CBhzZCQ&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={ { height: `100%` } } />,
    containerElement: <div style={ { height: `100%` } } />,
    mapElement: <div style={ { height: `100%`, width: `100%`, borderTopRightRadius: `20px`, borderBottomRightRadius: `20px` } } />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const opens = {};
  for (let index = 0; index < props.babysitters.length; index++) {
    opens[index] = false;
  }
  const [ open, setOpen ] = useState(opens);

  const handleClick = (index) => {
    setOpen({
      ...open,
      [index]: !open[index]
    });
  }

  return (
    <div className="babysittersMap">
      <GoogleMap
        defaultZoom={ 15 }
        defaultCenter={ { lat: parseFloat(props.user.lat), lng: parseFloat(props.user.long) } }
      >
        {props.isMarkerShown && props.babysitters.map((babysitter, index) => (
          <Marker key={ index } position={ { lat: parseFloat(babysitter.lat), lng: parseFloat(babysitter.long) } } onClick={ () => handleClick(index) }>
            {open[index] && <InfoWindow onCloseClick={ () => handleClick(index) }>
              <Link to={ `/babysitter/${babysitter.username}` } style={ { textDecoration: 'none' } } >
                <Caption
                  size="small"
                  name={ `${babysitter.first_name} ${babysitter.last_name}` }
                  image={ babysitter?.picture }
                />
              </Link>
            </InfoWindow>}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  )
});

const mapStateToProps = (reducer) => {
  return reducer.usersReducer
}

export default connect(mapStateToProps)(BabysittersMap);