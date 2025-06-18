import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

const testimonials = [
  { 
    id: 1,
    quote: 'This app helped me ace my finals! The practice questions were exactly what showed up on my exam.', 
    name: 'Jane D.',
    role: 'Medical Student' 
  },
  { 
    id: 2,
    quote: 'The flashcards are a game-changer. I improved my retention by 40% compared to traditional studying.', 
    name: 'Mike S.',
    role: 'Engineering Student'
  },
  { 
    id: 3,
    quote: 'Finally an app that understands how students actually study. The interface is intuitive and the content is top-notch.', 
    name: 'Sarah K.',
    role: 'Law Student'
  },
  { 
    id: 4,
    quote: 'The performance tracking helped me identify my weak areas and focus my study time more effectively.', 
    name: 'David L.',
    role: 'Business Student'
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const controls = useAnimation();
  const containerRef = useRef(null);
  const isMobile = window.innerWidth <= 768;

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Animation when activeIndex changes
  useEffect(() => {
    controls.start({
      opacity: [0, 1],
      x: isMobile ? [100, 0] : 0,
      transition: { duration: 0.8 }
    });
  }, [activeIndex, controls, isMobile]);

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <h2>What Our Students Say</h2>
        <p className="section-subtitle">Don't just take our word for it - hear from students who've found success</p>
        
        {/* Desktop Grid Layout */}
        {!isMobile && (
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="testimonial-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="quote-icon">“</div>
                <blockquote className="testimonial-quote">{testimonial.quote}</blockquote>
                <div className="testimonial-author">
                  <div className="author-details">
                    <span className="author-name">{testimonial.name}</span>
                    <span className="author-role">{testimonial.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Mobile Carousel */}
        {isMobile && (
          <div className="mobile-carousel-container" ref={containerRef}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="testimonial-card"
                initial={{ opacity: 0, x: 100 }}
                animate={controls}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.8 }}
              >
                <div className="quote-icon">“</div>
                <blockquote className="testimonial-quote">{testimonials[activeIndex].quote}</blockquote>
                <div className="testimonial-author">
                  <div className="author-details">
                    <span className="author-name">{testimonials[activeIndex].name}</span>
                    <span className="author-role">{testimonials[activeIndex].role}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="carousel-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;

// CSS Styles
const styles = `
  .testimonials-section {
    padding: 5rem 0;
    background-color: #f8f9fa;
    overflow: hidden;
  }

  .testimonials-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .testimonials-section h2 {
    text-align: center;
    font-size: 2.25rem;
    margin-bottom: 1rem;
    color: #007BFF;
  }

  .section-subtitle {
    text-align: center;
    font-size: 1.1rem;
    color: #6c757d;
    max-width: 700px;
    margin: 0 auto 3rem;
    line-height: 1.6;
  }

  /* Desktop Grid Layout */
  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  /* Testimonial Card Styles */
  .testimonial-card {
    background: white;
    border-radius: 0.5rem;
    padding: 2rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    position: relative;
    min-width: 0; /* Fix flexbox overflow */
  }

  .quote-icon {
    font-size: 4rem;
    color: #007BFF;
    opacity: 0.1;
    position: absolute;
    top: 0.5rem;
    left: 1rem;
    line-height: 1;
  }

  .testimonial-quote {
    font-size: 1rem;
    line-height: 1.7;
    color: #495057;
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 1;
  }

  .testimonial-author {
    display: flex;
    align-items: center;
  }

  .author-details {
    display: flex;
    flex-direction: column;
  }

  .author-name {
    font-weight: 600;
    color: #212529;
  }

  .author-role {
    font-size: 0.85rem;
    color: #6c757d;
  }

  /* Mobile Carousel */
  .mobile-carousel-container {
    position: relative;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .mobile-carousel-container .testimonial-card {
    width: 85vw;
    max-width: 400px;
    margin: 0 auto;
  }

  .carousel-dots {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    gap: 0.5rem;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #dee2e6;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .dot.active {
    background: #007BFF;
    transform: scale(1.2);
  }

  /* Responsive Adjustments */
  @media (max-width: 768px) {
    .testimonials-section {
      padding: 3rem 0;
    }

    .testimonials-section h2 {
      font-size: 1.8rem;
    }

    .section-subtitle {
      font-size: 1rem;
      margin-bottom: 2rem;
    }
  }

  @media (max-width: 480px) {
    .testimonial-quote {
      font-size: 0.95rem;
    }
  }
`;

// Inject styles
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);