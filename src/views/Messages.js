import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import socketIOClient from 'socket.io-client';
import fetchUserData from '../store/fetchUserData';
import { fetchNewMessage, fetchReadMessage } from '../store/fetchAdminData';
import MessageItem from './../components/MessageItem';

class Messages extends React.Component {

  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
    this.txtChanged = this.txtChanged.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.userScrolled = this.userScrolled.bind(this);
    this.keydownHandler = this.keydownHandler.bind(this);

    this.state = {
      socket: null,
      bConnecting: false,
      bSending: false,
      txtMsg: "",
      msgList: [],
      allLoaded: false,
      isBottom: false,
    }
  }

  userScrolled = (evt) => {
    if( evt.target.scrollTop === 0 && !this.state.allLoaded ) {
      this.state.socket.emit('totop', this.state.msgList.length);
      this.setState({bConnecting: true});
    }
    if( evt.target.scrollTop + evt.target.clientHeight + 30 >= evt.target.scrollHeight ) {
      //this.state.socket.emit('read', this.props.userData.curUser._id);
      this.setState({isBottom: true});
      this.props.fetchReadMessage(this.props.userData.curUser.email);
    } else {
      this.setState({isBottom: false});
    }
  }

  scrollToBottom = () => {
    if( this.messagesEnd ) {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      this.setState({isBottom: true});
      this.props.fetchReadMessage(this.props.userData.curUser.email);
    }
  }

  sendMessage = () => {
    if( !this.props.userData.curUser.p_message ) {
      this.setState({msgList: [...this.state.msgList, {
        msg: "Message Permission Is not allowed for you now.",
        timestamp: new Date(),
        user: {
          first: this.props.userData.curUser.firstName,
          last: this.props.userData.curUser.lastName,
          email: this.props.userData.curUser.email
        }
      }]});
      return ;
    }
    if( !this.state.bConnecting && this.state.txtMsg.length > 0 ) {
      this.state.socket.emit('message', {
        msg: this.state.txtMsg,
        user: {
          first: this.props.userData.curUser.firstName,
          last: this.props.userData.curUser.lastName,
          email: this.props.userData.curUser.email
        }
      });
      this.setState({txtMsg: ""});
      document.getElementById("txtMsg").value = "";
    }
  }

  txtChanged = (e) => {
    this.setState({txtMsg: e.target.value});
  }

  render() {
    if( this.props.success !== true ) {
      return (
        <div className="lds-grid">
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
      )
    }

    let MsgListContent = [];
    let showDate = true;
    let prevDate = null;
    let index = 0;
    this.state.msgList.forEach(item => {
      if( prevDate !== null ) {
        const curDate = new Date(item.timestamp);
        if( prevDate.getFullYear() !== curDate.getFullYear() ||
            prevDate.getMonth() !== curDate.getMonth() ||
            prevDate.getDate() !== curDate.getDate() ) {
          showDate = true;
        } else {
          showDate = false;
        }
      }
      prevDate = new Date(item.timestamp);
      MsgListContent.push(
        <MessageItem key={index++} 
          first={item.user.first} 
          last={item.user.last} 
          date={item.timestamp} 
          showDate={showDate} 
          text={item.msg}
          isAdmin={false} 
          _id={item._id} />
      );
    });

    return (
      <div className="message-page">
        <div className="message-panel container">
          <div className="content" onScroll={this.userScrolled}>
            {
              this.state.bConnecting &&
              <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            }
            {MsgListContent}
            <div style={{ float:"left", clear: "both" }}
                ref={(el) => { this.messagesEnd = el; }}>
            </div>
          </div>
        </div>
        <div className="message-input container">
          <div className="input-group">
            <textarea id="txtMsg" className="form-control" aria-label="With textarea" onChange={this.txtChanged}></textarea>
            <div className="input-group-prepend">
              <span className="input-group-text px-4 noselect" onClick={this.sendMessage}>Send</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  keydownHandler(e){
    if(e.keyCode===13 && e.ctrlKey) this.sendMessage()
  }

  componentDidMount() {
    document.addEventListener('keydown',this.keydownHandler);
    let self = this;
    if( this.props.success !== true ) {
      this.props.fetchUserData();
    }
    // Init Socket
    this.setState({bConnecting: true});
    let interval = setInterval(function() {
      if( self.props.success !== true ) return;
      clearInterval(interval);
      if( !self.props.userData.curUser.p_message ) return ;
      self.state.socket = socketIOClient(process.env.REACT_APP_API_URL);
      self.state.socket.on('connect', function() {
        self.setState({bConnecting: false});

        self.state.socket.on("history", function(his) {
          self.setState({msgList: his});
          self.scrollToBottom();
        })

        self.state.socket.on("newhistory", function(his) {
          if( his === 'nodata' ) {
            self.setState({bConnecting: false});
            self.setState({allLoaded: true});
          } else {
            self.setState({msgList: his});
            self.setState({bConnecting: false});
          }
        })

        self.state.socket.on( 'message', function(msg) {
          self.setState({msgList: [...self.state.msgList, msg]});
          if( self.props.userData.curUser.email === msg.user.email ) {
            self.scrollToBottom();
          } else if( self.state.isBottom ) {
            self.scrollToBottom();
          } else {
            self.props.fetchNewMessage();
          }
        });
        
        self.state.socket.on('deleted', function(id) {
          self.setState({msgList: self.state.msgList.filter(el => el._id !== id)});
          setTimeout(() => {
            self.scrollToBottom();
          }, 100);
        });
      })
    }, 500);
  }

  componentWillUnmount(){
    document.removeEventListener('keydown',this.keydownHandler);
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
  fetchNewMessage,
  fetchReadMessage
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);