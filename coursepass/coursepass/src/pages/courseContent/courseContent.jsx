import React from 'react'
import { useLocation } from 'react-router-dom'

export const CourseContent = () => {
    const location = useLocation();
    const {week, topic, content} = location.state || {};
    console.log("location",location.state);
    

    if (!topic || !content) {
        return <div>No topic found</div>;
    }
  return (
    <div>
        <h1><strong>Week</strong>  {week}: {topic}</h1>
        <p>{content}</p>
    </div>
  )
}
