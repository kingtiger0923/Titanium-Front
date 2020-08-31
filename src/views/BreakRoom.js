import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchUserData from '../store/fetchUserData';
import socketIOClient from 'socket.io-client';
import { fetchNewMessage } from '../store/fetchAdminData';

class BreakRoom extends React.Component {
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
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none text-black" tabIndex="0">
            <div className="pt-2 pb-6 md:py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                  <div className="row">
                    <div className="padlet-embed">
                      <p style={{padding:'0',margin:'0'}}>
                        <iframe src="https://padlet.com/embed/llwf3xp9xw2sio16" frameborder="0" allow="camera;microphone;geolocation" title="Break Room">
                        </iframe>
                      </p>
                      <div style={{padding:'8px', textAlign:'right', margin:'0'}}>
                        <a href="https://padlet.com?ref=embed" 
                        style={{padding:'0',margin:'0',border:'none',display:'block',lineHeight:'1',height:'16px'}} target="_blank">
                          <img src="https://padlet.net/embeds/made_with_padlet.png" width="86" height="16" alt="Made with Padlet" />
                        </a>
                      </div>
                    </div>
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
)(BreakRoom);