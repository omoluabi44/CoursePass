import React, { useState, useEffect } from "react";
import axios from "axios";
import s from "./CourseContent.module.css"; // Assume this file contains relevant styling.

const CourseContent = () => {
  const [contentData, setContentData] = useState([]);
  const [formData, setFormData] = useState({
    courseID: "",
    week: "",
    topic: "",
    content: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState(null);

  const apiBaseUrl = "https://omoluabi2.pythonanywhere.com/api/v1";

  const fetchCourseContent = async (courseId) => {
    if (!courseId) return;
    try {
      const response = await axios.get(`${apiBaseUrl}/courses/${courseId}/content`);
      setContentData(response.data);
    } catch (error) {
      console.error("Error fetching course content:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.courseID) {
      setStatus({ success: false, message: "Course ID is required!" });
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`${apiBaseUrl}/content/${editingId}`, formData, {
          headers: { "Content-Type": "application/json" },
        });
        setStatus({ success: true, message: "Content updated successfully!" });
      } else {
        await axios.post(`${apiBaseUrl}/courses/${formData.courseID}/content`, formData, {
          headers: { "Content-Type": "application/json" },
        });
        setStatus({ success: true, message: "Content added successfully!" });
      }
      setFormData({ courseID: "", week: "", topic: "", content: "" });
      setIsEditing(false);
      setEditingId(null);
      fetchCourseContent(formData.courseID);
    } catch (error) {
      setStatus({ success: false, message: "Failed to save content. Please try again." });
    }
  };

  const handleEdit = (content) => {
    setFormData({
        courseID: content.courseID,
      week: content.week,
      topic: content.topic,
      content: content.content,
    });
    setIsEditing(true);
    setEditingId(content.courseID);
  };

  const handleDelete = async (id, courseId) => {
    try {
      await axios.delete(`${apiBaseUrl}/content/${id}`);
      setStatus({ success: true, message: "Content deleted successfully!" });
      fetchCourseContent(courseId);
    } catch (error) {
      setStatus({ success: false, message: "Failed to delete content. Please try again." });
    }
  };

  return (
    <div className={s.container}>
      <h2>Course Content Management</h2>

      {status && (
        <div className={`${s.status_message} ${status.success ? s.success : s.error}`}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className={s.form}>
        <div className={s.form_group}>
          <label>Course ID:</label>
          <input
            type="text"
            name="courseID"
            value={formData.courseID}
            onChange={handleChange}
            required
          />
        </div>
        <div className={s.form_group}>
          <label>Week:</label>
          <input
            type="number"
            name="week"
            value={formData.week}
            onChange={handleChange}
            required
          />
        </div>
        <div className={s.form_group}>
          <label>Topic:</label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
          />
        </div>
        <div className={s.form_group}>
          <label>Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className={s.submit_button}>
          {isEditing ? "Update Content" : "Add Content"}
        </button>
      </form>

      {formData.courseID && (
        <>
          <h3>Content List for Course ID: {formData.courseID}</h3>
          <button
            onClick={() => fetchCourseContent(formData.courseID)}
            className={s.fetch_button}
          >
            Refresh Content
          </button>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Week</th>
                <th>ID</th>
                <th>Course ID</th>
                <th>Topic</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contentData.map((content) => (
                <tr key={content.id}>
                  <td>{content.week}</td>
                  <td>{content.id}</td>
                  <td>{content.courseID}</td>
                  <td>{content.topic}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(content)}
                      className={s.edit_button}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(content.id, content.courseID)}
                      className={s.delete_button}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CourseContent;
