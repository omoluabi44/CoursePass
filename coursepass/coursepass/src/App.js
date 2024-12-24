import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./globals.css";
import  Sidebar  from "../src/component/Sidebar/Sidebar";
import { Navbar } from "../src/component/Navbar/Navbar";

import { Provider } from "react-redux";
import  store  from "./redux/store/store";
import AppRoutes from "../src/routes/appRoute"


const App = () => {
  return (
    <>
  <Provider store={store}>
    <Router>
        <div className="layout">
          <Navbar />
          <div className="main">
            <Sidebar />
            <div className="content">
              <AppRoutes /> 
            </div>
          </div>
        </div>
      </Router>
    </Provider>
 
     
    </>

  );
};

export default App;

{/* <Provider store={store}>
      <Router>
        <div className="layout">
          <Navbar />
          <div className="main">
            <Sidebar />
            <div className="content">
              <AppRoutes /> 
            </div>
          </div>
        </div>
      </Router>
     </Provider> */}
