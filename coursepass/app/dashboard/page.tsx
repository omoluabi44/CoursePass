import React from 'react';
import styles from './Dashboard.module.css'; // Import the styles

const Dashboard = () => {
  return (
    <>
    <div className={styles.container}>
      <div className={styles.dropDownItems}>
        <select className={styles.Items}> 
        <option value="">-- Select Department --</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Business Administration">Business Administration</option>
        </select>
        <select className={styles.Items}> 
        <option value="">-- Select Department --</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Business Administration">Business Administration</option>
        </select>
         <select className={styles.Items}> 
        <option value="">-- Select Department --</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Business Administration">Business Administration</option>
        </select>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
