import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Layout from '../layouts/Layout';
import Login from '../containers/Login';
import PersonalInfoForm from '../containers/clients/PersonalInfoForm';
import Email from '../containers/Email';
import Landing from '../components/molecules/DialogTransparent';
import Babysitters from '../containers/clients/Babysitters';
import BabysitterDetail from '../containers/clients/BabysitterDetail';
import ServiceForm from '../containers/clients/ServiceForm';
import ServiceResume from '../containers/clients/ServiceResume';
import Schedule from '../containers/clients/Schedule';
import Profile from '../containers/clients/Profile';
import { getUserData } from '../actions/usersActions';

const App = ({ user, getUserData }) => {
  const isLogged = (Object.keys(user).length > 0);
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Router history={ createBrowserHistory() }>
      <Layout isLogged={ isLogged }>
        <Switch>
          <Route exact path="/" component={ isLogged ? Babysitters : Login } />
          <Route exact path="/email" component={ Email } />
          <Route exact path="/landing" component={ Landing } />
          <Route exact path="/register" component={ isLogged ? Babysitters : PersonalInfoForm } />
          <Route exact path="/babysitter/:username" component={ isLogged ? BabysitterDetail : Login } />
          <Route exact path="/service/new" component={ isLogged ? ServiceForm : Login } />
          <Route exact path="/service/resume" component={ isLogged ? ServiceResume : Login } />
          <Route exact path="/service/:id/edit" component={ isLogged ? ServiceForm : Login } />
          <Route exact path="/schedule" component={ isLogged ? Schedule : Login } />
          <Route exact path="/profile" component={ isLogged ? Profile : Login } />
          <Route exact path="/profile/edit" component={ isLogged ? PersonalInfoForm : Login } />
        </Switch>
      </Layout>
    </Router>
  );
};

App.propTypes = {
  user: PropTypes.object,
  getUserData: PropTypes.func,
};

const mapStateToProps = (reducers) => {
  return reducers.usersReducer;
};

const mapDispatchToProps = {
  getUserData
};

export default connect(mapStateToProps, mapDispatchToProps)(App);