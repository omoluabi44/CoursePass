import React from "react";
import Dashboard from "../pages/dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import Courses from "../pages/courses/Courses"
import {CourseSelection} from "../pages/pastQuestions/selectionPage";
import { CourseContent } from "../pages/courseContent/courseContent";
import { PastQuestion } from "../pages/pastQuestions/PastQuestion";
import { ScorePage } from "../pages/pastQuestions/ScorePage";
import HomePage from "../pages/HomePage/HomePage";
const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses/:courseID" element={<Courses />} />
        <Route path="/Courses/:courseID/topics/:week" element={<CourseContent />} />
        <Route path="/courseSelection" element={<CourseSelection />} />
        <Route path="/past-questions/:courseID" element={<PastQuestion />} />
        <Route path="/score" element={<ScorePage />} />

      </Routes>
    );
  };
  
  export default AppRoutes;
  