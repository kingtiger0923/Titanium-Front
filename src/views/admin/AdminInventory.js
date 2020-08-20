import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AdminSideBar from './components/AdminSideBar';
// import MdHidden from './components/MdHidden';
import axios from 'axios';


import fetchAdminData from '../../store/fetchAdminData';
import { fetchChangeInventory } from '../../store/fetchAdminData';

class AdminLinks extends React.Component {
  constructor(props) {
    super(props);

    this.onInventoryPhotoChange = this.onInventoryPhotoChange.bind(this);
    this.onInventoryNameChange = this.onInventoryNameChange.bind(this);
    this.onInventoryCountChange = this.onInventoryCountChange.bind(this);
    this.handleAddInventory = this.handleAddInventory.bind(this);
    this.fileFormData = this.fileFormData.bind(this);

    this.state = {
      isUploading: false,
      uploadPercent: 0,
      inventoryName: '',
      inventoryCount: 0,
      inventoryImage: null,
      imgUrl: null
    }
  }

  setUploadingState(val) {
    this.setState({...this.state, isUploading: val});
  }

  onInventoryPhotoChange(e) {
    this.setState({ inventoryImage: e.target.files[0] });
    this.setState({ imgUrl: URL.createObjectURL(e.target.files[0]) });
  }

  onInventoryNameChange(e) {
    this.setState({ inventoryName: e.target.value });
  }

  onInventoryCountChange(e) {
    this.setState({ inventoryCount: parseInt(e.target.value) });
  }

  fileFormData() {
    if( this.state.isUploading ) {
      return (
        <div className="progress">
          <div className="progress-bar progress-bar-striped active" role="progressbar"
            aria-valuenow="" aria-valuemin="0" style={{width: this.state.uploadPercent+'%'}}
            aria-valuemax="100">
            {this.state.uploadPercent + '%'}
          </div>
        </div>
      ); 
    } else {
      return (
        <form className="text-left">
          <h3 className="text-center p-4">Add Products</h3>
          <div className="form-group text-center">
            <label htmlFor="inventoryImage" className="custom-file-upload">Select Photo</label>
            <input type="file"
              id="inventoryImage"
              className="form-control"
              placeholder="Select Image"
              onChange={this.onInventoryPhotoChange}
            />
            { this.state.imgUrl && <img src={this.state.imgUrl} className="inventory-img" alt="Inventory"/> }
          </div>
          <div className="form-group">
            <label htmlFor="inventoryName">Inventory Name</label>
            <input 
              type="text"
              id="inventoryName"
              className="form-control" 
              placeholder="Enter Inventory Name" 
              onChange={this.onInventoryNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inventoryCount">Inventory Count</label>
            <input 
              type="number"
              id="inventoryCount"
              className="form-control" 
              placeholder="Enter Initial Value" 
              value={this.state.inventoryCount}
              onChange={this.onInventoryCountChange}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            onClick={this.handleAddInventory}
            disabled={this.state.inventoryName === '' || this.state.inventoryImage === null}
          >
            Add
          </button>
        </form>
      );
    }
  }

  handleAddInventory(e) {
    e.preventDefault();
    let iName = this.state.inventoryName;
    let iCount = this.state.inventoryCount;
    let url = process.env.REACT_APP_API_URL + '/addInventory';

    this.setState({isUploading: true});

    let formData = new FormData();

    formData.append('file', this.state.inventoryImage);

    axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: { 
        iName,
        iCount
      },
      onUploadProgress: function( progressEvent ) {
        let percent = parseInt( Math.round( (progressEvent.loaded * 100) / progressEvent.total ) );
        this.setState({uploadPercent: percent});
      }.bind(this)
    }).then(function() {
      this.setState({...this.state, isUploading: false});
      this.props.fetchAdminData();
    }.bind(this)).catch(function() {
      this.setState({...this.state, isUploading: false});
      this.props.fetchAdminData();
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

    const inventoryListData = [];
    for( const [index, val] of this.props.adminData.inventory.entries() ) {
      inventoryListData.push(
        <tr key={index}>
          <th scope='row'><img className="iv-img-small" src={process.env.REACT_APP_API_URL + '/' + val.image} alt={val.name}/></th>
          <td>{val.name}</td>
          <td><input className="form-control" type="number" value={val.count} 
          onChange={(e) => this.props.fetchChangeInventory(val._id, e.target.value)}/></td>
        </tr>
      );
    }

    return (
      <div className="flex overflow-hidden bg-gray-100 adminDash">
        <AdminSideBar />
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none pt-5 text-black" tabIndex="0">
            <div className="pt-2 pb-6 md:py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                  {this.fileFormData()}
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Image</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Product Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventoryListData}
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
  fetchChangeInventory
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminLinks);