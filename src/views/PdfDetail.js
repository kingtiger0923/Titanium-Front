import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchUserData from '../store/fetchUserData';
import socketIOClient from 'socket.io-client';
import { fetchNewMessage } from '../store/fetchAdminData';
import { PDFReader } from 'reactjs-pdf-reader';

class Links extends React.Component {
  constructor(props) {
    super(props);

    this.onPdfReadCompleted = this.onPdfReadCompleted.bind(this);
    this.onPrevious = this.onPrevious.bind(this);
    this.onNext = this.onNext.bind(this);

    this.state = {
      currentPage: 1,
      totalPages: -1,
      socket: null
    };
  }

  onPdfReadCompleted(total) {
    this.setState({totalPages: total});
  }

  onPrevious() {
    if( this.state.currentPage === 1 ) return ;
    this.setState({currentPage: this.state.currentPage - 1});
  }

  onNext() {
    if( this.state.currentPage === this.state.totalPages ) return ;
    this.setState({currentPage: this.state.currentPage + 1});
  }

  render() {
    const url = process.env.REACT_APP_API_URL + '/public/' + this.props.match.params.name;

    if( this.props.success !== true || this.state.totalPages === -1 ) {
      return (
        <div>
          <div className="lds-grid">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
          </div>
          <PDFReader url={url} onDocumentComplete={this.onPdfReadCompleted}></PDFReader>
        </div>
      )
    }

    return (
      <div className="flex overflow-hidden bg-gray-100 adminDash">
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none pt-5 text-black" tabIndex="0">
            <div className="pt-2 pb-6 md:py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 font-weight-bold">
                {this.props.match.params.name}
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                  <PDFReader url={url} page={this.state.currentPage} onDocumentComplete={this.onPdfReadCompleted}></PDFReader>
                </div>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 font-weight-bold">
                <span className="btn btn-primary btn-pdf" onClick={this.onPrevious}>&laquo;</span>
                <span>{this.state.currentPage} / {this.state.totalPages}</span>
                <span className="btn btn-primary btn-pdf" onClick={this.onNext}>&raquo;</span>
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
)(Links);