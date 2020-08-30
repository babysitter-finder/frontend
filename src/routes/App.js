import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import '../styles/main.scss';
import Layout from '../layouts/Layout';
import Login from '../containers/Login';

const App = () => {
  return (
    <Router history={ createBrowserHistory() }>
      <Layout>
        <Switch>
          <Route exact path="/" component={ Login } />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;