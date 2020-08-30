import React from 'react';
import ReactDom from 'react-dom';
import App from './routes/App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';

const store = createStore(
  reducers, /* Todos los reducers */
  {}, /* Estado inicial */
  applyMiddleware(reduxThunk)
);

ReactDom.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('app')
);