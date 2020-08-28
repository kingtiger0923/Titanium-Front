import React from 'react';

class MessageItem extends React.Component {

  constructor(props) {
    super(props);

    this.deleteMessage = this.deleteMessage.bind(this);
  }

  n = (n) => {
    return n > 9 ? "" + n : "0" + n;
  }

  deleteMessage = (id) => {
    if( this.props.isAdmin )
      this.props.socket.emit('delete', id);
  }

  render() {
    let isAdmin = this.props.isAdmin;
    let id = this.props._id;
    let date = new Date(this.props.date);
    const timeStr = `${this.n(date.getHours())}:${this.n(date.getMinutes())}:${this.n(date.getSeconds())}`;
    const dateStr = `${date.getFullYear()}-${this.n(date.getMonth()+1)}-${this.n(date.getDate())}`;
    return (
      <div className="messageItem">
        { this.props.showDate && 
          <div className="date"> 
            <h3>{dateStr}</h3>
          </div>
        }
        <div className="msg-cont">
          <div className="avatar">
            <img 
              width="30"
              alt={`${this.props.first} ${this.props.last}`}
              title={`${this.props.first} ${this.props.last}`}
              src={"https://ui-avatars.com/api/?uppercase=true&color=ffffff&bold=true&rounded=true&background=5a95f5&name="+this.props.first+"+"+this.props.last} 
            />
          </div>
          <div className="message-text">
            {this.props.text}
          </div>
          <div className="time">
            {timeStr}
          </div>
          { isAdmin &&
            <div className="action-delete">
              <button className="btn btn-sm btn-noback" 
                type="button" data-toggle="tooltip" data-placement="top" 
                title="" data-original-title="Delete"
                onClick={() => this.deleteMessage(id)}>
                  <i className="fa fa-trash"></i>
              </button>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default MessageItem;