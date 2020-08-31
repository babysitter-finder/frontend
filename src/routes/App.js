import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import '../styles/main.scss';
import Layout from '../layouts/Layout';
import Login from '../containers/Login';
import Register from '../containers/Register';
import Email from '../containers/Email';
import Landing from '../components/molecules/DialogTransparent';

const App = () => {
  return (
    <Router history={ createBrowserHistory() }>
      <Layout>
        <Switch>
          <Route exact path="/login" component={ Login } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/email" component={ Email } />
          <Route exact path="/" component={ Landing } />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;