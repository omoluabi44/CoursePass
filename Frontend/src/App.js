import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import "./globals.css";
import Sidebar from "../src/component/Sidebar/Sidebar";

import AppRoutes from "../src/routes/appRoute"
import {MathJaxContext} from 'better-react-mathjax';
import config from './mathjaxConfig';
import CryptoAirdropPopup from "./Logic/PopUp";
import HeroSection from "./landing page/heroSection";
import FeaturesSection from "./landing page/FeaturesSection";
import HowItWorks from "./landing page/HowItWorks";
import TestimonialsSection from "./landing page/TestimonialsSection";
import CTASection from "./landing page/CTASection";
import Footer from "./landing page/Footer";
import {Provider, useSelector, useDispatch} from 'react-redux';
import {store} from "./redox/store"
import 'katex/dist/katex.min.css';
import Navbar from "./landing page/navbar";
import DeleteUserButton from "./auth/logout";

 console.log("this is from local storage homepage:",localStorage.getItem("user"));
const App = () => {

  return (
    <>

      <MathJaxContext config={config}>
        <Provider store={store}>
          


          <Router>
            <Navbar/>

            <AppRoutes />
            {/* <CryptoAirdropPopup />
    <Navbar />
        <div className="layout">
         
          <div className="main">
          
            <Sidebar />
            <div className="content">
              <AppRoutes /> 
            </div>
          </div>
        </div> */}
          </Router>
        </Provider>
      </MathJaxContext>

    </>

  );
};

export default App;

