import React, { useEffect, useState } from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from 'react-google-maps';

const MapWithDirection = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAeTBVGhPqkbeNcVh-sEXG5K_l4CBhzZCQ&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={ { height: `100%` } } />,
    containerElement: <div style={ { height: `400px` } } />,
    mapElement: <div style={ { height: `100%`, borderRadius: '15px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' } } />,
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const [directions, setDirections] = useState({});

  useEffect(() => {
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route({
      origin: new google.maps.LatLng(props.origin.lat, props.origin.lng),
      destination: new google.maps.LatLng(props.destination.lat, props.destination.lng),
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        setDirections({
          directions: result,
        });
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  }, [])

  return (<GoogleMap
    defaultZoom={ 17 }
    defaultCenter={ new google.maps.LatLng(props.origin.lat, props.origin.lng) }
  >
    {directions.directions && <DirectionsRenderer directions={ directions.directions } />}
  </GoogleMap>)
});

export default MapWithDirection;