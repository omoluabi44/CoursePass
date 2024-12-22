'use client';
import React from 'react'
import s from "./Courses.module.css"
import Link from 'next/link'
import { useState } from 'react';
// import { Home } from '../home/page';


const Sidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  interface DropdownProps {
    dropdown: string;
  }

  const handleDropdownToggle = (dropdown: DropdownProps['dropdown']) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };
  return (
    <>

  <aside id={s.sidebar}>
    <ul>
     
      <li className={s.active}>
        <Link href="/dashboard"> 
        <svg  className={s.svg}xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>
          <span>Dashboard</span>
        
        </Link>
      </li>
      <li>
      <button className={s.dropdownbtn} onClick={() => handleDropdownToggle('courses')}>
        <div className={s.a}>
      <svg  className={s.svg} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M400-400h160v-80H400v80Zm0-120h320v-80H400v80Zm0-120h320v-80H400v80Zm-80 400q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/></svg>
        <span>Courses</span>
        <svg   className={`${s.svg} ${activeDropdown === 'courses' ? s.rotate : ''}`} 
         xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
        </div>
      </button>
      <ul className={`${s.submenu} ${activeDropdown === 'courses' ? s.show : ''}`}>
      <div className={s.div}>
        <li> <Link href='/'>Physics</Link></li>
        <li> <Link href='/'>Physics</Link></li>
        <li> <Link href='/'>Physics</Link></li>
        <li> <Link href='/'>Physics</Link></li>
        <li> <Link href='/'>Physics</Link></li>
        <li> <Link href='/'>Physics</Link></li>
        <li> <Link href='/'>Physics</Link></li>
        <li> <Link href='/'>Physics</Link></li>
        <li> <Link href='/'>Physics</Link></li>
        <li> <Link href='/'>Physics</Link></li>
        <li> <Link href='/'>Physics</Link></li>
        <li> <Link href='/'>Physics</Link></li>
        <li> <Link href='/'>Physics</Link></li>
        <li> <Link href='/'>Physics</Link></li>
        <li> <Link href='/'>Physics</Link></li>
        <li> <Link href='/'>Physics</Link></li>
      </div>

      </ul>
      </li>
     
      
      <li> 
      <a href="Assignment">
      <svg  className={s.svg} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm80-80h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm200-190q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-200v-560 560Z"/></svg>
          <span>Assignment</span>
        </a>
      </li>
      <li> 
      <a href="Past Questions"> 
      <svg  className={s.svg} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M560-360q17 0 29.5-12.5T602-402q0-17-12.5-29.5T560-444q-17 0-29.5 12.5T518-402q0 17 12.5 29.5T560-360Zm-30-128h60q0-29 6-42.5t28-35.5q30-30 40-48.5t10-43.5q0-45-31.5-73.5T560-760q-41 0-71.5 23T446-676l54 22q9-25 24.5-37.5T560-704q24 0 39 13.5t15 36.5q0 14-8 26.5T578-596q-33 29-40.5 45.5T530-488ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/></svg>
          <span>Past Questions</span>
        </a>
      </li>
      <li>
      <button className={s.dropdownbtn} onClick={() => handleDropdownToggle('department')}>
      <div className={s.a}>
      <svg className={s.svg} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-72 170-240v-273L-19-618l499-273 500 273v366H874v-308l-84 47v273L480-72Zm0-394 280-152-280-151-279 151 279 152Zm0 273 204-110v-155L480-345.09 276-458v155l204 110Zm1-273Zm-1 113Zm0 0Z"/></svg>
        <span>Department</span>
        <svg className={`${s.svg} ${activeDropdown === 'department' ? s.rotate : ''}`}
         xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
        </div>
      </button >
      <ul className={`${s.submenu} ${activeDropdown === 'department' ? s.show : ''}`}>
        <div className={s.div}>
        <li> <Link href='/courses'>Physics</Link></li>
      <li> <Link href='/'>Physics</Link></li>
      <li> <Link href='/'>Physics</Link></li>
      <li> <Link href='/'>Physics</Link></li>
        </div>
  
      </ul>
      </li>
      
      <li> 
      <a href="Chat with AI"> 
      <svg className={s.svg} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg>

          <span>Chat with AI</span>
        </a>
      </li>
    <li>
     
    </li>
    </ul>
  </aside>

    </>
  )
}

export default Sidebar;