import React, { useEffect } from 'react';
import BabysitterList from '../../components/organisms/BabysitterList';
import BabysittersMap from '../../components/molecules/BabysittersMap';
import PropTypes from 'prop-types';
import { getBabysitters, getBabysittersLocation } from '../../actions/babysittersActions';
import { connect } from 'react-redux';

const Babysitters = ({ getBabysitters, getBabysittersLocation, babysitters, locations, loading }) => {
  useEffect(() => {
    const bringData = async () => {
      await getBabysitters();
      await getBabysittersLocation();
    };
    bringData();
  }, [])

  return (
    <div className="babysitters-container">
      <div className="title">
        <h1>Niñeras</h1>
      </div>
      <div className="babysittersLists-container">
        <BabysitterList babysitters={ babysitters } />
        {!loading && <BabysittersMap isMarkerShown locations={ locations } />}
      </div>
    </div>
  );
};

Babysitters.propTypes = {
  getBabysitters: PropTypes.func,
  getBabysittersLocation: PropTypes.func,
  babysitters: PropTypes.array,
  locations: PropTypes.array,
  loading: PropTypes.bool,
};

const mapStateToProps = (reducers) => {
  return reducers.babysittersReducer;
};

const mapDispatchToProps = {
  getBabysitters,
  getBabysittersLocation
};

export default connect(mapStateToProps, mapDispatchToProps)(Babysitters);