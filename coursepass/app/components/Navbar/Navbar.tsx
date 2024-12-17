import React from 'react';
import styles from "./Navber.module.css";
import { FaSearch } from "react-icons/fa";

export const Navbar = () => {
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>CoursePass</div>
        <div className={styles.searchContainer}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search..."
          />
          <a href="#" className={styles.searchButton}>
            <FaSearch className={styles.searchIcon} />
          </a>
        </div>
        <ul className={styles.nav}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Login</a>
          </li>
          <li>
            <a href="#">SignUp</a>
          </li>
          <li>
            <a href="#">Profile</a>
          </li>
        </ul>
      </nav>
    </>
  );
};
