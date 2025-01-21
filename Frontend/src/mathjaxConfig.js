


const config = {
  loader: { load: ['input/tex', 'output/svg'] }, 
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
  },
  svg: {
    fontCache: 'global', 
  },
};

export default config;