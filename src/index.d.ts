// src/index.d.ts
import React from 'react';

export interface TikzJaxProps {
  /**
   * The TikZ/LaTeX content to render
   */
  content: string;
  
  /**
   * Error callback function called when rendering fails
   */
  onError?: (error: Error) => void;
  
  /**
   * Additional CSS class name for the container
   */
  className?: string;
  
  /**
   * Inline styles for the container
   */
  style?: React.CSSProperties;
}

/**
 * React component for rendering LaTeX TikZ diagrams using TikZJax
 * 
 * @example
 * ```tsx
 * import TikzJax from 'react-tikzjax';
 * 
 * function MyComponent() {
 *   return (
 *     <TikzJax 
 *       content="\begin{tikzpicture}\draw (0,0) circle (1);\end{tikzpicture}"
 *       onError={(err) => console.error('TikZ error:', err)}
 *     />
 *   );
 * }
 * ```
 */
declare const TikzJax: React.FC<TikzJaxProps>;

export default TikzJax;