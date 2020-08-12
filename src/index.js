import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';
import store from './store/store';
import './index.css';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Parent Element to render React Dom
const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  rootElement
);
