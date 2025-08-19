// src/TikzJax.jsx
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types'; // Make sure to install prop-types

const TikzJax = ({ content, onError }) => {
  const containerRef = useRef(null);
  const scriptRef = useRef(null);

  useEffect(() => {
    const render = () => {
      // Check if TikZJax is loaded
      if (typeof window.process_tikz !== 'function') {
        const error = new Error('TikZJax library not loaded. Ensure https://tikzjax.com/v1/tikzjax.js is included.');
        console.error(error.message);
        if (onError) onError(error);
        return;
      }

      if (containerRef.current) {
        // Clear previous content
        containerRef.current.innerHTML = '';

        // Create the script element for TikZJax
        const scriptElement = document.createElement('script');
        scriptElement.type = 'text/tikz';
        scriptElement.textContent = content;

        scriptRef.current = scriptElement; // Keep reference for cleanup

        containerRef.current.appendChild(scriptElement);

        try {
          // Call the global TikZJax processing function
          window.process_tikz(scriptElement);
        } catch (err) {
          console.error('Error processing TikZ code:', err);
          if (onError) onError(err);
        }
      }
    };

    render();

    // Cleanup: Remove the script element when component unmounts or content changes
    return () => {
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
      }
    };
  }, [content, onError]); // Re-run if content or onError changes

  return <div ref={containerRef} />;
};

TikzJax.propTypes = {
  content: PropTypes.string.isRequired,
  onError: PropTypes.func,
};

TikzJax.defaultProps = {
  onError: null,
};

export default TikzJax;