import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import HelloWorld from '../components/HelloWord';
import { createBrowserHistory } from 'history';

const App = () => {
  return (
    <Router history={ createBrowserHistory() }>
      <Switch>
        <Route exact path="/" component={ HelloWorld } />
      </Switch>
    </Router>
  );
};

export default App;