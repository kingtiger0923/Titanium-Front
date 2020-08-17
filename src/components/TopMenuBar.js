import React from 'react';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <div className="logo">
      <Link to="/"><img alt="Logo" src="./assets/Logo@2x.png" /></Link>
    </div>
  );
}

function LoginAction() {
  return (
    <div className="action">
      <Link to="/login" className="login">Login</Link>
      <Link to="/join" className="logout">Sign Up</Link>
    </div>
  );
}

function TopMenuBar() {
  return (
    <div className="top-menubar">
      <Logo />
      <LoginAction />
    </div>
  );
}

export default TopMenuBar;
