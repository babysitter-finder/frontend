import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import '../styles/main.scss';
import Header from '../components/organisms/Header';
import PopupUserType from '../components/molecules/PopupUserType';

const App = () => {
  return (
    <Router history={ createBrowserHistory() }>
      <Switch>
        {/* <Header /> */}
        <Route exact path="/">
          <PopupUserType />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;