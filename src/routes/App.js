import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Button from '../components/atoms/Button';
import { createBrowserHistory } from 'history';
import '../styles/main.scss';

const App = () => {
  return (
    <Router history={ createBrowserHistory() }>
      <Switch>
        <Route exact path="/">
          <Button text="Type me" className="button-pink" />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;