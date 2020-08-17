

export const FETCH_ADMINDATA_PENDING = 'FETCH_ADMINDATA_PENDING';
export const FETCH_ADMINDATA_SUCCESS = 'FETCH_ADMINDATA_SUCCESS';
export const FETCH_ADMINDATA_FAILED  = 'FETCH_ADMINDATA_FAILED';

export const FETCH_USERDATA_PENDING = 'FETCH_USERDATA_PENDING';
export const FETCH_USERDATA_SUCCESS = 'FETCH_USERDATA_SUCCESS';
export const FETCH_USERDATA_FAILED  = 'FETCH_USERDATA_FAILED';

export const SET_USER_PERMISSION = 'SET_USER_PERMISSION';

export function setUserPermission(idx) {
  return {
    type: SET_USER_PERMISSION,
    payload: idx
  };
}

export function fetchAdminDataPending() {
  return {
    type: FETCH_ADMINDATA_PENDING
  };
}

export function fetchAdminDataSuccess(data) {
  return {
    type: FETCH_ADMINDATA_SUCCESS,
    payload: data
  };
}

export function fetchAdminDataFailed(error) {
  return {
    type: FETCH_ADMINDATA_FAILED,
    payload: error
  };
}

export function fetchUserDataPending() {
  return {
    type: FETCH_USERDATA_PENDING
  };
}

export function fetchUserDataSuccess(data) {
  return {
    type: FETCH_USERDATA_SUCCESS,
    payload: data
  };
}

export function fetchUserDataFailed(error) {
  return {
    type: FETCH_USERDATA_FAILED,
    payload: error
  };
}