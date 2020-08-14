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
      <Link to="/dashboard"><img className="" src="./assets/Logo@2x.png" alt="Logo" /></Link>
      <Link to="/dashboard">Dash Board</Link>
      <Link to="/pdfs">PDF</Link>
      <Link to="/links">Links</Link>
      <Link to="/messages">Messages</Link>
      <Link to="#" onClick={Logout} className="logout">Logout</Link>
    </div>
  )
}

export default UserMenuBar;