'use client';
import React,{ useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./page.module.css"
import { CiSearch } from "react-icons/ci";
import {setCourses} from "../redux/actions/courses"


const Courses = () => {

        const dispatch = useDispatch();
        const courses = useSelector(state => state.allCourses.courses);

        useEffect(() => {
                async function fetchCourses() {
                  const response = await fetch("http://localhost:3000/api/users");
                  const data = await response.json();
                  console.log(data);
                  dispatch(setCourses(data.courses));
                }
                fetchCourses();
        }, [dispatch]);
  
  return (
    <>
  
  <div className={Styles.header_container}>
                <div className={Styles.course_heading}>All Courses</div>
                <div className={Styles.search_container}>
                <input className={Styles.search} type="text" placeholder="Search Courses"/>
                <button className={Styles.search_btn}><CiSearch className={Styles.icon}/></button>
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
        {
                courses.map((course) => {
                        return (
                                <div className={Styles.cardList}>
                                        <h3 className={Styles.coursename}>{course.name}</h3>
                                        <p className={Styles.level}>{course.level}</p>
                                        <a href='#' className={Styles.btn}>start this Course</a>
                                </div>
                        )
                })
        }
            <div className={Styles.cardList}>
                    <h3 className={Styles.coursename}>Physics 101</h3>
                    <p className={Styles.level}>Level 100</p>
                    <a href='#' className={Styles.btn}>start this Course</a>
            </div>
           
    </div>
       
</div>

    </>
  )
}

export default Courses