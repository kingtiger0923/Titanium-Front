import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AdminSideBar from './components/AdminSideBar';
// import MdHidden from './components/MdHidden';


import fetchAdminData from '../../store/fetchAdminData';
import { fetchRemovePDF } from '../../store/fetchAdminData';
import axios from 'axios';

class AdminExcel extends React.Component {
  constructor(props) {
    super(props);

    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.fileFormData = this.fileFormData.bind(this);
    this.onFileChange = this.onFileChange.bind(this);

    this.state = {
      isUploading: false,
      uploadPercent: 0,
      selectedFile: null
    }
  }

  handleFileUpload(e) {
    e.preventDefault();
    console.log(this.state);
    if( !this.state.selectedFile ) return ;
    this.setState({...this.state, isUploading: true});
    let formData = new FormData();

    formData.append('file', this.state.selectedFile);

    let url = process.env.REACT_APP_API_URL + '/excelUpload';
    axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: function( progressEvent ) {
        let percent = parseInt( Math.round( (progressEvent.loaded * 100) / progressEvent.total ) );
        this.setState({...this.state, uploadPercent: percent});
      }.bind(this)
    }).then(function() {
      this.setState({...this.state, isUploading: false});
      this.props.fetchAdminData();
    }.bind(this)).catch(function() {
      this.setState({...this.state, isUploading: false});
      this.props.fetchAdminData();
    }.bind(this));
  }

  onFileChange(e) {
    this.setState({ selectedFile: e.target.files[0] });
  }

  onFileTypeChange(e) {
    this.setState({ pdfType: e.target.value });
  }

  onFileRemove(id) {
    this.props.fetchRemovePDF(id);
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
        <form>
          <h3 className="text-center p-4">Upload Your Excel File</h3>
          <div className="row">
            <div className="form-group text-center w-100">
              <label htmlFor="file-upload" className="custom-file-upload font-weight-bold mr-3">
                <i className="fa fa-file mr-2"></i> Select
              </label>
              {
                this.state.selectedFile !== null &&
                <label className="custom-file-upload">
                  {this.state.selectedFile.name}
                </label>
              }
              <input id="file-upload" type="file" accept=".xlsx" onChange={this.onFileChange}/>
            </div>
          </div>
          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            onClick={this.handleFileUpload}
          >
            Submit
          </button>
        </form>
      );
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
        <AdminSideBar />
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none pt-5 text-black" tabIndex="0">
            <div className="pt-2 pb-6 md:py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                  {this.fileFormData()}
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
  fetchRemovePDF
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminExcel);