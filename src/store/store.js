import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';

const middlewares = [thunk];

let initialState = {
  adminData: {
    pending: false,
    success: false,
    error: false,
    data: {}
  }
  // },
  // userData: {
  //   pending: false,
  //   success: false,
  //   error: false,
  //   data: {}
  // }
}

let store = createStore(reducer, initialState, applyMiddleware(...middlewares));

export default store;