import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import s from "./navNextPrev.module.css";

const CourseNavigation = ({ courseId, currentWeek, courseOutline }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = React.useState(false);
  const [timeOutId, setTimeOutId] = React.useState(null);

  // Find the current topic index and determine previous/next topics
  const currentIndex = courseOutline.findIndex((course) => course.week === currentWeek);
  const previousTopic = currentIndex > 0 ? courseOutline[currentIndex - 1] : null;
  const nextTopic = currentIndex < courseOutline.length - 1 ? courseOutline[currentIndex + 1] : null;
  const isFirstTopic = currentIndex === 0;
  const isLastTopic = currentIndex === courseOutline.length - 1;

  // Handle user interaction (touch or scroll)
  const handleInteraction = () => {
    setIsVisible(true); // Show buttons
    if (timeOutId) {
      clearTimeout(timeOutId); // Clear existing timeout
    }
    const id = setTimeout(() => {
      setIsVisible(false); // Hide buttons after 2 seconds of inactivity
    }, 4000);
    setTimeOutId(id);
  };

  // Handle scroll event
  const handleScroll = () => {
    handleInteraction();
  };

  // Handle "Previous" button click
  const handlePrevious = () => {
    if (previousTopic) {
      navigate(`/courses/${courseId}/topics/${previousTopic.week}`, {
        state: {
          week: previousTopic.week,
          topic: previousTopic.topic,
          content: previousTopic.content,
        },
      });
    }
  };

  // Handle "Next" button click
  const handleNext = () => {
    if (nextTopic) {
      navigate(`/courses/${courseId}/topics/${nextTopic.week}`, {
        state: {
          week: nextTopic.week,
          topic: nextTopic.topic,
          content: nextTopic.content,
        },
      });
    }
  };

  // Add event listeners for touch and scroll
  useEffect(() => {
    window.addEventListener("touchstart", handleInteraction);
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [timeOutId]); // Re-run effect when timeoutId changes

  return (
    <>
      <div className={`${s.button_container} ${isVisible ? s.visible : s.hidden}`}>
        <button onClick={handlePrevious} disabled={isFirstTopic}>
          Previous
        </button>
        <button onClick={handleNext} disabled={isLastTopic}>
          Next
        </button>
      </div>
    </>
  );
};

export default CourseNavigation;