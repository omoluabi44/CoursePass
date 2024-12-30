import React from "react";
// import Dashboard from "../pages/dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import  CourseForm  from "../page/courses";
// import Courses from "../pages/courses/Courses"
// import CourseContent from "../pages/courseContent/CourseContent"
// import { CourseContent } from "../pages/courseContent/courseContent";
const AppRoutes = () => {
    return (
      <Routes>
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses/:courseID" element={<Courses />} />
        <Route path="/Courses/:courseID/topics/:week" element={<CourseContent />} /> */}
        <Route path="/CourseForm" element={<CourseForm />}/>
      </Routes>
    );
  };
  
  export default AppRoutes;
  