import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const PrivateRoute = ({ children, user, ...rest }) => {
  return (
    <Route
      { ...rest }
      render={ ({ location }) =>
        (Object.keys(user).length > 0) ? (
          children
        ) : (
          <Redirect
            to={ {
              pathname: '/login',
              state: { from: location }
            } }
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.element,
  user: PropTypes.object
}

const mapStateToProps = (reducer) => {
  return reducer.usersReducer;
};

export default connect(mapStateToProps)(PrivateRoute);