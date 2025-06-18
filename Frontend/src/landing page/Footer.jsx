// src/components/Footer.js
import React from 'react';

const Footer = () => {
  const footerStyle = {
    padding: '20px',
    backgroundColor: '#333',
    color: 'white',
    textAlign: 'center',
  };
  const footerLinksStyle = {
    marginBottom: '10px',
  };
  const linkStyle = {
    color: 'white',
    margin: '0 10px',
    textDecoration: 'none',
  };

  return (
    <footer style={footerStyle}>
      <div style={footerLinksStyle}>
        <a href="#" style={linkStyle}>About</a>
        <a href="#" style={linkStyle}>Contact</a>
        <a href="#" style={linkStyle}>Blog</a>
        <a href="#" style={linkStyle}>Terms & Privacy</a>
      </div>
      <div style={footerLinksStyle}>
        <a href="#" style={linkStyle}>Facebook</a>
        <a href="#" style={linkStyle}>Twitter</a>
      </div>
      <div style={footerLinksStyle}>
        <a href="#" style={linkStyle}>Google Play</a>
        <a href="#" style={linkStyle}>App Store</a>
      </div>
    </footer>
  );
};

export default Footer;