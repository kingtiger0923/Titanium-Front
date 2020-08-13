import { POST } from '../api/api';
import { fetchAdminDataFailed, fetchAdminDataPending, fetchAdminDataSuccess } from './reducers/actions';

function fetchAdminData() {
  return dispatch => {
    dispatch(fetchAdminDataPending());
    const url = process.env.REACT_APP_API_URL + '/adminData';
    const token = localStorage.token;
    console.log(token);
    POST(url, {
      token
    }).then(res => {
      console.log(res);
      dispatch(fetchAdminDataSuccess());
    }).catch(err => {
      dispatch(fetchAdminDataFailed());
    })
  };
}

export default fetchAdminData;