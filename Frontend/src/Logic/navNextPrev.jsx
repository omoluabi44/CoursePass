import React from "react";
import { useNavigate } from "react-router-dom";

const CourseNavigation =({courseId, currentWeek, courseOutline}) => {
    const navigate = useNavigate();
    const currentIndex = courseOutline.findIndex(course => course.week === currentWeek);
    const previousTopic = currentIndex > 0 ? courseOutline[currentIndex - 1] : null;
    const nextTopic = currentIndex < courseOutline.length - 1 ? courseOutline[currentIndex + 1] : null;
    const isFirstTopic = currentIndex === 0;
    const isLastTopic = currentIndex === courseOutline.length - 1;

    const handlePrevious = () => {
        if (previousTopic) {
            navigate(`/courses/${courseId}/topics/${previousTopic.week}`, { state: { week: previousTopic.week, topic: previousTopic.topic, content: previousTopic.content } });
        }
    };
    const handleNext = () => {
        if (nextTopic) {
            navigate(`/courses/${courseId}/topics/${nextTopic.week}`, { state: { week: nextTopic.week, topic: nextTopic.topic, content: nextTopic.content } });
        }
    };
   return(
    <>
     <button onClick={handlePrevious} disabled={isFirstTopic}> Previous </button>
     <button onClick={handleNext} disabled={isLastTopic}> Next </button>
    </>
   
   ) 

}

export default CourseNavigation;