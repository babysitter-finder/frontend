import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import '../styles/main.scss';
import StarsRate from '../components/atoms/StarsRate';

const App = () => {
  return (
    <Router history={ createBrowserHistory() }>
      <Switch>
        <Route exact path="/">
          <StarsRate rate={ 2.4 } />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;