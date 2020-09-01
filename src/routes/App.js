import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import '../styles/main.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Layout from '../layouts/Layout';
import Login from '../containers/Login';
import Register from '../containers/Clients/Register';
import Email from '../containers/Email';
import Babysitters from '../containers/Clients/Babysitters';

const App = ({ user }) => {
  const isLogged = (Object.keys(user).length > 0);
  return (
    <Router history={ createBrowserHistory() }>
      <Layout isLogged={ isLogged }>
        <Switch>
          <Route exact path="/" component={ isLogged ? Babysitters : Login } />
          <Route exact path="/register" component={ isLogged ? Babysitters : Register } />
          <Route exact path="/email" component={ Email } />
        </Switch>
      </Layout>
    </Router>
  );
};

App.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (reducers) => {
  return reducers.usersReducer;
};

export default connect(mapStateToProps)(App);