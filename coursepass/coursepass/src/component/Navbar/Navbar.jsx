import React from 'react';
import "./Navber.css"; // Import your global styles



export const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="logo">CoursePass</div>
        <div className="searchContainer">
          <input
            className="searchInput"
            type="text"
            placeholder="Search..."
          />
          <a href="#" className="searchButton">
          <svg  className="searchIcon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                 
          </a>
        </div>
        <ul className="nav">
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
