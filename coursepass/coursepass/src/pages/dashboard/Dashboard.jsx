import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./page.module.css";
import { setCourses } from "../../redux/actions/courses";
import { setCollege,setDepartment,setSemester,setlevel } from "../../redux/actions/filterActions";
import { useNavigate } from "react-router-dom";
import fetchCourses from "../../redux/actions/courses";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courses = useSelector((state) => state.allCourses.courses);
  const filters = useSelector((state) => state.filters);


  const handleStartCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
    window.location.reload();
  }

  useEffect(() => {
    fetchCourses();
  }, [dispatch]);

// Handle filter changes
  const handleCollegeChange = (e) => {
    dispatch(setCollege(e.target.value));
  }
  const handleDepartmentChange = (e) => {
    dispatch(setDepartment(e.target.value));
  }
  const handleLevelChange = (e) => {
    dispatch(setlevel(e.target.value));
  }
  const handleSemesterChange = (e) => {
    dispatch(setSemester(e.target.value));
  }
// Filter the courses based on the selected filters
const filteredCourses = courses.filter(course => {
  return (
    (filters.college ? course.college === filters.college : true) &&
    (filters.department ? course.department === filters.department : true) &&
    (filters.level ? course.level === filters.level : true) &&
    (filters.semester ? course.semester === filters.semester : true)
  );
});
if (!filteredCourses || filteredCourses.length === 0) {
  return <p>Loading courses...</p>;
}
console.log(courses);

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
                 
                            <select 
                                name="college" 
                                id="college" 
                                className={Styles.select} 
                                onChange={handleCollegeChange}
                              >
                                <option value="">Select College</option>
                                <option value="College of Engineering">C E T</option>
                                <option value="College of Basic Science">C B S</option>
                                <option value="College of Social Science">C S S</option>
                                <option value="College of Arts">C A</option>
                                <option value="College of Education">C E</option>
                            </select>
                             <select 
                                name="department" 
                                id="department" 
                                className={Styles.select} 
                                onChange={handleDepartmentChange}
                              >
                                <option value="">Select Department</option>
                                <option value="Mechatronics Engineering">Mechatronics</option>
                                <option value="Mechanical Engineering">Mechanical</option>
                                <option value="Civil Engineering">Civil</option>
                                <option value="Electrical Engineering">Elect/Elect</option>
                                <option value="Chemical Engineering">Chemical</option>
                                <option value="Agricultural Engineering">Agric</option>
                                <option value="Computer Science">Computer</option>
                          </select>
                            <select 
                                name="level" 
                                id="level" 
                                className={Styles.select} 
                                onChange={handleLevelChange}
                              >
                                <option value="">Select Level</option>
                                <option value="100 Level">100lv</option>
                                <option value="200 Level">200lv</option>
                                <option value="300 Level">300lv</option>
                                <option value="400 Level">400lv</option>
                                <option value="500 Level">500lv</option>
                              </select>
             
                              <select 
                                  name="semester" 
                                  id="semester" 
                                  className={Styles.select} 
                                  onChange={handleSemesterChange}
                                >
                                  <option value="">Select Semester</option>
                                  <option value="First Semester">First Semester</option>
                                  <option value="Second Semester">Second Semester</option>
                            </select>
                             
                     </div>
     
     </div>

      <div className={Styles.container}>
        <div className={Styles.box_container}>
          {filteredCourses.length===0 ?( <p>No courses found for the selected filters.</p>)
          :(
            filteredCourses.map((course) => (
              <div className={Styles.cardList} key={course.id}>
                <h3 className={Styles.coursename}>{course.name}</h3>
                <p className={Styles.level}>{course.level}</p>
             
                <button
                  className={Styles.btn}
                  onClick={() => handleStartCourse(course.courseID)}
                >
                  Start this Course
                </button>
                
                
              </div>
            ))
          )}
          
        </div>
      </div>
    </>
  );
};

export default Dashboard;
