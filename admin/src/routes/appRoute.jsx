import React from "react";
// import Dashboard from "../pages/dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import  CourseForm  from "../page/courses";
import CourseContent from "../page/CourseContent";
import { Maths } from "../page/latex";
const AppRoutes = () => {
    return (
      <Routes>
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses/:courseID" element={<Courses />} />
        <Route path="/Courses/:courseID/topics/:week" element={<CourseContent />} /> */}
        <Route path="/CourseForm" element={<CourseForm />}/>
        <Route path="/CourseContent" element={<CourseContent />}/>
        <Route path="/Latex" element={<Maths />}/>
      </Routes>
    );
  };
  
  export default AppRoutes;
  