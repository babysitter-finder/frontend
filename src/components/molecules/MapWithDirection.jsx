import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
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
    mapElement: <div style={{ height: `100%`, borderRadius: '15px', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' } } />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route({
        origin: new google.maps.LatLng(21.855558, -102.266615),
        destination: new google.maps.LatLng(21.853862, -102.260122),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={ 17 }
    defaultCenter={ new google.maps.LatLng(21.854436, -102.2653331) }
  >
    {props.directions && <DirectionsRenderer directions={ props.directions } />}
  </GoogleMap>
);

export default MapWithDirection;