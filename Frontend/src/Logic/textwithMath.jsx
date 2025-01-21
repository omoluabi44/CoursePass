import React from 'react';
import { MathJax } from 'better-react-mathjax';

function TextWithMath({ text }) {
  return (
    <MathJax>
      {text}
    </MathJax>
  );
}

export default TextWithMath;