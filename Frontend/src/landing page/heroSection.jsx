import React from 'react';
import heroImage from '../assets/images/student.png';
import backgroundImage from '../assets/images/bg.jpg'; 
import {Link} from 'react-router-dom';

const HeroSection = () => {
  return (
    <>
      <style>
        {`
          /* Base styles */
          .hero-section {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 4rem 2rem;
            color: #333;
            background-color: white;
            background-image: url(${backgroundImage}); /* Added background image */
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            position: relative;
            max-width: 1200px;
            margin: 0 auto;
            gap: 2rem;
            min-height: 500px;
          }

          .hero-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255, 255, 255, 0.8); /* Increased opacity for readability */
            z-index: -1;
          }

          .hero-logo {
            height: 40px;
            width: auto;
            position: absolute;
            top: 1.5rem;
            left: 1.5rem;
          }

          .hero-content {
            flex: 1;
            max-width: 600px;
          }

          .hero-title {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            line-height: 1.3;
            color: #007bff;
            font-weight: 700;
          }

          .hero-text {
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 2rem;
            color: #555;
          }

          .hero-image-container {
            flex: 1;
            max-width: 500px;
          }

          .hero-img {
            width: 100%;
            height: auto;
            max-height: 400px;
            object-fit: contain;
          }

          .cta-buttons {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
          }

          .button {
            padding: 0.75rem 1.5rem;
            border: none;
            cursor: pointer;
            border-radius: 5px;
            font-size: 1rem;
            transition: all 0.3s ease;
            white-space: nowrap;
            font-weight: 500;
          }

          .button-primary {
            background-color: #007bff;
            color: white;
          }

          .button-primary:hover {
            background-color: #0056b3;
            transform: translateY(-2px);
          }

          .button-secondary {
            background-color: white;
            color: #007bff;
            border: 1px solid #007bff;
          }

          .button-secondary:hover {
            background-color: #f8f9fa;
            transform: translateY(-2px);
          }

          .button-outline {
            background-color: transparent;
            border: 1px solid #007bff;
            color: #007bff;
          }

          .button-outline:hover {
            background-color: #007bff;
            color: white;
            transform: translateY(-2px);
          }

          /* Tablet screens (max-width: 1024px) */
          @media (max-width: 1024px) {
            .hero-section {
              padding: 3rem 1.5rem;
              background-position: center; /* Ensure background stays centered */
            }
            .hero-content {
              max-width: 500px;
            }
            .hero-img {
              max-height: 350px;
            }
          }

          /* Mobile screens (max-width: 768px) */
          @media (max-width: 768px) {
            .hero-section {
              flex-direction: column;
              text-align: center;
              padding: 2rem 1.25rem;
              min-height: auto;
              background-position: top center; /* Adjust for mobile */
            }
            .hero-content {
              max-width: 100%;
              margin-bottom: 2rem;
            }
            .hero-image-container {
              max-width: 100%;
              order: -1; /* Image appears above content */
              margin-bottom: 2rem;
            }
            .hero-img {
              max-height: 300px;
            }
            .hero-logo {
              position: relative;
              top: auto;
              left: auto;
              margin: 0 auto 1.5rem;
            }
            .cta-buttons {
              justify-content: center;
            }
            .hero-overlay {
              background-color: rgba(255, 255, 255, 0.85); /* Slightly stronger overlay */
            }
          }

          /* Small mobile screens (max-width: 480px) */
          @media (max-width: 480px) {
            .hero-section {
              padding: 1.5rem 1rem;
              background-size: cover; /* Ensure background covers small screens */
            }
            .hero-title {
              font-size: 1.8rem;
            }
            .hero-text {
              font-size: 1rem;
            }
            .cta-buttons {
              flex-direction: column;
              gap: 0.75rem;
            }
            .button {
              width: 100%;
            }
            .hero-img {
              max-height: 250px;
            }
            .hero-overlay {
              background-color: rgba(255, 255, 255, 0.9); /* Stronger overlay for readability */
            }
          }
        `}
      </style>

      <section className="hero-section">
        <div className="hero-overlay"></div>
       

        <div className="hero-content">
          <h1 className="hero-title">Ace Your Exams with Smarter Practice</h1>
          <p className="hero-text">
            Prepare for your exams with interactive past questions, comprehensive lecture notes, and personalized flashcards.
          </p>

          <div className="cta-buttons">
            <button className="button button-primary">Get Started</button>
            <button className="button button-secondary">Try Free</button>
            
            <button className="button button-outline">Download App</button>
          </div>
        </div>

        <div className="hero-image-container">
          <img
            src={heroImage}
            alt="Student studying with books and laptop"
            className="hero-img"
            loading="lazy"
          />
        </div>
      </section>
    </>
  );
};

export default HeroSection;