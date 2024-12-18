import React from 'react';
import { Dropdown } from './Dropdown/Dropdown'
import { Courses } from './CoursesList/CoursesList';
import styles from "./pages.module.css"
import Styles from "./pages.module.css"

const Dashboard = () => {
  return (
    <>
    <div>
   
    <Dropdown/>
    <Courses/>
    </div>
   
    </>
  );
};

export default Dashboard;
