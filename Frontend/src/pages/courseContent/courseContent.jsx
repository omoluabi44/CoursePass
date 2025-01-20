// import { useLocation } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { fetchCourseDetails, fetchDashboardCourses } from '../../redux/slice';
// import { useNavigate } from "react-router-dom";
// import CourseNavigation from '../../Logic/navNextPrev';
// import "./courseContent.css";
// import katex from 'katex';
// import 'katex/dist/katex.min.css'; // You need to import the CSS for LaTeX rendering

// export const CourseContent = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const { courseID } = useParams();
//     const { week, topic, content } = location.state || {};

//     // Fetch course details and dashboard courses
//     const { dashboardCourses, selectedCourse, status } = useSelector((state) => state.courses);

//     // Function to handle course start navigation
//     const handleStartCourse = (courseId) => {
//         navigate(`/courses/${courseId}`);
//     };

//     // Function to handle topic click (navigate to detailed topic page)
//     const handleTopicClick = (week, topic, content) => {
//         navigate(`/courses/${courseID}/topics/${week}`, { state: { week, topic, content } });
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             setError(null);

//             try {
//                 await dispatch(fetchDashboardCourses()).unwrap();
//                 await dispatch(fetchCourseDetails(courseID)).unwrap();
//             } catch (error) {
//                 console.error('Error fetching course:', error);
//                 setError('Failed to fetch course data. Please try again later.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, [dispatch, courseID]);

//     // If the course data is still loading or the course is not found
//     if (loading) {
//         return <div>Loading course details...</div>;
//     }

//     if (!selectedCourse || !selectedCourse.courseOutline) {
//         return <div>Course data is unavailable.</div>;
//     }

//     if (!topic || !content) {
//         return <div>No topic found</div>;
//     }

//     // Helper function to render LaTeX within text
//     const renderLatexInText = (text) => {
//         if (!text) return null;
//         const parts = text.split(/(\$[^\$]+?\$)/g);

//         return parts.map((part, index) => 
//             part.startsWith('$') && part.endsWith('$') 
//               ? <span key={index} dangerouslySetInnerHTML={{ __html: katex.renderToString(part.slice(1, -1), { throwOnError: false }) }} />
//               : <span key={index}>{part}</span>
//         );
//     };

//     // Render course content
//     return (
//         <>
//             <div className="header_container">
//                 <div className="filter_container">
//                     <select
//                         name="college"
//                         id="college"
//                         className="select"
//                         onChange={(e) => {
//                             const courseId = e.target.value;
//                             if (courseId) {
//                                 handleStartCourse(courseId);
//                             }
//                         }}
//                     >
//                         <option value="">Course Lists</option>
//                         {dashboardCourses.map((course) => (
//                             <option key={course.courseID} value={course.courseID}>
//                                 {course.name}
//                             </option>
//                         ))}
//                     </select>
//                     <select
//                         name="college"
//                         id="college"
//                         className="select"
//                         onChange={(e) => {
//                             console.log("invoke");
                            
//                             const week = parseInt(e.target.value);
//                             if (week) {
//                                 const selectedTopic = selectedCourse.courseOutline.find(topic => topic.week === week);
//                                 if (selectedTopic) {
//                                     handleTopicClick(week, selectedTopic.topic, selectedTopic.content);
//                                 }
//                             }
//                         }}
//                     >
//                         <option value="">{selectedCourse.courseName} Outline</option>
//                         {selectedCourse.courseOutline.map((course) => (
//                             <option key={course.week} value={course.week}>
//                                 {course.topic}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </div>
//             <div className='course_content'>
//                 <h1><strong>Week</strong> {week}: {topic}</h1>
//                 <p>{renderLatexInText(content)}</p>  // Render LaTeX within the text here
//                 <CourseNavigation
//                     courseId={courseID}
//                     currentWeek={week}
//                     courseOutline={selectedCourse.courseOutline}
//                 />
//             </div>
//         </>
//     );
// };

import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCourseDetails, fetchDashboardCourses } from '../../redux/slice';
import { useNavigate } from "react-router-dom";
import CourseNavigation from '../../Logic/navNextPrev';
import "./courseContent.css";
import Latex from 'react-latex-next';

export const CourseContent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { courseID } = useParams();
    const { week, topic, content } = location.state || {};

    const fraction = `$\\int$`
    // Fetch course details and dashboard courses
    const { dashboardCourses, selectedCourse, status } = useSelector((state) => state.courses);

    // Function to handle course start navigation
    const handleStartCourse = (courseId) => {
        navigate(`/courses/${courseId}`);
    };

    // Function to handle topic click (navigate to detailed topic page)
    const handleTopicClick = (week, topic, content) => {
        navigate(`/courses/${courseID}/topics/${week}`, { state: { week, topic, content } });
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                await dispatch(fetchDashboardCourses()).unwrap();
                await dispatch(fetchCourseDetails(courseID)).unwrap();
            } catch (error) {
                console.error('Error fetching course:', error);
                setError('Failed to fetch course data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch, courseID]);

    // If the course data is still loading or the course is not found
    if (loading) {
        return <div>Loading course details...</div>;
    }

    if (!selectedCourse ) {
        return <div>Course data is unavailable.</div>;
    }

    if (!topic || !content) {
        return <div>No topic found</div>;
    }

    // Helper function to render LaTeX within text
    const renderLatexInText = (text) => {
        if (!text) return null;
       text = text.replace(/\*\*(.*?)\*\*/g, '<h2>$1</h2>')
       text = text.replace(/_p_/g, '<p>$1</p>')
        // return <Latex>{`${text}`}</Latex>;
        return <div dangerouslySetInnerHTML={{__html:text}}/>;
    };

    // Render course content
    return (
        <>
        <div className="container">

            <div className="header_container">
                <div className="filter_container">
                    <select
                        name="college"
                        id="college"
                        className="select"
                        onChange={(e) => {
                            const courseId = e.target.value;
                            if (courseId) {
                                handleStartCourse(courseId);
                            }
                        }}
                    >
                        <option value="">Course Lists</option>
                        {dashboardCourses.map((course) => (
                            <option key={course.courseID} value={course.courseID}>
                                {course.name}
                            </option>
                        ))}
                    </select>
                    <select
                        name="college"
                        id="college"
                        className="select"
                        onChange={(e) => {
                            console.log("invoke");
                            
                            const week = (e.target.value);
                            if (week) {
                                const selectedTopic = selectedCourse.find(topic => topic.week === week);
                                if (selectedTopic) {
                                    handleTopicClick(week, selectedTopic.topic, selectedTopic.content);
                                }
                            }
                        }}
                    >
                        <option value="">{selectedCourse.courseName} Outline</option>
                        {selectedCourse.map((course) => (
                            <option key={course.week} value={course.week}>
                                {course.topic}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className='course_content'>
                <h1><strong>Week</strong> {week}: {topic}</h1>
                <div>{renderLatexInText(content)}</div>  
                <p><Latex>{fraction}</Latex></p>
                <div className="button_nav">
                <CourseNavigation
                    courseId={courseID}
                    currentWeek={week}
                    courseOutline={selectedCourse}
                />
                </div>
            </div>
        </div>
        </>
    );
};