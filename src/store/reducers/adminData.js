import {FETCH_ADMINDATA_PENDING, FETCH_ADMINDATA_SUCCESS, FETCH_ADMINDATA_FAILED, SET_USER_PERMISSION} from './actions';

export default function adminData(state = {}, action) {
  let newState = {...state};
  switch(action.type) {
    case FETCH_ADMINDATA_PENDING:
      newState.pending = true;
      return newState;
    case FETCH_ADMINDATA_SUCCESS:
      newState.success = true;
      newState.data = action.payload;
      return newState;
    case FETCH_ADMINDATA_FAILED:
      newState.data = action.payload;
      newState.error = true;
      return newState;
    case SET_USER_PERMISSION:
      newState.data.users[action.payload].active = !newState.data.users[action.payload].active;
      newState = JSON.parse(JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
}