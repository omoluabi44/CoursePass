import React from 'react'
import { BiAtom } from "react-icons/bi";
import Styles from "./Courses.module.css"

export const Courses = () => {
  return (
    <>
    <div className={Styles.container}>
    <h1>Mechanical Department</h1>
        <div className={Styles.courseContainer}>
            <div className={Styles.cardList}>
                <div className={Styles.wrapped}>
                 
                    <img className={Styles.icon} src='/Image/Physics.jpeg' alt="logo"/>
                    <h3 className={Styles.coursename}>Physics 101</h3>
                </div>
                <div className={Styles.cardcontents}>
                    <p className={Styles.level}>Level 100</p>
                    <a href='#' className={Styles.btn}>start this Course</a>
                </div>
            </div>
            <div className={Styles.cardList}>
                <div className={Styles.wrapped}>
                 
                    <img className={Styles.icon} src='/Image/Physics.jpeg' alt="logo"/>
                    <h3 className={Styles.coursename}>Physics 101</h3>
                </div>
                <div className={Styles.cardcontents}>
                    <p className={Styles.level}>Level 100</p>
                    <a href='#' className={Styles.btn}>start this Course</a>
                </div>
            </div>
            <div className={Styles.cardList}>
                <div className={Styles.wrapped}>
                 
                    <img className={Styles.icon} src='/Image/Physics.jpeg' alt="logo"/>
                    <h3 className={Styles.coursename}>Physics 101</h3>
                </div>
                <div className={Styles.cardcontents}>
                    <p className={Styles.level}>Level 100</p>
                    <a href='#' className={Styles.btn}>start this Course</a>
                </div>
            </div>
            <div className={Styles.cardList}>
                <div className={Styles.wrapped}>
                 
                    <img className={Styles.icon} src='/Image/Physics.jpeg' alt="logo"/>
                    <h3 className={Styles.coursename}>Physics 101</h3>
                </div>
                <div className={Styles.cardcontents}>
                    <p className={Styles.level}>Level 100</p>
                    <a href='#' className={Styles.btn}>start this Course</a>
                </div>
                
            </div>
        </div>
        <h1>Mechatronics Department</h1>
        <div className={Styles.courseContainer}>
            <div className={Styles.cardList}>
                <div className={Styles.wrapped}>
                 
                    <img className={Styles.icon} src='/Image/Physics.jpeg' alt="logo"/>
                    <h3 className={Styles.coursename}>Physics 101</h3>
                </div>
                <div className={Styles.cardcontents}>
                    <p className={Styles.level}>Level 100</p>
                    <a href='#' className={Styles.btn}>start this Course</a>
                </div>
            </div>
            <div className={Styles.cardList}>
                <div className={Styles.wrapped}>
                 
                    <img className={Styles.icon} src='/Image/Physics.jpeg' alt="logo"/>
                    <h3 className={Styles.coursename}>Physics 101</h3>
                </div>
                <div className={Styles.cardcontents}>
                    <p className={Styles.level}>Level 100</p>
                    <a href='#' className={Styles.btn}>start this Course</a>
                </div>
            </div>
            <div className={Styles.cardList}>
                <div className={Styles.wrapped}>
                 
                    <img className={Styles.icon} src='/Image/Physics.jpeg' alt="logo"/>
                    <h3 className={Styles.coursename}>Physics 101</h3>
                </div>
                <div className={Styles.cardcontents}>
                    <p className={Styles.level}>Level 100</p>
                    <a href='#' className={Styles.btn}>start this Course</a>
                </div>
            </div>
            <div className={Styles.cardList}>
                <div className={Styles.wrapped}>
                 
                    <img className={Styles.icon} src='/Image/Physics.jpeg' alt="logo"/>
                    <h3 className={Styles.coursename}>Physics 101</h3>
                </div>
                <div className={Styles.cardcontents}>
                    <p className={Styles.level}>Level 100</p>
                    <a href='#' className={Styles.btn}>start this Course</a>
                </div>
                
            </div>
        </div>
    </div>
    </>
  )
}
