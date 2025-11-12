import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Note: Critical CSS plugin was removed (previously lines 7-168)
// Reason: Plugin was disabled due to navigation styling conflicts
// If critical CSS optimization is needed in future, consider using:
// - @vitejs/plugin-legacy with modern/legacy builds
// - vite-plugin-critical or critters for automated critical CSS extraction

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  base: '/',
  build: {
    outDir: 'dist',
    // Improve build performance and output
    cssCodeSplit: true,
    // Generate source maps for debugging (optional, can disable in production)
    sourcemap: false,
    // Minify output (esbuild is faster than terser and included by default)
    minify: 'esbuild',
    // Rollup options for better optimization
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'emailjs': ['@emailjs/browser'],
        },
      },
    },
    // Chunk size warning limit (500kb)
    chunkSizeWarningLimit: 500,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})
