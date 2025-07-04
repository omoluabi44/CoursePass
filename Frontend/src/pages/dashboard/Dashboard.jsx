
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./page.module.css";
import { setCollege, setDepartment, setSemester, setlevel } from "../../redux/actions/filterActions";
import { useNavigate } from "react-router-dom";
import { fetchDashboardCourses } from "../../redux/slice";
import { FaFilter } from "react-icons/fa";

const Dashboard = () => {
  const state = useSelector((state) => {
    console.log('State:', state);
    return state.courses;
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dashboardCourses, status } = useSelector((state) => state.courses);
  const filters = useSelector((state) => state.filters);
  const [showFilters, setShowFilters] = useState(false);



  useEffect(() => {
    dispatch(fetchDashboardCourses());
  }, [dispatch]);

  const handleStartCourse = (courseId) => {
    navigate(`/courses/${courseId}`);

  };
  const handleCollegeChange = (e) => {
    dispatch(setCollege(e.target.value));
  };

  const handleDepartmentChange = (e) => {
    dispatch(setDepartment(e.target.value));
  };

  const handleLevelChange = (e) => {
    dispatch(setlevel(e.target.value));
  };

  const handleSemesterChange = (e) => {
    dispatch(setSemester(e.target.value));
  };
  const handleShowFilter =()=>{
    setShowFilters(true)
  }
  const handleHideFilter =()=>{
    setShowFilters(false)
  }


  const filteredCourses = dashboardCourses.filter(course => {
    return (
      (filters.college ? course.college === filters.college : true) &&
      (filters.department ? course.department === filters.department : true) &&
      (filters.level ? course.level === filters.level : true) &&
      (filters.semester ? course.semester === filters.semester : true)
    );
  });


  if (status === 'loading') {
    return <div className={Styles.Loading}></div>
  }

  if (status === 'failed') {
    return <p>Failed to load courses.</p>;
  }

  if (status === 'succeeded' && (!filteredCourses || filteredCourses.length === 0)) {
    return <p>No courses found for the selected filters.</p>;
  }

  return (
    <>
      <div className={Styles.header_container}>
        <div className={Styles.head_filter_con}>
            <div className={Styles.course_heading}>DASHBOARD 2</div>
             <div className={Styles.course_heading}>DOWNLOAD THE APP</div>
            <div className={Styles.filter_icon} onClick={handleShowFilter}>
              <FaFilter />
            </div>
        </div>
      
        {/* <div className={Styles.search_container}>
          <input className={Styles.search} type="text" placeholder="Search Courses"/>
          <button className={Styles.search_btn}>
            <svg className={Styles.icon} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
            </svg>
          </button>
        </div> */}
        <div className={`${Styles.filter_container} ${showFilters ? Styles.show_filters : ""}`}>
          <div className={Styles.b}>
          <svg onClick={handleHideFilter} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
          <span>close filter</span>
          </div>
          <div className={Styles.c}>
          <select name="college" id="college" className={Styles.select} onChange={handleCollegeChange}>
            <option value="">Select College</option>
            <option value="College of Engineering">C E T</option>
            <option value="College of Basic Science">C B S</option>
            <option value="College of Social Science">C S S</option>
            <option value="College of Arts">C A</option>
            <option value="College of Environmenal">C E</option>
          </select>
      
          <select name="level" id="level" className={Styles.select} onChange={handleLevelChange}>
            <option value="">Select Level</option>
            <option value="100 Level">100lv</option>
            <option value="200 Level">200lv</option>
            <option value="300 Level">300lv</option>
            <option value="400 Level">400lv</option>
            <option value="500 Level">500lv</option>
          </select>
          <select name="semester" id="semester" className={Styles.select} onChange={handleSemesterChange}>
            <option value="">Select Semester</option>
            <option value="First Semester">First Semester</option>
            <option value="Second Semester">Second Semester</option>
          </select>
          </div>
        </div>
      </div>

      <div className={Styles.container}>
        <div className={Styles.box_container}>
          {filteredCourses.map((course) => (
            <div className={Styles.cardList} key={course.id}>
              <h3 className={Styles.coursename}>{course.name}</h3>
              <p className={Styles.level}>{course.level}</p>
              <button className={Styles.btn} onClick={() => handleStartCourse(course.courseID)}>
                Start this Course
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;