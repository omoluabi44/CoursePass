import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./globals.css";
import  Sidebar  from "../src/component/Sidebar/Sidebar";
import { Navbar } from "../src/component/Navbar/Navbar";
import AppRoutes from "../src/routes/appRoute"
import { MathJaxContext } from 'better-react-mathjax';
import config from './mathjaxConfig';
import CryptoAirdropPopup from "./Logic/PopUp";


const App = () => {

  return (
    <>
 
 <MathJaxContext config={config}>
    <Router>
    <CryptoAirdropPopup />
    <Navbar />
        <div className="layout">
         
          <div className="main">
          
            <Sidebar />
            <div className="content">
              <AppRoutes /> 
            </div>
          </div>
        </div>
      </Router>
  </MathJaxContext>

    </>

  );
};

export default App;

