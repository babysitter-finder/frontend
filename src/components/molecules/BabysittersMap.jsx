import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import { compose, withProps } from 'recompose'

const BabysittersMap = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAeTBVGhPqkbeNcVh-sEXG5K_l4CBhzZCQ&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={ { height: `100%` } } />,
    containerElement: <div style={ { height: `400px` } } />,
    mapElement: <div style={ { height: `100%`, width: `100%` } } />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <div className="babysittersMap">
    <GoogleMap
      defaultZoom={ 15 }
      defaultCenter={ { lat: 21.855556, lng: -102.266606 } }
    >
      {props.isMarkerShown && <Marker position={ { lat: 21.855556, lng: -102.266606 } } />}
    </GoogleMap>
  </div>
)

export default BabysittersMap;