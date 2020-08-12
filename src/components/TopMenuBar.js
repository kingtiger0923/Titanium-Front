import React from 'react';

function Logo() {
  return (
    <div className="logo">
      <img alt="Logo" src="./assets/Logo@2x.png" />
    </div>
  );
}

function TopMenuBar() {
  return (
    <div className="top-menubar">
      <Logo />
    </div>
  );
}

export default TopMenuBar;
