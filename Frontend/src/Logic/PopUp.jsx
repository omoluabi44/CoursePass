
import React, { useState, useEffect } from "react";
import { FaGift, FaTimes } from "react-icons/fa";
import "./CryptoAirdropPopup.css";

const CryptoAirdropPopup = () => {
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
    <div className="crypto-airdrop-popup" onClick={closePopup}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closePopup}>
          <FaTimes size={20} />
        </button>
        <h2>Download the mobile app(APK)!</h2>
        <p>
         enjoy the full feature by download the apk
        </p>
        <a
          className="crypto-airdrop-btn"
          href="https://expo.dev/artifacts/eas/bbkDXvGtWrC1iuriVMhWbR.apk"  // Replace with your URL
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGift size={24} style={{ marginRight: "8px" }} />
          Join Now
        </a>
      </div>
    </div>
  );
};

export default CryptoAirdropPopup;
