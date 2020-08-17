import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AdminSideBar from './components/AdminSideBar';
// import MdHidden from './components/MdHidden';


import fetchAdminData from '../../store/fetchAdminData';
import { POST } from '../../api/api';

class AdminLinks extends React.Component {
  constructor(props) {
    super(props);

    this.onLinkNameChange = this.onLinkNameChange.bind(this);
    this.onLinkPathChange = this.onLinkPathChange.bind(this);
    this.handleAddLink = this.handleAddLink.bind(this);

    this.state = {
      linkName: '',
      linkPath: ''
    }
  }

  onLinkNameChange(e) {
    this.setState({ linkName: e.target.value });
  }

  onLinkPathChange(e) {
    this.setState({ linkPath: e.target.value });
  }

  handleAddLink(e) {
    e.preventDefault();
    let linkName = this.state.linkName;
    let linkPath = this.state.linkPath;
    let url = process.env.REACT_APP_API_URL + '/addlinks';

    POST(url, {
      linkName,
      linkPath
    }).then(function(res) {
      console.log(res);
      if( res.data === 'success' ) {
        this.props.fetchAdminData();
      }
    }.bind(this));
  }

  render() {
    if( this.props.success !== true ) {
      return (
        <div className="lds-grid">
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
      )
    }

    const linkListData = [];
    for( const [index, val] of this.props.adminData.links.entries() ) {
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
        <AdminSideBar />
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none pt-5 text-black" tabIndex="0">
            <div className="pt-2 pb-6 md:py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Links</h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                  <form className="text-left">
                    <h3 className="text-center p-4">Add More Links</h3>
                    <div className="form-group">
                      <label htmlFor="linkname">Link Name</label>
                      <input 
                        type="text"
                        id="linkname"
                        className="form-control" 
                        placeholder="Enter Link Name" 
                        onChange={this.onLinkNameChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="linkpath">Link Path</label>
                      <input 
                        type="text"
                        id="linkpath"
                        className="form-control" 
                        placeholder="Enter Link Path" 
                        onChange={this.onLinkPathChange}
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-block"
                      onClick={this.handleAddLink}
                      disabled={this.state.linkName === '' || this.state.linkPath === ''}
                    >
                      Add
                    </button>
                  </form>
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
  fetchAdminData
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminLinks);