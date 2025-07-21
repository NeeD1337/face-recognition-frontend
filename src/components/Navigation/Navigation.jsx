import React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
        <p onClick={() => onRouteChange("signout")} className='nav-button'>Sign Out</p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
        <p onClick={() => onRouteChange("signin")} className='nav-button'>Sign In</p>
        <p onClick={() => onRouteChange("register")} className='nav-button'>Register</p>
      </nav>
    );
  }
};

export default Navigation;
