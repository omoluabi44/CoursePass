import React, { useRef, useState } from "react";
import s from "./Navber.module.css"; // Import your global styles



export const Navbar = () => {
  const [showSidebar, setShowSideBar] = useState(false)

const handleShowSidebar =()=>{
  setShowSideBar(true)
}
const handleHideSidebar =()=>{
  setShowSideBar(false)
}


  return (
    <>
      <nav className={s.navbar}>
     
      <ul className={`${s.sidebar} ${showSidebar ? s.visible : ""} `}>
          <li>
          <svg onClick={handleHideSidebar} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
          </li>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
         
          
         
        </ul>
        <ul >
          <li>
            <a href="#">CoursePass</a>
          </li>
          <li className={s.hideOnMobile}>
            <a href="#">Home</a>
          </li>
          <li className={s.hideOnMobile}>
            <a href="#">Contact</a>
          </li>
          <li className={s.hideOnMobile}>
            <a href="#">Contact</a>
          </li>
          <li className={s.menu}onClick={handleShowSidebar}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></li>
          
         
        </ul>
      </nav>
    </>
  );
};
