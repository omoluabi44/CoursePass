import { useEffect, useRef } from 'react';

const MathJaxRenderer = ({ latex }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window.MathJax !== 'undefined') {
      window.MathJax.typeset([containerRef.current]);
    }
  }, [latex]);

  return <div ref={containerRef}>{latex}</div>;
};

// Usage
const App = () => (
  <MathJaxRenderer latex="\frac{d}{dx}f(x) = \lim_{h \to 0} \frac{f(x+h)-f(x)}{h}" />
);