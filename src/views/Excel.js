import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spreadsheet from "react-spreadsheet";

import fetchUserData from '../store/fetchUserData';
import socketIOClient from 'socket.io-client';
import { fetchNewMessage } from '../store/fetchAdminData';
import { POST } from '../api/api';

class Excel extends React.Component {
  constructor(props) {
    super(props);

    this.prevSheet = this.prevSheet.bind(this);
    this.nextSheet = this.nextSheet.bind(this);

    this.state = {
      socket: null,
      bLoading: true,
      sheets: null,
      sheetDatas: null,
      sheetIndex: 0
    }
  }

  RangeView = ({ cell, getValue }) => (
    <input
      type="range"
      value={getValue({ data: cell })}
      disabled
      style={{ pointerEvents: "none" }}
    />
  );
   
  RangeEdit = ({ getValue, cell, onChange }) => (
    <input
      type="range"
      onChange={e => {
        onChange({ ...cell, value: e.target.value });
      }}
      value={getValue({ data: cell }) || 0}
      autoFocus
    />
  );

  nextSheet = () => {
    if(this.state.sheets.length > this.state.sheetIndex + 1) {
      this.setState({sheetIndex: this.state.sheetIndex + 1});
    }
  }

  prevSheet = () => {
    if(this.state.sheetIndex >= 1) {
      this.setState({sheetIndex: this.state.sheetIndex - 1});
    }
  }

  render() {
    if( this.props.success !== true || this.state.bLoading === true ) {
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
                <Spreadsheet data={this.state.sheetDatas[this.state.sheetIndex]} />
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center">
              <span className="btn btn-primary sheetBtn" 
              onClick={this.prevSheet}>{"<<"}</span>
              <span> {this.state.sheets[this.state.sheetIndex]} </span>
              <span className="btn btn-primary sheetBtn"
              onClick={this.nextSheet}>{">>"}</span>
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
    this.setState({bLoading: true});
    let url = process.env.REACT_APP_API_URL + '/getExcelData';
    POST(url).then(res => {
      self.setState({sheets: res.data.sheets});
      let sheetDt = [];
      for( let i = 0; i < res.data.sheetDatas.length; i ++ ) {
        let dataOneSheet = [];
        for( let j = 0; j < res.data.sheetDatas[i].length; j ++ ) {
          let dataRow = [];
          for( let k = 0; k < res.data.sheetDatas[i][j].length; k ++ ) {
            dataRow.push({
              value: res.data.sheetDatas[i][j][k]
            });
          }
          dataOneSheet.push(dataRow);
        }
        sheetDt.push(dataOneSheet);
      }
      self.setState({sheetDatas: sheetDt});
      self.setState({bLoading: false});
    });
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
)(Excel);