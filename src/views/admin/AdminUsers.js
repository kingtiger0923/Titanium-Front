import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AdminSideBar from './components/AdminSideBar';
// import MdHidden from './components/MdHidden';
import fetchAdminData from '../../store/fetchAdminData';
import { getAdminDataPending, getAdminDataSuccess, getAdminDataFailed } from '../../store/reducers/adminData';


class AdminUsers extends React.Component {
  
  render() {
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
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                      </tr>
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
    console.log("err");
    fetchAdminData();
  }
}

const mapStateToProps = state => ({
  error: getAdminDataFailed(state),
  success: getAdminDataSuccess(state),
  pending: getAdminDataPending(state)
});

const mapDispatchToProps = dispatch => {
  return {
    fetchAdminData: () => dispatch(fetchAdminData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUsers);