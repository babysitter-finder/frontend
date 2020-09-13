import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

const MapWithMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={ 15 }
    defaultCenter={ props.location }
  >
    <Marker
      position={ props.location }
    />
  </GoogleMap>
));

export default MapWithMarker;