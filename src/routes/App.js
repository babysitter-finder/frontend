import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import '../styles/main.scss';
import Layout from '../layouts/Layout';
import Login from '../containers/Login';
import Register from '../containers/Register';
import Email from '../containers/Email';
import Babysitters from '../containers/Babysitters';

const App = () => {
  return (
    <Router history={ createBrowserHistory() }>
      <Layout>
        <Switch>
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/email" component={ Email } />
          <Route exact path="/babysitter" component={ Babysitters } />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;