import React from 'react';
import _ from 'lodash';
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import { compose, withProps, lifecycle } from 'recompose';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import { connect } from 'react-redux';


const ServiceInput = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAeTBVGhPqkbeNcVh-sEXG5K_l4CBhzZCQ&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={ { height: `100%` } } />,
    containerElement: <div style={ { height: `400px`, 'width': `86%`, 'bordeRadius': `15px` } } />,
    mapElement: <div style={ { height: `100%`, width: `100%`, 'borderRadius': `15px` } } />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        center: {
          lat: 41.9, lng: -87.624
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const handlePlacesChanged = () => {
    props.onPlacesChanged();
    if (props.markers[0]?.position.lat()) {
      const lat = parseFloat(props.markers[0].position.lat().toFixed(6));
      const lng = parseFloat(props.markers[0].position.lng().toFixed(6));
      props.onChange(lat, lng);
    }
  };
  const handleInput = (event) => {
    props.onInputChange(event.target.name, event.target.value);
  }
  return (
    <div className="serviceInput">
      <GoogleMap
        ref={ props.onMapMounted }
        defaultZoom={ 15 }
        center={ { lat: parseFloat(props.user.lat), lng: parseFloat(props.user.long) } }
        onBoundsChanged={ props.onBoundsChanged }
      >
        <SearchBox
          ref={ props.onSearchBoxMounted }
          bounds={ props.bounds }
          controlPosition={ google.maps.ControlPosition.TOP_LEFT }
          onPlacesChanged={ handlePlacesChanged }
        >
          {props.isEditForm ?
            <input
              type="text"
              placeholder="Dirección completa"
              name="address"
              onChange={ handleInput }
              value={ props.address }
              style={ {
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                marginTop: `27px`,
                padding: `0 12px`,
                borderRadius: `10px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
              } }
            /> :
            <input
              type="text"
              placeholder="Dirección completa"
              name="address"
              onChange={ handleInput }
              style={ {
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                marginTop: `27px`,
                padding: `0 12px`,
                borderRadius: `10px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
              } }
            />
          }
        </SearchBox>
        {props.marker.lat && <Marker position={ { lat: parseFloat(props.marker.lat), lng: parseFloat(props.marker.lng) } } /> || props.markers.map((marker, index) => (
          <Marker key={ index } position={ marker.position } />
        ))}
      </GoogleMap>
    </div>
  )
});

const mapStateToProps = (reducer) => {
  return reducer.usersReducer
};

export default connect(mapStateToProps)(ServiceInput);