import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import '../styles/main.scss';
import Header from '../components/organisms/Header';
import Input from '../components/molecules/Input';

const App = () => {
  return (
    <Router history={ createBrowserHistory() }>
      <Switch>
        {/* <Header /> */}
        <Route exact path="/">
          <Input text="Fecha de nacimiento" type="datetime-local" />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;