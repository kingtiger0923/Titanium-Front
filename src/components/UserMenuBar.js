import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function UserMenuBar() {

  const history = useHistory();

  const Logout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  }

  return (
    <div className="user-menu">
      <span><img className="" src="./assets/Logo@2x.png" alt="Logo" /></span>
      <Link to="/pdfs">PDF</Link>
      <Link to="/links">Links</Link>
      <Link to="/messages">Messages</Link>
      <Link to="#" onClick={Logout} className="logout">Logout</Link>
    </div>
  )
}

export default UserMenuBar;