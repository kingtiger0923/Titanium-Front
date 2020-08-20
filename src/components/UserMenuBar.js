import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function UserMenuBar() {

  const history = useHistory();

  const Logout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  }

  let location = window.location.href;
  let pdf = location.includes('/pdfs');
  let links = location.includes('/links');
  let inventory = location.includes('/inventory');
  let messages = location.includes('/messages');

  return (
    <div className="user-menu">
      <span><img className="" src="./../assets/Logo@2x.png" alt="Logo" /></span>
      <Link to="/pdfs" className={pdf?"selected":""}>PDF</Link>
      <Link to="/links" className={links?"selected":""}>Links</Link>
      <Link to="/inventory" className={inventory?"selected":""}>Inventory</Link>
      <Link to="/messages" className={messages?"selected":""}>Messages</Link>
      <Link to="#" onClick={Logout} className="logout">Logout</Link>
    </div>
  )
}

export default UserMenuBar;