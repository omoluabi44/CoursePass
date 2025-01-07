import React from 'react';
import "./Navber.css"; // Import your global styles



export const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <div className="logo">CoursePass</div>
        
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
