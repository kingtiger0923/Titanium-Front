import {FETCH_ADMINDATA_PENDING, FETCH_ADMINDATA_SUCCESS, FETCH_ADMINDATA_FAILED} from './actions';

export default function adminData(state = {}, action) {
  let newState = {...state};
  switch(action.type) {
    case FETCH_ADMINDATA_PENDING:
      newState.adminData.pending = true;
      return newState;
    case FETCH_ADMINDATA_SUCCESS:
      newState.adminData.data = action.payload;
      return newState;
    case FETCH_ADMINDATA_FAILED:
      newState.adminData.data = action.payload;
      return newState;
    default:
      return state;
  }
}

export const getAdminDataPending = state => state.adminData.pending;
export const getAdminDataSuccess = state => state.adminData.success;
export const getAdminDataFailed = state => state.adminData.error;