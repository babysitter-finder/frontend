import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import '../styles/main.scss';
import Header from '../components/organisms/Header';
import DialogTransparent from '../components/molecules/DialogTransparent';

const App = () => {
  return (
    <Router history={ createBrowserHistory() }>
      <Switch>
        {/* <Header /> */}
        <Route exact path="/">
          <DialogTransparent header="Bienvenido a Hi Sitter" buttonText="Comenzar" />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;