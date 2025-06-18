import React from "react";
import Dashboard from "../pages/dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
import Courses from "../pages/courses/Courses"
import {CourseSelection} from "../pages/pastQuestions/selectionPage";
import { CourseContent } from "../pages/courseContent/courseContent";
import { PastQuestion } from "../pages/pastQuestions/PastQuestion";
import { ScorePage } from "../pages/pastQuestions/ScorePage";
import HomePage from "../pages/HomePage/HomePage";
import CProgrammingForm from "../pages/Form/Form";
import PaymentPage from "../pages/CoffeePayment/CoffeePayment";
import SignUp from "../auth/signUp";
import LandingPage from "../pages/HomePage/LandingPage";
import Login from "../auth/login";
import OTPInput from "../auth/confirmEmail";
import CourseList from "../courses/CourseList";
import CourseDetails from "../courses/CourseDetails";
import CourseNote from "../courses/notes";
import ForgetPassword from "../auth/forgetPassword";

const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses/:courseID" element={<Courses />} />
        <Route path="/Courses/:courseID/topics/:week" element={<CourseContent />} />
        <Route path="/courseSelection" element={<CourseSelection />} />
        <Route path="/past-questions/:courseID" element={<PastQuestion />} />
        <Route path="/score" element={<ScorePage />} />
        <Route path="/form" element={<CProgrammingForm />} />
        <Route path="/paymentPage" element={<PaymentPage />} />
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/otp/:username/:email" element={<OTPInput />}/>
          <Route path="/forgetpassword/:email" element={<ForgetPassword />}/>
        <Route path="/CourseList" element={<CourseList />}/>
        <Route path="/CourseDetails/:courseId" element={<CourseDetails />}/>
         <Route path="/notes/:selectedValue/:outline/:courseId/:topic" element={<CourseNote />}/>

      </Routes>
    );
  };
  
  export default AppRoutes;
  