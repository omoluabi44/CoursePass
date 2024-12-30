import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./globals.css";
import  Sidebar  from "../src/component/Sidebar/Sidebar";
import AppRoutes from "../src/routes/appRoute"
import { Navbar } from "./component/Navbar/Navbar";

const App = () => {

  return (
    <>
    <Router>
        <div className="layout">
        <Sidebar />
    
        <div className="admin">Admin Dashboard</div>
        
          <div className="main">
            <div className="content">
              <AppRoutes /> 
            </div>
          </div>
        </div>
      </Router>

 
     
    </>

  );
};

export default App;

