import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import '../styles/main.scss';
import StarsRate from '../components/atoms/StarsRate';
import StarsRating from '../components/atoms/StarsRating';

const App = () => {
  return (
    <Router history={ createBrowserHistory() }>
      <Switch>
        <Route exact path="/">
          <StarsRating />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;