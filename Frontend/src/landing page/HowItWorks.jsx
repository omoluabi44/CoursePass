// src/components/HowItWorks.js
import React from 'react';
import stepIcon1 from '../assets/images/quize.png';

const steps = [
  { icon: stepIcon1, title: 'Sign Up', desc: 'Create your account' },
  { icon: stepIcon1, title: 'Choose Course', desc: 'Select your study focus' },
  { icon: stepIcon1, title: 'Start Studying', desc: 'Use our tools to excel' },
];

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <div className="how-it-works-container">
        <h2>How It Works</h2>
        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{index + 1}</div>
              <img src={step.icon} alt={`Step ${index + 1}`} className="step-icon" />
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

// Updated CSS with mobile number fix
const styles = `
  .how-it-works {
    padding: 4rem 0;
    background-color: #f9f9f9;
  }

  .how-it-works-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .how-it-works h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 3rem;
    color: #007BFF;
  }

  /* Desktop layout */
  .steps-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    justify-items: center;
  }

  .step-card {
    background: white;
    border-radius: 0.5rem;
    padding: 2rem 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    text-align: center;
    max-width: 280px;
    width: 100%;
    position: relative;
    margin-top: 2rem; /* Space for number */
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .step-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }

  .step-number {
    position: absolute;
    top: -1.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 3rem;
    height: 3rem;
    background-color: #007BFF;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.25rem;
  }

  .step-icon {
    width: 80px;
    height: 80px;
    object-fit: contain;
    margin-bottom: 1rem;
  }

  .step-card h3 {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    color: #333;
  }

  .step-card p {
    font-size: 0.9rem;
    color: #666;
    line-height: 1.5;
  }

  /* Tablet layout */
  @media (max-width: 768px) {
    .steps-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* Mobile layout */
  @media (max-width: 576px) {
    .steps-container {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      padding: 1rem 0 2rem; /* Added top padding for numbers */
      gap: 1rem;
      justify-content: flex-start;
    }

    .steps-container::-webkit-scrollbar {
      display: none;
    }

    .step-card {
      scroll-snap-align: start;
      min-width: 260px;
      flex: 0 0 auto;
      padding: 1.5rem 1rem;
      margin-top: 1.5rem; /* Reduced for mobile */
    }

    .step-number {
      top: -1rem; /* Adjusted for mobile */
      width: 2.5rem;
      height: 2.5rem;
      font-size: 1.1rem;
    }

    .how-it-works h2 {
      margin-bottom: 2rem;
      font-size: 1.5rem;
    }

    .step-icon {
      width: 70px;
      height: 70px;
    }
  }
`;

// Inject styles
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);