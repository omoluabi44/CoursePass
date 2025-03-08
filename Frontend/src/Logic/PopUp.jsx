import React, { useState, useEffect } from "react";
import { FaCoffee, FaTimes } from "react-icons/fa";
import "./BuyMeCoffeePopup.css";

const BuyMeCoffeePopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  const closePopup = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    // Show the popup after a 3-second delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Close popup on pressing Escape key
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  if (!isVisible) return null;

  return (
    // Clicking the overlay will close the popup
    <div className="buy-me-coffee-popup" onClick={closePopup}>
      {/* Prevent clicks inside the popup from closing it */}
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closePopup}>
          <FaTimes size={20} />
        </button>
        <h2>Enjoying our app?</h2>
        <p>
          If you like what we do, buy us a coffee to keep the ideas flowing!
        </p>
        <a
          className="buy-me-coffee-btn"
          href="https://coursepasses.vercel.app/paymentPage"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaCoffee size={24} style={{ marginRight: "8px" }} />
          Buy me a coffee
        </a>
      </div>
    </div>
  );
};

export default BuyMeCoffeePopup;
