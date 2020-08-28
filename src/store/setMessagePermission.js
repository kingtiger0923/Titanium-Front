import { setMessagePermission } from './reducers/actions';
import { POST } from '../api/api';

var bSwitchingMe = false;

function setMessagePermissionfetch(idx, id) {
  return dispatch => {
    if( bSwitchingMe ) return ;
    bSwitchingMe = true;
    const url = process.env.REACT_APP_API_URL + '/changeMePermission';
    POST(url, {
      id
    }).then(res => {
      console.log("asdfasdfdsf" + res.data);
      if( res.data === "success" ) {
        dispatch(setMessagePermission(idx));
      }
      bSwitchingMe = false;
    }).catch(err => {
      bSwitchingMe = false;
    });
  };
}

export default setMessagePermissionfetch;