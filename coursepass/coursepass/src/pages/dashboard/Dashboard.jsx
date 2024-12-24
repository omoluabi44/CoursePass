import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./page.module.css";
import { setCourses } from "../../redux/actions/courses";

const Dashboard = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.allCourses.courses);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("http://localhost:3000/api.json");
        const data = await response.json();

        console.log("Courses data:", data);
        
        if (data ) {
          dispatch(setCourses(data));
          console.log("succesfull");
          
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    fetchCourses();
  }, [dispatch]);

  if (!courses || courses.length === 0) {
    return <p>Loading courses...</p>;
  }

  return (
    <>
     <div className={Styles.header_container}>
                     <div className={Styles.course_heading}>All Courses</div>
                     <div className={Styles.search_container}>
                     <input className={Styles.search} type="text" placeholder="Search Courses"/>
                     <button className={Styles.search_btn}>
                     <svg   className={Styles.icon} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                  
                      
                      </button>
                     </div>
                     <div className={Styles.filter_container}>
                 
                             <select name="department" id="department" className={Styles.select}>
                                     <option value="C">Select College</option>
                                     <option value="C">C E T</option>
                                     <option value="science">C B S</option>
                                     <option value="art">C S S</option>
                                     <option value="commerce">C A</option>
                                     <option value="commerce">C E </option>
     
                             </select>
                             <select name="department" id="department" className={Styles.select}>
                                     <option value="C">Select Department</option>
                                     <option value="C">Mechatronics </option>
                                     <option value="science">Mechanical </option>
                                     <option value="art">Civil </option>
                                     <option value="commerce">Elect/Elect</option>
                                     <option value="commerce">Chemical</option>
                                     <option value="commerce">Agric </option>
                                     <option value="commerce">Computer</option>
     
                             </select>
                             <select name="department" id="department" className={Styles.select}>
                                     <option value="C">Select Level</option>
                                     <option value="C">100lv </option>
                                     <option value="science">200lv</option>
                                     <option value="art">300lv</option>
                                     <option value="commerce">400lv</option>
                                     <option value="commerce">500lv </option>
                             </select>
             
                             <select name="department" id="department" className={Styles.select}>
                                      <option value="C">Select Semester</option>
                                     <option value="C">First Semester</option>
                                     <option value="science">Second Semester </option>
                             </select>
                             
                     </div>
     
             </div>

      <div className={Styles.container}>
        <div className={Styles.box_container}>
          {courses.map((course) => (
            <div className={Styles.cardList} key={course.id}>
              <h3 className={Styles.coursename}>{course.name}</h3>
              <p className={Styles.level}>{course.level}</p>
              <a href="#" className={Styles.btn}>Start this Course</a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
