import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import gamiImage from "../assets/images/gami.webp"; // Adjust path

const CourseList = () => {
  const { user } = useSelector((state) => state.login);
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const fetchCourses = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://api.coursepass.me/api/v1/courses");
      setData(response.data);
      setSuccess(true);
      console.log("this is data:", response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch courses");
      setSuccess(false);
      console.log("this error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  console.log("this is user:", user);

  const handleNav = () => {
    navigate("/addNewCourse");
  };

  const handleClickCourse = (courseId) => {
    navigate(`/courseDetails/${courseId}`);
  };

  if (isLoading) {
    return (
      <div className={`course-list-container ${theme}`}>
        <div className="loading">
          <h2>Loading...</h2>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!success) {
    return (
      <div className={`course-list-container ${theme}`}>
        <div className="loading">
          <h2>Error...</h2>
          <p>{error || "Loading..."}</p>
        </div>
      </div>
    );
  }

 

  return (
    <>
      <style>
        {`
          /* CSS Variables for reusability */
          :root {
            --bg-light: #f5f2f5;
            --bg-dark: #252627;
            --text-light: #333;
            --text-dark: #d4d4d4;
            --accent: #007bff;
            --secondary: #6c757d;
            --spacing-sm: 0.5rem;
            --spacing-md: 1rem;
            --spacing-lg: 1.25rem;
            --border-radius: 8px;
          }

          /* Base styles */
          .course-list-container {
            min-height: 100vh;
            background-color: var(--bg-light);
            padding: var(--spacing-md);
            font-family: Arial, sans-serif;
            box-sizing: border-box;
          }
          .course-list-container.dark {
            background-color: var(--bg-dark);
          }

          .loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 3rem;
            text-align: center;
          }
          .loading h2 {
            font-size: 1.875rem;
            font-weight: normal;
            color: var(--text-light);
            margin-bottom: var(--spacing-sm);
          }
          .loading p {
            color: gray;
          }
          .course-list-container.dark .loading h2,
          .course-list-container.dark .loading p {
            color: var(--text-dark);
          }

          .empty-message {
            margin-top: 2.5rem;
            text-align: center;
            color: var(--text-light);
            font-size: 1.125rem;
          }
          .course-list-container.dark .empty-message p {
            color: var(--text-dark);
          }

          .add-course {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 2rem 0;
          }
          .add-course button {
            background: none;
            border: none;
            cursor: pointer;
            color: var(--accent);
            transition: transform 0.2s;
            padding: var(--spacing-sm);
          }
          .add-course button:hover,
          .add-course button:focus {
            transform: scale(1.1);
            outline: 2px solid var(--accent);
            outline-offset: 2px;
          }
          .add-course p {
            margin-top: var(--spacing-sm);
            color: var(--text-light);
          }
          .course-list-container.dark .add-course p {
            color: var(--text-dark);
          }

          .course-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: var(--spacing-md);
            padding: var(--spacing-md);
            margin-top: var(--spacing-lg);
          }

          .course-card {
            position: relative;
            border-radius: var(--border-radius);
            overflow: hidden;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            aspect-ratio: 16 / 9; /* Maintain consistent aspect ratio */
          }
          .course-card:hover,
          .course-card:focus {
            transform: scale(1.02);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            outline: 2px solid var(--accent);
            outline-offset: 2px;
          }

          .course-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            top: 0;
            left: 0;
          }

          .course-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 123, 255, 0.1);
            padding: var(--spacing-sm);
            border-radius: var(--border-radius);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
          }

          .course-info {
            background-color: var(--accent);
            border: 1px solid var(--accent);
            border-radius: var(--border-radius);
            padding: var(--spacing-sm);
            text-align: center;
            margin: var(--spacing-sm);
          }
          .course-list-container.dark .course-info {
            background-color: "white";
            border-color: var(--text-dark);
          }

          .course-info p {
            color: white;
            font-weight: bold;
            font-size: 1rem;
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .course-list-container.dark .course-info p {
            color: var(--text-dark);
          }

          /* Responsive styles */
          @media (max-width: 1200px) {
            .course-grid {
              grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            }
            .course-info p {
              font-size: 0.85rem;
            }
          }

          @media (max-width: 768px) {
            .course-grid {
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            }
            .course-card {
              aspect-ratio: 4 / 3;
            }
            .course-info {
              padding: 0.375rem;
            }
            .course-info p {
              font-size: 0.8rem;
            }
            .loading h2 {
              font-size: 1.5rem;
            }
            .empty-message p {
              font-size: 1rem;
            }
          }

          @media (max-width: 480px) {
            .course-grid {
              grid-template-columns: 1fr;
            }
            .course-card {
              aspect-ratio: 16 / 9;
            }
            .course-info {
              margin: 0.25rem;
              padding: 0.25rem;
            }
            .course-info p {
              font-size: 0.75rem;
            }
            .loading h2 {
              font-size: 1.25rem;
            }
            .loading p {
              font-size: 0.875rem;
            }
            .empty-message p {
              font-size: 0.875rem;
            }
            .add-course button {
              padding: 0.25rem;
            }
            .add-course p {
              font-size: 0.875rem;
            }
          }
        `}
      </style>
      <div className={`course-list-container ${theme}`}>
        {/* <button
          onClick={toggleTheme}
          style={{
            position: "fixed",
            top: "1rem",
            left: "1rem",
            padding: "0.5rem",
            background: theme === "light" ? "#007bff" : "#d4d4d4",
            color: theme === "light" ? "white" : "#252627",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Toggle {theme === "light" ? "Dark" : "Light"} Mode
        </button> */}
        <div className="course-grid">
          {data.map((course) => (
            <div
              key={course.id}
              className="course-card"
              onClick={() => handleClickCourse(course.courseID)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleClickCourse(course.courseID);
                }
              }}
            >
              <img src={gamiImage} alt="Course background" className="course-image" />
              <div className="course-overlay">
                <div className="course-info">
                  <p>{course.courseID}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseList;