import React from 'react';
import s from "./Courses.module.css"

const DropdownButton = () => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget as HTMLElement;
    const nextSibling = target.nextElementSibling as HTMLElement;
    nextSibling.classList.toggle("show");
  };

  return (
    <button className={s.dropdownbtn} onClick={handleClick}>
      <a href="">
        <svg className={s.svg} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
          <path d="M480-72 170-240v-273L-19-618l499-273 500 273v366H874v-308l-84 47v273L480-72Zm0-394 280-152-280-151-279 151 279 152Zm0 273 204-110v-155L480-345.09 276-458v155l204 110Zm1-273Zm-1 113Zm0 0Z"/>
        </svg>
        <span>Department</span>
        <svg className={s.svg} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
        </svg>
      </a>
    </button>
  );
};

export default DropdownButton;