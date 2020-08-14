import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class AdminSideBar extends React.Component {

  constructor(props) {
    super(props);
    this.Logout = this.Logout.bind(this);

    this.state={
      redirect: null
    }
  }

  Logout(){
    localStorage.removeItem('token');
    this.setState({redirect: '/login'});
  }

  render() {

    if( this.state.redirect ) {
      return (<Redirect to={this.state.redirect} />);
    }

    const splits = window.location.href.split('/');
    const key = splits[splits.length - 1];
    const selClass = 'group flex items-center px-2 py-2 text-sm leading-5 font-medium text-white rounded-md bg-indigo-900 focus:outline-none focus:bg-indigo-700 transition ease-in-out duration-150';
    const defClass = 'group flex items-center px-2 py-2 text-sm leading-5 font-medium text-indigo-300 rounded-md hover:text-white hover:bg-indigo-700 focus:outline-none focus:text-white focus:bg-indigo-700 transition ease-in-out duration-150'
    
    return (
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
          <div className="flex flex-col flex-grow bg-indigo-800 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img className="h-14 px-4 w-auto" src="./../assets/Logo@2x.png" alt="Logo" />
            </div>
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 bg-indigo-800">
                <Link to="/admin/dashboard" className={key==='dashboard'?selClass:defClass}>
                  <svg className="mr-3 h-6 w-6 text-indigo-400 group-focus:text-indigo-300 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Dashboard
                </Link>
                <Link to="/admin/users" className={'mt-1 ' + (key==='users'?selClass:defClass)}>
                  <svg className="mr-3 h-6 w-6 text-indigo-400 group-hover:text-indigo-300 group-focus:text-indigo-300 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Users
                </Link>
                <Link to="/admin/pdfs" className={'mt-1 ' + (key==='pdfs'?selClass:defClass)}>
                  <svg className="mr-3 h-6 w-6 text-indigo-400 group-hover:text-indigo-300 group-focus:text-indigo-300 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  PDFS
                </Link>
                <Link to="/admin/links" className={'mt-1 ' + (key==='links'?selClass:defClass)}>
                  <svg className="mr-3 h-6 w-6 text-indigo-400 group-hover:text-indigo-300 group-focus:text-indigo-300 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  Links
                </Link>
                <Link to="/admin/messages" className={'mt-1 ' + (key==='messages'?selClass:defClass)}>
                  <svg className="mr-3 h-6 w-6 text-indigo-400 group-hover:text-indigo-300 group-focus:text-indigo-300 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Messages
                </Link>
                <Link onClick={this.Logout} to="#" className={'mt-1 ' + (key==='logout'?selClass:defClass)}>
                  <svg className="mr-3 h-6 w-6 text-indigo-400 group-hover:text-indigo-300 group-focus:text-indigo-300 transition ease-in-out duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Logout
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminSideBar;