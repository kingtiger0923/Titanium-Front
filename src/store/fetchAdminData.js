import { POST } from '../api/api';
import { fetchAdminDataFailed, fetchAdminDataPending, fetchAdminDataSuccess } from './reducers/actions';

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

export default fetchAdminData;