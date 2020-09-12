import React, { useEffect } from 'react';
import BabysitterList from '../../components/organisms/BabysitterList';
import BabysittersMap from '../../components/molecules/BabysittersMap';
import PropTypes from 'prop-types';
import { getBabysitters } from '../../actions/babysittersActions';
import { connect } from 'react-redux';

const Babysitters = ({ getBabysitters, babysitters, loading, user }) => {
  useEffect(() => {
    (async () => {
      if (!user.user_bbs) {
        if(babysitters.length < 1) {
          getBabysitters();
        }
      }
    })();
  }, [])

  return (
    <div className="babysitters">
      <div className="babysitters-container">
        <div className="title">
          <h1>Niñeras</h1>
        </div>
        <div className="babysittersLists-container">
          <BabysitterList babysitters={ babysitters } />
          {!loading && <BabysittersMap isMarkerShown babysitters={ babysitters } />}
        </div>
      </div>
    </div>
  );
};

Babysitters.propTypes = {
  getBabysitters: PropTypes.func,
  babysitters: PropTypes.array,
  loading: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = (reducers) => {
  return {
    ...reducers.babysittersReducer,
    ...reducers.usersReducer,
  };
};

const mapDispatchToProps = {
  getBabysitters,
};

export default connect(mapStateToProps, mapDispatchToProps)(Babysitters);