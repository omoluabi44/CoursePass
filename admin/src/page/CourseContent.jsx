

import React, { useState } from "react";
import s from "./CourseContent.module.css"; 
import axios from "axios";


const CourseOutlineForm = () => {
  const [formData, setFormData] = useState({
    courseID: "",
    courseName: "",
    courseOutline: [
      { week: 1, topic: "", content: "" }, 
    ],
  });
const [status, setStatus] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOutlineChange = (index, e) => {
    const { name, value } = e.target;
    const updatedOutline = formData.courseOutline.map((outline, i) =>
      i === index ? { ...outline, [name]: value } : outline
    );
    setFormData((prevData) => ({ ...prevData, courseOutline: updatedOutline }));
  };

  const addWeek = () => {
    setFormData((prevData) => ({
      ...prevData,
      courseOutline: [
        ...prevData.courseOutline,
        { week: prevData.courseOutline.length + 1, topic: "", content: "" },
      ],
    }));
  };

  const removeWeek = (index) => {
    const updatedOutline = formData.courseOutline.filter((_, i) => i !== index);
    setFormData((prevData) => ({ ...prevData, courseOutline: updatedOutline }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    try {
      const response = await axios.post("http://localhost:5000/api/v1/courses", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setStatus({ success: true, message: "Course outline added successfully!" });
      setFormData({
        courseID: "",
        courseName: "",
        courseOutline: [
          { week: 1, topic: "", content: "" }, 
        ],
      });
    } catch (error) {
      setStatus({ success: false, message: "Failed to add courses outline. Please try again." });
    }
    
  };

  return (
    <div className={s.form_container}>
      <h2>Create Course Outline</h2>
      {status && (
        <div className={`${s.status_message} ${status.success ? s.success : s.error}`}>
          {status.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className={s.form_group}>
          <label htmlFor="courseID">Course ID:</label>
          <input
            type="text"
            id="courseID"
            name="courseID"
            value={formData.courseID}
            onChange={handleChange}
            required
          />
        </div>
        <div className={s.form_group}>
          <label htmlFor="courseName">Course Name:</label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            required
          />
        </div>
        <div className={s.course_outline}>
          <h3>Course Outline</h3>
          {formData.courseOutline.map((outline, index) => (
            <div key={index} className={s.outline_item}>
              <div className={s.form_group}>
                <label>Week {outline.week} Topic:</label>
                <input
                  type="text"
                  name="topic"
                  value={outline.topic}
                  onChange={(e) => handleOutlineChange(index, e)}
                  required
                />
              </div>
              <div className={s.form_group}>
                <label>Week {outline.week} Content:</label>
                <textarea
                  name="content"
                  value={outline.content}
                  onChange={(e) => handleOutlineChange(index, e)}
                  required
                />
              </div>
  
              <button
                type="button"
                onClick={() => removeWeek(index)}
                className={s.remove_week_button}
                disabled={formData.courseOutline.length === 1}
              >
                Remove Week
              </button>
    
            </div>
          ))}
         
          <button type="button" onClick={addWeek} className={s.add_week_button}>
            Add Week
          </button>
        </div>
        
        <button type="submit">Submit Course</button>
      </form>
    </div>
  );
};

export default CourseOutlineForm;

