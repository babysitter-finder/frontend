import React from 'react';
import ReactDom from 'react-dom';
import App from './routes/App';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import './styles/main.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers, /* All the reducers */
  {}, /* Initial state */
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDom.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('app')
);