import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchUserData from '../store/fetchUserData';
import socketIOClient from 'socket.io-client';
import { fetchNewMessage } from '../store/fetchAdminData';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: null
    }
  }
  render() {
    if( this.props.success !== true ) {
      return (
        <div className="lds-grid">
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
      )
    }
    return (
      <div className="flex overflow-hidden bg-gray-100 adminDash">
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none pt-5 text-black" tabIndex="0">
            <div className="pt-2 pb-6 md:py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                  <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
                    DashBoard is Coming Soon!
                  </div>
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
    let self = this;
    let interval = setInterval(function() {
      if( self.props.success !== true ) return;
      clearInterval(interval);
      if( !self.props.userData.curUser.p_message ) return ;
      self.state.socket = socketIOClient(process.env.REACT_APP_API_URL);
      self.state.socket.on('connect', function() {
        self.state.socket.on( 'message', function(msg) {
          self.props.fetchNewMessage();
        });
        
      })
    }, 500);
  }
  componentWillUnmount(){
    if( this.state.socket )
      this.state.socket.close();
  }
}

const mapStateToProps = state => ({
  error: state.userData.error,
  success: state.userData.success,
  pending: state.userData.pending,
  userData: state.userData.data
});


const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUserData,
  fetchNewMessage
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);