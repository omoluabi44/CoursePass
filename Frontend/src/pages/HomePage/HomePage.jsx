import React from 'react';
import {Link} from 'react-router-dom';
import Styles from "./HomePage.module.css";

const HomePage = () => {
  const handleDashboardClick = () => {
    console.log('Dashboard button clicked');
    // Additional logic can be added here if needed
  };

  return (
    <div className={Styles.homepage_container}>
      <h1 className={Styles.homepage_heading}>Access Your Dashboard</h1>
      <Link
        to="/dashboard"
        onClick={handleDashboardClick}
        className={Styles.dashboard_link}
      >
        Go to Dashboard
      </Link>

      <div>
        <h2 className={Styles.homepage_heading} >Download the mobile app(APK)!</h2>
        <p style={{color: "blue"}}>
          enjoy the full feature by download the apk
        </p>
        <a
          className="crypto-airdrop-btn"
          href="https://expo.dev/artifacts/eas/bbkDXvGtWrC1iuriVMhWbR.apk"  // Replace with your URL
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGift size={24} style={{marginRight: "8px"}} />
          Join Now
        </a>
      </div>
    </div>
  );
};

export default HomePage;
