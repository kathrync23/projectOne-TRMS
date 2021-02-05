import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, Store } from 'redux';
import reducer, { AppState } from './reducer';
import { AppAction } from './actions';
import thunk from 'redux-thunk';

const store: Store<AppState, AppAction> = createStore(
  reducer,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
