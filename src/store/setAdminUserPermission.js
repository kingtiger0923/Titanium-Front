import { setUserPermission } from './reducers/actions';
import { POST } from '../api/api';

var bSwitching = false;

function setAdminUserPermission(idx, id) {
  return dispatch => {
    if( bSwitching ) return ;
    bSwitching = true;
    const url = process.env.REACT_APP_API_URL + '/changePermission';
    POST(url, {
      id
    }).then(res => {
      console.log(res.data);
      if( res.data === "success" ) {
        dispatch(setUserPermission(idx));
      }
      bSwitching = false;
    }).catch(err => {
      bSwitching = false;
    });
  };
}

export default setAdminUserPermission;