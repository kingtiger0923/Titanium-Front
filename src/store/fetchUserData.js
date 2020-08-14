import { POST } from '../api/api';
import { fetchUserDataPending, fetchUserDataSuccess, fetchUserDataFailed } from './reducers/actions';

function fetchUserData() {
  return dispatch => {
    dispatch(fetchUserDataPending());
    const url = process.env.REACT_APP_API_URL + '/userData';
    const token = localStorage.token;
    POST(url, {
      token
    }).then(res => {
      if( res.data.code === 'Failed' ) {
        dispatch(fetchUserDataFailed(res.data.message));
      } else {
        dispatch(fetchUserDataSuccess(res.data));
      }
    }).catch(err => {
      dispatch(fetchUserDataFailed(err));
    })
  };
}

export default fetchUserData;