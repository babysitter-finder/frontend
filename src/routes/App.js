import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import '../styles/main.scss';
import Header from '../components/organisms/Header';
import AvailabilityInput from '../components/molecules/AvailabilityInput';

const App = () => {
  return (
    <Router history={ createBrowserHistory() }>
      <Switch>
        {/* <Header /> */}
        <Route exact path="/">
          <AvailabilityInput mini />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;