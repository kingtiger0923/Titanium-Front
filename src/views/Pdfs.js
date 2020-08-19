import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchUserData from '../store/fetchUserData';
import { Link } from 'react-router-dom';

class PDFs extends React.Component {
  render() {
    if( this.props.success !== true ) {
      return (
        <div className="lds-grid">
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
      )
    }

    const pdfListData = {"Ordering":[], "Sales Process":[], "Products":[],
    "HR & Benefits": [], "Branding Guidelines": [], "Contests": [], "Implementation": []};
    for( const [index, val] of this.props.userData.pdfs.entries() ) {
      let trimName = val.fileName;
      if( trimName.length > 30 ) trimName = trimName.substr(0, 50) + '...';
      pdfListData[val.group].push(
        <div className="col-md-3 col-lg-3 col-sm-6 col-xs-12" key={index}>
          <div className="link-item">
            <div className="name">{trimName}</div>
            <div className="link"><Link to={"/pdfs/"+val.fileName}>See</Link></div>
          </div>
        </div>
      );
    }

    return (
      <div className="h-screen flex overflow-hidden bg-gray-100 adminDash">
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none pt-5 text-black" tabIndex="0">
            <div className="pt-2 pb-6 md:py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                  <div className="pdf-group-title">Ordering</div>
                  <div className="row">
                    {pdfListData["Ordering"]}
                  </div>
                  <div className="pdf-group-title">Sales Process</div>
                  <div className="row">
                    {pdfListData["Sales Process"]}
                  </div>
                  <div className="pdf-group-title">Products</div>
                  <div className="row">
                    {pdfListData["Products"]}
                  </div>
                  <div className="pdf-group-title">HR &amp; Benefits</div>
                  <div className="row">
                    {pdfListData["HR & Benefits"]}
                  </div>
                  <div className="pdf-group-title">Branding Guidelines</div>
                  <div className="row">
                    {pdfListData["Branding Guidelines"]}
                  </div>
                  <div className="pdf-group-title">Contests</div>
                  <div className="row">
                    {pdfListData["Contests"]}
                  </div>
                  <div className="pdf-group-title">Implementation</div>
                  <div className="row">
                    {pdfListData["Implementation"]}
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
)(PDFs);