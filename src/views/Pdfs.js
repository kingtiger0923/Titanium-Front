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
    "HR & Benefits": [], "Branding Guidelines": [], "Contests": [], "Implementation": [],
    "HelpDesk": [], "FAQ": []};
    for( const [index, val] of this.props.userData.pdfs.entries() ) {
      let trimName = val.fileName;
      if( trimName.length > 20 ) trimName = trimName.substr(0, 20) + '...';
      pdfListData[val.group].push(
        <div className="col-md-3 col-lg-3 col-sm-6 col-xs-12" key={index}>
          <div className="pdf-item">
      <div className="name">{val.group}</div>
            <div className="pdf"><Link to={"/pdfs/"+val.group+'-'+val.fileName}>{trimName}</Link></div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex overflow-hidden bg-gray-100 adminDash">
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none pt-5 text-black" tabIndex="0">
            <div className="pt-2 pb-6 md:py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                  <div className="row">
                    {pdfListData["Ordering"]}
                    {pdfListData["Sales Process"]}
                    {pdfListData["Products"]}
                    {pdfListData["HR & Benefits"]}
                    {pdfListData["Branding Guidelines"]}
                    {pdfListData["Contests"]}
                    {pdfListData["Implementation"]}
                    {pdfListData["HelpDesk"]}
                    {pdfListData["FAQ"]}
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