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
      <Link
      href="https://expo.dev/artifacts/eas/bbkDXvGtWrC1iuriVMhWbR.apk"
        className={Styles.dashboard_link}
      >
        DOWNLOAD THE MOBILE APP(APK)
      </Link>
    </div>
  );
};

export default HomePage;
