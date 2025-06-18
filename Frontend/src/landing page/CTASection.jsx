// src/components/CTASection.js
import React from 'react';
import { FaApple, FaAndroid, FaDownload } from 'react-icons/fa';

const CTASection = () => {
  const ctaSectionStyle = {
    padding: '50px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    textAlign: 'center',
  };
  
  const buttonContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '20px',
  };

  const ctaButtonStyle = {
    padding: '12px 24px',
    backgroundColor: 'white',
    color: '#007bff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    position: 'relative',
    minWidth: '160px',
    justifyContent: 'center',
  };

  const comingSoonStyle = {
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    backgroundColor: '#ff6b6b',
    color: 'white',
    borderRadius: '12px',
    padding: '3px 10px',
    fontSize: '12px',
    whiteSpace: 'nowrap',
  };

  return (
    <section style={ctaSectionStyle}>
      <h2>Ready to Ace Your Exams?</h2>
      <div style={buttonContainerStyle}>
        {/* iOS Button */}
        <button style={ctaButtonStyle}>
          <FaApple size={20} />
          <span>iOS</span>
          <span style={comingSoonStyle}>Coming Soon</span>
        </button>

        {/* Android Button */}
        <button style={ctaButtonStyle}>
          <FaAndroid size={20} />
          <span>Android</span>
          <span style={comingSoonStyle}>Coming Soon</span>
        </button>

        {/* APK Download Button */}
        <button style={ctaButtonStyle}>
          <FaDownload size={20} />
          <span>Download APK</span>
        </button>
      </div>
    </section>
  );
};

export default CTASection;