import { setInventoryPermission } from './reducers/actions';
import { POST } from '../api/api';

var bSwitchingIv = false;

function setInventoryPermissionfetch(idx, id) {
  return dispatch => {
    if( bSwitchingIv ) return ;
    bSwitchingIv = true;
    const url = process.env.REACT_APP_API_URL + '/changeIvPermission';
    POST(url, {
      id
    }).then(res => {
      console.log(res.data);
      if( res.data === "success" ) {
        dispatch(setInventoryPermission(idx));
      }
      bSwitchingIv = false;
    }).catch(err => {
      bSwitchingIv = false;
    });
  };
}

export default setInventoryPermissionfetch;