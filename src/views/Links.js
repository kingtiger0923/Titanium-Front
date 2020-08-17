import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchUserData from '../store/fetchUserData';

class Links extends React.Component {
  render() {
    if( this.props.success !== true ) {
      return (
        <div className="lds-grid">
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
      )
    }

    const linkListData = [];
    for( const [index, val] of this.props.userData.links.entries() ) {
      let trimlink = val.link;
      if( trimlink.length > 50 ) trimlink = trimlink.substr(0, 50) + '...';
      linkListData.push(
        <tr key={index}>
          <th scope='row'>{index}</th>
          <td>{val.name}</td>
          <td><a href={val.link} target="blank">{trimlink}</a></td>
        </tr>
      );
    }

    return (
      <div className="h-screen flex overflow-hidden bg-gray-100 adminDash">
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none pt-5 text-black" tabIndex="0">
            <div className="pt-2 pb-6 md:py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Links</h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Link Name</th>
                        <th scope="col">Link Path</th>
                      </tr>
                    </thead>
                    <tbody>
                      {linkListData}
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
      this.props.fetchUserData();
    }
  }
}

const mapStateToProps = state => ({
  error: state.userData.error,
  success: state.userData.success,
  pending: state.userData.pending,
  userData: state.userData.data
});


const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUserData
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Links);