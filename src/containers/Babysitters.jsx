/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import BabysitterList from '../components/organisms/BabysitterList';
import BabysittersMap from '../components/molecules/BabysittersMap';
import PropTypes from 'prop-types';
import { getBabysitters } from '../actions/babysittersActions';
import { connect } from 'react-redux';

const Babysitters = ({ getBabysitters, babysitters }) => {

  useEffect(() => {
    getBabysitters();
  }, [])

  return (
    <div className="babysitters-container">
      <div className="title">
        <h1>Niñeras</h1>
      </div>
      <div className="babysittersLists-container">
        <BabysitterList babysitters={ babysitters } />
        <BabysittersMap isMarkerShown babysitters={ babysitters } />
      </div>
    </div>
  );
};

Babysitters.propTypes = {
  getBabysitters: PropTypes.func,
  babysitters: PropTypes.array
};

const mapStateToProps = (reducers) => {
  return reducers.babysittersReducer;
};

const mapDispatchToProps = {
  getBabysitters
};

export default connect(mapStateToProps, mapDispatchToProps)(Babysitters);