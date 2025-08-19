// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({ jsxRuntime: "classic" }),
  ],
  build: {
    lib: {
      entry: "src/TikzJax.jsx",
      name: "react-tikzjax",
      formats: ["es", "umd"],
      fileName: (format) => `react-tikzjax.${format}.js`, // es -> react-tikzjax.es.js, umd -> react-tikzjax.umd.js
    },
    rollupOptions: {
      external: ["react", "react-dom", "prop-types"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "prop-types": "PropTypes",
        },
      },
    },
  },
});
