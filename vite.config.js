// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path'; // Node.js path module

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      // The entry point for your library
      entry: resolve(__dirname, 'src/index.jsx'),
      // The name of the generated files
      name: 'ReactTikzJax',
      // Output formats: ESM and UMD
      formats: ['es', 'umd'],
      // File names for the generated bundles
      fileName: (format) => `react-tikzjax.${format === 'es' ? 'mjs' : 'umd.cjs'}`,
    },
    rollupOptions: {
      // Make sure to externalize dependencies that shouldn't be bundled
      external: ['react', 'react-dom', 'prop-types'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'prop-types': 'PropTypes'
        },
      },
    },
  },
});