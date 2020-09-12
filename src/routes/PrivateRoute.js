import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const PrivateRoute = ({ children, user, babysitterComponent, ...rest }) => {
  return (
    <Route
      { ...rest }
      render={ ({ location }) =>
        (Object.keys(user).length > 0) ? (
          babysitterComponent ? (!user.user_bbs ? children : babysitterComponent()) : children
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
  user: PropTypes.object,
  babysitterComponent: PropTypes.func
}

const mapStateToProps = (reducer) => {
  return reducer.usersReducer;
};

export default connect(mapStateToProps)(PrivateRoute);