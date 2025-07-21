import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt className='Tilt br2 shadow-2' style={{ height: 150, width: 150 }}>
        <div
          className='Tilt-inner pa3'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'           
          }}
        >
          <img alt="logo" src={brain} style={{ width: '80%' }} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
