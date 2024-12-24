import React from "react";
import Dashboard from "../pages/dashboard/Dashboard";
// import Courses from "../pages/Courses/Courses"
// import {Courses} from "../pages/Courses/Courses";
import { Routes, Route } from "react-router-dom";
import Courses from "../pages/courses/Courses"
const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    );
  };
  
  export default AppRoutes;
  