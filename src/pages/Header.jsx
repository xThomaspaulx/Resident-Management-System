import React, { useState } from 'react';
import logo from '../assets/enxcl.png'
import power from '../assets/Power.png'

const Header = () => {
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setShowLogoutConfirmation(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirmation(false);
    window.location.href = '/';
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  const linkStyle = {
    fontSize: 'medium',
    color: 'black',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  };

  return (
    <>
      <header style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',padding: '0.25% 1%',backgroundColor: '#FD8D36',}}>
        <img src={logo} alt="LOGO" height="50" />
        <nav style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <a href="/about" style={linkStyle}>ABOUT US</a>
          <a href="/contact" style={linkStyle}>CONTACT US</a>
          <a href="/" style={linkStyle} onClick={handleLogoutClick}>
            LOGOUT
            <img src={power} alt="switch" height={12} width={15} />
          </a>
        </nav>
      </header>

      {showLogoutConfirmation && (
        <div style={{position: 'fixed',top: 0, left: 0, right: 0, bottom: 0,backgroundColor: 'rgba(0, 0, 0, 0.5)',display: 'flex',justifyContent: 'center',alignItems: 'center'}}
        onClick={handleCancelLogout}>
          <div style={{backgroundColor: 'white',padding: '30px',borderRadius: '8px',boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',textAlign: 'center',minWidth: '300px',}}
          onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#333' }}>
              Confirm Logout
            </div>
            <div style={{ fontSize: '14px', marginBottom: '25px', color: '#666' }}>
              Are you sure you want to logout?
            </div>
            <div>
              <button style={{padding: '10px 20px',margin: '0 10px',border: 'none',borderRadius: '5px',cursor: 'pointer',fontSize: '14px',fontWeight: 'bold',backgroundColor: '#FD8D36',color: 'white'}}
                onClick={handleConfirmLogout}>
                Yes, Logout
              </button>
              <button style={{padding: '10px 20px',margin: '0 10px',border: 'none',borderRadius: '5px',cursor: 'pointer',fontSize: '14px',fontWeight: 'bold',backgroundColor: '#ccc',color: '#333',}}
                onClick={handleCancelLogout}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
