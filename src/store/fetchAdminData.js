import { POST } from '../api/api';
import { fetchAdminDataFailed, fetchAdminDataPending, fetchAdminDataSuccess, removeOneFile, changeInventory } from './reducers/actions';

function fetchAdminData() {
  return dispatch => {
    dispatch(fetchAdminDataPending());
    const url = process.env.REACT_APP_API_URL + '/adminData';
    const token = localStorage.token;
    POST(url, {
      token
    }).then(res => {
      if( res.data.code === 'Failed' ) {
        dispatch(fetchAdminDataFailed(res.data.message));
      } else {
        dispatch(fetchAdminDataSuccess(res.data));
      }
    }).catch(err => {
      dispatch(fetchAdminDataFailed(err));
    })
  };
}

export function fetchRemovePDF(id) {
  return dispatch => {
    
    const url = process.env.REACT_APP_API_URL + '/removepdf';
    const token = localStorage.token;
    POST(url, {
      token,
      id
    }).then(res => {
      if( res.data.code === 'Failed' ) {
      } else {
        dispatch(removeOneFile(id));
      }
    }).catch(err => {
    })
  }
}

export function fetchChangeInventory(id, val) {
  console.log("Herer", id, val);
  return dispatch => {
    const url = process.env.REACT_APP_API_URL + '/editInventory';
    POST(url, {
      id,
      val
    }).then(res => {
      if( res.data === "success" ) {
        dispatch(changeInventory(id, val));
      }
    }).catch(err => {
      //
    })
  }
}

export default fetchAdminData;