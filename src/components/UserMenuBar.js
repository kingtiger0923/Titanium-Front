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
      <Link to="/pdfs" className={pdf?"selected ml-5 text-center pdf-menu":"pdf-menu ml-5 text-center"}>
        PDF
        <div className="subMenu">
          <div className="subMenuItem">
            <Link to="/pdfs/Ordering">Ordering</Link>
            <Link to="/pdfs/Sales Force">Sales Force</Link>
            <Link to="/pdfs/Products">Products</Link>
            <Link to="/pdfs/HR &amp; Benefits">HR &amp; Benefits</Link>
            <Link to="/pdfs/Branding Guidelines">Branding Guidelines</Link>
            <Link to="/pdfs/Contests">Contests</Link>
            <Link to="/pdfs/Implementation">Implementation</Link>
            <Link to="/pdfs/HelpDesk">HelpDesk</Link>
            <Link to="/pdfs/FAQ">FAQ</Link>
          </div>
        </div>
      </Link>
      <Link to="/links" className={links?"selected":""}>Links</Link>
      <Link to="/inventory" className={inventory?"selected":""}>Inventory</Link>
      <Link to="/messages" className={messages?"selected":""}>Messages</Link>
      <Link to="#" onClick={Logout} className="logout">Logout</Link>
    </div>
  )
}

export default UserMenuBar;