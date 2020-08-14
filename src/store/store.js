import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';

const middlewares = [thunk];

let initialState = {
  adminData: {
    pending: false,
    success: false,
    error: false,
    data: {}
  },
  userData: {
    pending: false,
    success: false,
    error: false,
    data: {}
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares)
));

export default store;