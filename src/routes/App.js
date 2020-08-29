import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import '../styles/main.scss';
import Header from '../components/organisms/Header';
import PopupDeleteUser from '../components/molecules/PopupDeleteUser';

const App = () => {
  return (
    <Router history={ createBrowserHistory() }>
      <Switch>
        {/* <Header /> */}
        <Route exact path="/">
          <PopupDeleteUser />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;