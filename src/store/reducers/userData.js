import {FETCH_USERDATA_PENDING, FETCH_USERDATA_SUCCESS, FETCH_USERDATA_FAILED} from './actions';

export default function userData(state = {}, action) {
  let newState = {...state};
  switch(action.type) {
    case FETCH_USERDATA_PENDING:
      newState.pending = true;
      return newState;
    case FETCH_USERDATA_SUCCESS:
      newState.success = true;
      newState.data = action.payload;
      return newState;
    case FETCH_USERDATA_FAILED:
      newState.data = action.payload;
      newState.error = true;
      return newState;
    default:
      return state;
  }
}