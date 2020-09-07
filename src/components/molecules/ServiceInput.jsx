import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import { compose, withProps } from 'recompose';


const ServiceInput = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAeTBVGhPqkbeNcVh-sEXG5K_l4CBhzZCQ&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={ { height: `100%` } } />,
    containerElement: <div style={ { height: `400px`, 'width': `86%`, 'bordeRadius': `15px` } } />,
    mapElement: <div style={ { height: `100%`, width: `100%`, 'borderRadius': `15px` } } />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {

  return (
    <div className="serviceInput">
      <GoogleMap
        defaultZoom={ 15 }
        defaultCenter={ { lat: -34.397, lng: 150.644 } }
        onClick={ props.onMapClick }
      >
        {props.isMarkerShown && <Marker position={ props.marker } />}
      </GoogleMap>
    </div>
  )
});

export default ServiceInput;