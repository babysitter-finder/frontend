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
import Review from '../containers/clients/Review';
import ServiceDetails from '../containers/babysitters/ServiceDetails';
import ServiceWay from '../containers/babysitters/ServiceWay';
import { getUserData } from '../actions/usersActions';
import PrivateRoute from './PrivateRoute';

const App = ({ getUserData }) => {
  useEffect(() => {
    (async() => await getUserData())()
  }, []);
  return (
    <Router history={ createBrowserHistory() }>
      <Layout>
        <Switch>
          <PrivateRoute exact path="/" babysitterComponent={ () => <Schedule /> } >
            <Babysitters />
          </PrivateRoute>
          <PrivateRoute exact path="/babysitter/:username" >
            <BabysitterDetail />
          </PrivateRoute>
          <PrivateRoute exact path="/service/new/:username" >
            <ServiceForm />
          </PrivateRoute>
          <PrivateRoute exact path="/service/resume" >
            <ServiceResume />
          </PrivateRoute>
          <PrivateRoute exact path="/service/:id/edit" >
            <ServiceForm />
          </PrivateRoute>
          <PrivateRoute exact path="/schedule" >
            <Schedule />
          </PrivateRoute>
          <PrivateRoute exact path="/profile" >
            <Profile />
          </PrivateRoute>
          <PrivateRoute exact path="/profile/edit" >
            <PersonalInfoForm />
          </PrivateRoute>
          <PrivateRoute exact path="/review/:id/" >
            <Review />
          </PrivateRoute>
          <PrivateRoute exact path="/service/:id/" >
            <ServiceDetails />
          </PrivateRoute>
          <PrivateRoute exact path="/service/:id/way" >
            <ServiceWay />
          </PrivateRoute>
          <Route exact path="/login" component={ Login } />
          <Route exact path="/emailSend" component={ Email } />
          <Route exact path="/landing" component={ Landing } />
          <Route exact path="/register" component={ PersonalInfoForm } />
        </Switch>
      </Layout>
    </Router>
  );
};

App.propTypes = {
  getUserData: PropTypes.func,
};

const mapDispatchToProps = {
  getUserData
};

export default connect(null, mapDispatchToProps)(App);
