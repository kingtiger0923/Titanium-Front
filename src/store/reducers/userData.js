import {FETCH_USERDATA_PENDING, FETCH_USERDATA_SUCCESS, FETCH_USERDATA_FAILED, READ_MESSAGE, NEW_MESSAGE} from './actions';

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
    case READ_MESSAGE:
      newState.data.curUser.unreadCount = 0;
      newState = JSON.parse(JSON.stringify(newState));
      return newState;
    case NEW_MESSAGE:
      if( newState.data.curUser.unreadCount === undefined )
        newState.data.curUser.unreadCount = 0;
      newState.data.curUser.unreadCount += 1;
      newState = JSON.parse(JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
}