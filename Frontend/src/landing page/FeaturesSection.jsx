import React from 'react';
import featureIcon1 from '../assets/images/quize.png'; // Replace with your icon path

const features = [
  { icon: featureIcon1, title: 'Practice Past Questions', desc: 'Smart quizzes, timed mode, explanations' },
  { icon: featureIcon1, title: 'Lecture Notes', desc: 'Comprehensive and organized' },
  { icon: featureIcon1, title: 'Flashcards', desc: 'Personalized for retention' },
  { icon: featureIcon1, title: 'Performance Tracking', desc: 'Monitor your progress and identify areas for improvement' },
  { icon: featureIcon1, title: 'Community Forum', desc: 'Connect with peers and instructors' },
];

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <div className="features-container">
        <h2>Core Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <img src={feature.icon} alt={feature.title} className="feature-icon" />
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

// CSS (you can use a CSS-in-JS solution or separate CSS file)
const styles = `
  .features-section {
    padding: 4rem 0;
    background-color: #f8f8f8;
  }

  .features-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .features-section h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #007BFF;
    text-align: center;
  }

  /* Grid layout for desktop and tablet */
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .feature-card {
    background: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }

  .feature-icon {
    width: 60px;
    height: 60px;
    object-fit: contain;
    margin-bottom: 1rem;
  }

  .feature-card h3 {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    color: #007BFF;
  }

  .feature-card p {
    font-size: 0.9rem;
    color: #555;
    line-height: 1.5;
  }

  /* Mobile horizontal scroll layout */
  @media (max-width: 768px) {
    .features-grid {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 1rem;
      gap: 1rem;
      grid-auto-columns: minmax(280px, 1fr);
    }

    .features-grid::-webkit-scrollbar {
      display: none;
    }

    .feature-card {
      scroll-snap-align: start;
      min-width: 280px;
      flex: 0 0 auto;
    }
  }

  /* Small mobile adjustments */
  @media (max-width: 480px) {
    .features-section {
      padding: 3rem 0;
    }

    .features-section h2 {
      font-size: 1.75rem;
    }

    .feature-card {
      min-width: 260px;
      padding: 1.25rem;
    }

    .feature-icon {
      width: 50px;
      height: 50px;
    }
  }
`;

// Inject styles (if using CSS-in-JS)
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);