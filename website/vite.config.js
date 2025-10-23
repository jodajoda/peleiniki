import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'
import { glob } from 'glob'

// Custom plugin to inline critical CSS
function criticalCSSPlugin() {
  let config;

  return {
    name: 'vite-plugin-critical-css',
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    async closeBundle() {
      // Only run in production build
      if (config.command !== 'build') return;

      const distDir = resolve(config.root, config.build.outDir);
      const indexPath = resolve(distDir, 'index.html');

      // Check if index.html exists
      if (!fs.existsSync(indexPath)) {
        console.warn('⚠️  index.html not found in dist folder');
        return;
      }

      try {
        console.log('🎨 Inlining critical CSS...');

        // Read HTML
        let html = fs.readFileSync(indexPath, 'utf8');

        // Find all CSS files in dist/assets
        const cssFiles = glob.sync(resolve(distDir, 'assets/*.css'));

        if (cssFiles.length === 0) {
          console.warn('⚠️  No CSS files found in dist/assets');
          return;
        }

        // Read the main CSS file (should be the largest one)
        const cssFile = cssFiles[0];
        const cssContent = fs.readFileSync(cssFile, 'utf8');

        // Extract critical CSS (first ~10KB - above-the-fold styles)
        // This is a simple approach - includes reset, base styles, and initial component styles
        const criticalCSS = extractCriticalCSS(cssContent);

        // Find the CSS link tag (specifically for /assets/*.css files)
        const cssLinkRegex = /<link[^>]*rel="stylesheet"[^>]*href="[^"]*\/assets\/[^"]*\.css"[^>]*>/g;
        const matches = html.match(cssLinkRegex);
        const cssLink = matches?.[0];

        if (cssLink) {
          // Create inline style tag with critical CSS
          const inlineStyle = `<style data-critical>${criticalCSS}</style>`;

          // Modify the link to load asynchronously with preload
          const asyncCSSLink = cssLink.replace(
            'rel="stylesheet"',
            'rel="preload" as="style" onload="this.onload=null;this.rel=\'stylesheet\'"'
          );

          // Add noscript fallback
          const noscriptFallback = `<noscript>${cssLink}</noscript>`;

          // Insert inline CSS before the async link
          html = html.replace(
            cssLink,
            `${inlineStyle}\n    ${asyncCSSLink}\n    ${noscriptFallback}`
          );

          // Write the result
          fs.writeFileSync(indexPath, html);

          const inlinedSize = Buffer.byteLength(criticalCSS, 'utf8');
          console.log('✅ Critical CSS inlined successfully!');
          console.log(`   Inlined: ${(inlinedSize / 1024).toFixed(2)} KB of critical CSS`);
          console.log(`   Remaining CSS will load asynchronously`);
        }
      } catch (error) {
        console.error('❌ Error inlining critical CSS:', error);
      }
    },
  };
}

// Extract critical above-the-fold CSS
function extractCriticalCSS(css) {
  // This is a simplified extraction - you can customize based on your needs
  const criticalSelectors = [
    // Reset and base styles
    /\*,::before,::after/,
    /^html\b/,
    /^body\b/,
    // Tailwind base
    /@tailwind base/,
    // Container and layout
    /\.container/,
    /\.mx-auto/,
    /\.min-h-screen/,
    // Header/Navigation (always visible)
    /header/,
    /nav/,
    /\.fixed/,
    /\.sticky/,
    /\.z-\d+/,
    // Hero section (above fold)
    /\.hero/,
    /\.relative/,
    /\.absolute/,
    /\.inset-/,
    // Common utilities (flex, grid, display)
    /\.flex/,
    /\.grid/,
    /\.block/,
    /\.inline/,
    /\.hidden/,
    // Typography
    /\.text-/,
    /\.font-/,
    /\.leading-/,
    // Spacing (common)
    /\.p-\d/,
    /\.m-\d/,
    /\.pt-/,
    /\.pb-/,
    /\.px-/,
    /\.py-/,
    // Colors (basic)
    /\.bg-white/,
    /\.bg-gray/,
    /\.text-gray/,
    /\.text-white/,
    // Widths and heights
    /\.w-full/,
    /\.h-full/,
    /\.w-screen/,
    /\.h-screen/,
  ];

  // Split CSS into rules
  const rules = css.split('}').map(rule => rule.trim() + '}');

  // Filter critical rules
  const criticalRules = rules.filter(rule => {
    return criticalSelectors.some(selector => selector.test(rule));
  });

  // Take first 15KB of CSS (adjust as needed)
  let criticalCSS = criticalRules.join('\n');

  // If still too large, truncate to ~12KB
  const maxSize = 12 * 1024; // 12KB
  if (Buffer.byteLength(criticalCSS, 'utf8') > maxSize) {
    criticalCSS = criticalCSS.substring(0, maxSize);
    // Ensure we end on a complete rule
    const lastBrace = criticalCSS.lastIndexOf('}');
    if (lastBrace > 0) {
      criticalCSS = criticalCSS.substring(0, lastBrace + 1);
    }
  }

  return criticalCSS;
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    criticalCSSPlugin(),
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
