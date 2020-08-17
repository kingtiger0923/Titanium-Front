import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Switch from 'react-toggle-switch';
import "./../../../node_modules/react-toggle-switch/dist/css/switch.min.css" 

import AdminSideBar from './components/AdminSideBar';
// import MdHidden from './components/MdHidden';
import fetchAdminData from '../../store/fetchAdminData';
import setAdminUserPermission from "../../store/setAdminUserPermission";
import { Redirect } from 'react-router-dom';


class AdminUsers extends React.Component {

  constructor(props) {
    super(props);

    this.userPermissionChange = this.userPermissionChange.bind(this);
  }

  userPermissionChange(idx) {
    return function() {
      this.props.setAdminUserPermission(idx, this.props.adminData.users[idx]._id);
    }.bind(this);
  }

  render() {
    if( this.props.error ) {
      return (<Redirect to='/login' />);
    }
    if( this.props.success !== true ) {
      return (
        <div className="lds-grid">
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
      )
    }
    
    const userListData = [];
    for( const [index, val] of this.props.adminData.users.entries() ) {
      userListData.push(
        <tr key={index}>
          <th scope='row'>{index}</th>
          <td>{val.firstName}</td>
          <td>{val.lastName}</td>
          <td>{val.email}</td>
          <td>{val.admin?'YES':'NO'}</td>
          <td><Switch onClick={this.userPermissionChange(index)} on={val.active}></Switch></td>
        </tr>
      );
    }

    return (
      <div className="h-screen flex overflow-hidden bg-gray-100 adminDash">
        {/* <MdHidden /> */}
        <AdminSideBar />
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          {/* <div className="relative z-10 flex-shrink-0 flex h-16 bg-purple shadow">
            Admin Dashboard
          </div> */}

          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none pt-5 text-black" tabIndex="0">
            <div className="pt-2 pb-6 md:py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Admin</th>
                        <th scope="col">Active</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userListData}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  componentDidMount() {
    if( this.props.success !== true ) {
      this.props.fetchAdminData();
    }
  }
}

const mapStateToProps = state => ({
  error: state.adminData.error,
  success: state.adminData.success,
  pending: state.adminData.pending,
  adminData: state.adminData.data
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchAdminData,
  setAdminUserPermission
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUsers);