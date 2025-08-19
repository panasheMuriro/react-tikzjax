# React TikZJax

A React component for rendering LaTeX TikZ diagrams using the TikZJax library.

## Installation

```bash
npm install react-tikzjax
# or
yarn add react-tikzjax
```

## Prerequisites

**Important:** This component relies on the TikZJax JavaScript library and fonts. You **must** include these resources in the `<head>` of your main `index.html` file (or equivalent HTML template):

```html
<head>
  <!-- Other head elements -->
  <script src="https://tikzjax-demo.think.somethingorotherwhatever.com/tikzjax.js" defer></script>
</head>
```

Failure to include these will result in errors, as the component calls the global `window.process_tikz` function provided by this library.

## Usage

Here's a basic example of how to use the `TikzJax` component in your React application:

```jsx
import React, { useState } from 'react';
import TikzJax from 'react-tikzjax';

function MyTikzComponent() {
  // State to hold the TikZ commands (without \begin{tikzpicture})
  const [tikzCommands, setTikzCommands] = useState('\\draw (0,0) circle (1in);');

  // Construct the full TikZ environment code
  const fullTikzCode = `\\begin{tikzpicture}
${tikzCommands}
\\end{tikzpicture}`;

  return (
    <div>
      <h2>Edit TikZ Code:</h2>
      <textarea
        value={tikzCommands}
        onChange={(e) => setTikzCommands(e.target.value)}
        rows="6"
        cols="50"
        placeholder="e.g., \\draw (0,0) -- (1,1); \\node at (0.5, 0.5) {Hello};"
      />
      
      <h2>Rendered Diagram:</h2>
      {/* Pass the full TikZ code to the component */}
      <TikzJax
        content={fullTikzCode}
        onError={(error) => {
          console.error("TikZ rendering failed:", error);
          // You could set state here to show an error message to the user
        }}
      />
    </div>
  );
}

export default MyTikzComponent;
```

### Props

| Prop      | Type     | Required | Description                                                                 |
| :-------- | :------- | :------- | :-------------------------------------------------------------------------- |
| `content` | `string` | Yes      | The complete TikZ code, including the `\begin{tikzpicture}` and `\end{tikzpicture}` (or `\begin{tikzcd}`/`\end{tikzcd}`) environment. Remember to escape backslashes (`\\draw` instead of `\draw`). |
| `onError` | `func`   | No       | A callback function `(error: Error) => void` that is invoked if rendering fails. |

## Development (Building the Library with Vite)

If you are contributing to or building this library from source:

1.  Ensure you have Node.js installed.
2.  Clone or download the library source code.
3.  Install dependencies: `npm install` (or `yarn install`).
4.  Build the library: `npm run build` (or `yarn build`).
    *   This uses Vite to bundle the library into the `dist/` folder.
    *   It produces `react-tikzjax.mjs` (ES Module) and `react-tikzjax.umd.cjs` (UMD) bundles, suitable for modern bundlers and direct browser usage, respectively.

## Example Project

An example project demonstrating usage is available. Refer to the project structure or documentation for setup instructions.

## Notes

*   **Backslash Escaping**: Because the `content` prop is a JavaScript string, you must escape backslashes. Use `\\` instead of `\` in your TikZ code strings.
*   **Loading Order**: Ensure the TikZJax scripts in your `index.html` are loaded *before* the `TikzJax` component attempts to render for the first time. Using `defer` on the script tag usually handles this correctly.
*   **Cleanup**: The component handles the creation and cleanup of the necessary DOM `<script>` elements internally.
*   **Environments**: While primarily designed for `tikzpicture`, it should also work with `tikzcd` environments as long as the full code is passed via the `content` prop.

