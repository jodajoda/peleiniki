# Improvements for Pelei Niki Photography Portfolio

This document outlines recommended improvements across code quality, performance, testing, accessibility, SEO, security, and user experience.

**Last Updated:** 2025-10-16
**Status:** In Progress - Code Quality, Dependencies, SEO & User Experience Completed

---

## Table of Contents

1. [Code Quality Issues](#1-code-quality-issues)
2. [Performance Optimizations](#2-performance-optimizations)
3. [SEO Improvements](#3-seo-improvements)
4. [Accessibility Enhancements](#4-accessibility-enhancements)
5. [Security Hardening](#5-security-hardening)
6. [Testing Gaps](#6-testing-gaps)
7. [User Experience Enhancements](#7-user-experience-enhancements)
8. [Developer Experience](#8-developer-experience)
9. [Dependency Updates](#9-dependency-updates)
10. [Content Improvements](#10-content-improvements)
11. [Build & Deployment](#11-build--deployment)
12. [Portfolio-Specific Features](#12-portfolio-specific-features)
13. [Priority Recommendations](#priority-recommendations)

---

## 1. Code Quality Issues ✅

### High Priority ESLint Errors - COMPLETED

**Status:** ✅ Completed on 2025-10-15

**Issue:** ESLint errors preventing clean builds

**Locations Fixed:**
- ✅ `website/playwright.config.js:14,17,70` - `process` is not defined
- ✅ `website/src/components/LazyImage.jsx:30` - React Hooks exhaustive-deps warning
- ✅ `website/tests/lightbox.spec.js:26` - Unused variable `e`

**Solution Implemented:**
```javascript
// eslint.config.js - Added Node.js globals for Playwright config and test files
{
  files: ['playwright.config.js', 'tests/**/*.js'],
  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
}

// LazyImage.jsx - Fixed ref cleanup
useEffect(() => {
  const currentRef = imgRef.current;
  const observer = new IntersectionObserver(/* ... */);

  if (currentRef) {
    observer.observe(currentRef);
  }

  return () => {
    if (currentRef) {
      observer.unobserve(currentRef);
    }
  };
}, []);

// lightbox.spec.js - Removed unused variable
catch {
  // Lightbox not open, that's fine
}
```

**Verification:**
- ✅ `npm run lint` passes with zero errors
- ✅ All ESLint warnings resolved

**Impact:** Clean linting, better code quality, fewer warnings in CI/CD

---

## 2. Performance Optimizations

### 2.1 Image Optimization

**Status:** ✅ Basic optimization completed on 2025-10-15

**Completed Work:**
- ✅ Created [optimize-images.sh](optimize-images.sh) script using macOS native `sips` tool
- ✅ Optimized all 55 images in portfolio
- ✅ Reduced total asset size from 45MB to 38MB (7MB saved, 16% reduction)
- ✅ Resized oversized images (>2000px) to web-appropriate dimensions
- ✅ Applied 85% JPEG quality compression
- ✅ Created backup of original images
- **Key savings:**
  - Images >1MB reduced by 56-65%
  - Resized 13 oversized images (2048x1365 → 2000x1333 max)
  - All images now optimized for web delivery

**Remaining Improvements:**

#### Responsive Images with srcset
```jsx
<LazyImage
  src="/peleiniki/assets/portfolio/image.jpg"
  srcset="/peleiniki/assets/portfolio/image-400w.jpg 400w,
          /peleiniki/assets/portfolio/image-800w.jpg 800w,
          /peleiniki/assets/portfolio/image-1200w.jpg 1200w"
  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         33vw"
  alt="Photo description"
/>
```

#### WebP Format with Fallback
```jsx
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <source srcSet="image.jpg" type="image/jpeg" />
  <img src="image.jpg" alt="..." />
</picture>
```

#### Blur-up Placeholders (LQIP)
- Generate low-quality placeholder images (20x20px, base64)
- Show while full image loads
- Smooth transition when loaded

#### Layout Shift Prevention
```jsx
<img
  src="..."
  alt="..."
  width={800}
  height={600}
  className="..."
/>
```

**Impact (Basic Optimization):** ✅ 16% reduction in asset size, faster initial page loads
**Additional Impact (Advanced):** 40-60% faster page loads with srcset/WebP, better Core Web Vitals scores

---

### 2.2 Code Splitting

**Current Issue:** All code loads upfront

**Recommended Implementation:**

```jsx
// App.jsx - Lazy load routes
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        {/* ... */}
      </Routes>
    </Suspense>
  );
}
```

**Impact:** Smaller initial bundle, faster time-to-interactive

---

### 2.3 Virtual Scrolling

**For:** Large portfolio galleries (>50 images)

**Libraries to Consider:**
- `react-window`
- `react-virtual`

**Impact:** Smooth scrolling with hundreds of images

---

### 2.4 Bundle Analysis

**Add to package.json:**
```json
{
  "scripts": {
    "analyze": "vite build --mode analyze && npx vite-bundle-visualizer"
  },
  "devDependencies": {
    "rollup-plugin-visualizer": "^5.12.0"
  }
}
```

**Impact:** Identify and optimize large dependencies

---

## 3. SEO Improvements

### 3.1 Meta Tags

**Status:** ✅ Completed on 2025-10-15

**Completed Work:**
- ✅ Created dynamic [SEO.jsx](website/src/components/SEO.jsx) component for meta tag management
- ✅ Added comprehensive meta tags to [index.html](website/index.html):
  - Primary meta tags (description, keywords, author, robots)
  - Open Graph tags for Facebook/social sharing
  - Twitter Card metadata
  - Canonical URLs
  - Hungarian locale (hu_HU)
- ✅ Implemented page-specific SEO for all 7 pages:
  - Home, Photoshooting, Portfolio, About, Packages, Contact, Privacy Policy
  - Each page has unique title, description, keywords, and OG image
- ✅ Dynamic title updates using React useEffect
- ✅ All routing tests pass (22/22)

**Remaining Work:**

---

### 3.2 JSON-LD Structured Data

**Status:** ✅ Completed on 2025-10-15

**Completed Work:**
- ✅ Enhanced [SEO.jsx](website/src/components/SEO.jsx) to support structured data injection
- ✅ Added comprehensive ProfessionalService schema to [Home.jsx](website/src/pages/Home.jsx#L5-L41)
  - Business information (name, description, URL)
  - Contact details (email, telephone)
  - Location (Budapest, Hungary with geo-coordinates)
  - Service types (családi fotózás, gyermekfotózás, kismama fotózás, etc.)
  - Social media links (Facebook, Instagram)
  - Price range indicator
- ✅ Structured data automatically injected into `<head>` via React useEffect
- ✅ Proper cleanup on component unmount

**Impact:** ✅ Enhanced search engine visibility, eligibility for rich snippets in Google

---

### 3.3 Sitemap & Robots.txt

**Status:** ✅ Completed on 2025-10-15

**Completed Work:**
- ✅ Created [sitemap.xml](website/public/sitemap.xml) with all 7 pages
  - Includes priority levels (homepage: 1.0, portfolio: 0.9, etc.)
  - Change frequency hints for search engines
  - Last modification dates
  - Image sitemaps for all main page images
- ✅ Created [robots.txt](website/public/robots.txt)
  - Allows all major search engines (Google, Bing, DuckDuckGo, Yandex, Baidu)
  - Allows social media crawlers (Facebook, Twitter)
  - Excludes admin and config directories
  - References sitemap location
- ✅ Both files automatically copied to dist/ during build

**Impact:** ✅ Better crawling efficiency, improved search engine indexation

---

### 3.4 Dynamic Page Titles

**Status:** ✅ Completed via SEO component (no react-helmet-async needed)

Already implemented in [SEO.jsx](website/src/components/SEO.jsx#L43-L44) using native React and DOM APIs.

---

### 3.5 Future SEO Enhancements

**Potential additions:**

- [ ] Add breadcrumb structured data for navigation
- [ ] Add ImageObject schema for portfolio images
- [ ] Implement AggregateRating if collecting reviews
- [ ] Add FAQ schema if adding FAQ section

---

## 4. Accessibility Enhancements

### 4.1 Form Accessibility

**Improve error messaging:**

```jsx
<div>
  <label htmlFor="email">Email *</label>
  <input
    id="email"
    name="email"
    type="email"
    aria-describedby={errors.email ? "email-error" : undefined}
    aria-invalid={errors.email ? "true" : "false"}
  />
  {errors.email && (
    <p id="email-error" role="alert" className="text-red-600">
      {errors.email}
    </p>
  )}
</div>
```

---

### 4.2 Skip to Content Link

**Add to Navigation component:**

```jsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary-700 focus:text-white focus:px-4 focus:py-2 focus:rounded"
>
  Skip to main content
</a>

{/* In each page */}
<main id="main-content" tabIndex={-1}>
  {/* page content */}
</main>
```

---

### 4.3 Enhanced Focus Indicators

**Update index.css:**

```css
/* High-contrast focus indicators */
*:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 2px;
}

/* Remove default outline */
*:focus {
  outline: none;
}
```

**Impact:** Better keyboard navigation, WCAG 2.1 AAA compliance

---

## 5. Security Hardening

### 5.1 Content Security Policy

**Add to index.html:**

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' https://cdn.emailjs.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://api.emailjs.com;
">
```

**Impact:** Prevent XSS attacks, restrict resource loading

---

### 5.2 Contact Form Security

**Add honeypot field:**

```jsx
{/* Hidden field - bots will fill it */}
<input
  type="text"
  name="website"
  style={{ display: 'none' }}
  tabIndex={-1}
  autoComplete="off"
/>

// In handleSubmit
if (formData.website) {
  // Likely a bot
  return;
}
```

**Add input sanitization:**

```bash
npm install dompurify
```

```jsx
import DOMPurify from 'dompurify';

const sanitizedData = {
  name: DOMPurify.sanitize(formData.name),
  email: DOMPurify.sanitize(formData.email),
  message: DOMPurify.sanitize(formData.message),
};
```

---

### 5.3 Phone Number Validation

```jsx
const validatePhone = (phone) => {
  const phoneRegex = /^[\d\s\+\-\(\)]+$/;
  return !phone || phoneRegex.test(phone);
};
```

**Impact:** Reduced spam, better data quality

---

## 6. Testing Gaps

### 6.1 Missing Test Coverage

**Components without tests:**
- Home page
- About page
- Packages page
- Photoshooting page
- PrivacyPolicy page
- Footer component
- ScrollToTop component

**Recommended tests:**

```javascript
// tests/pages.spec.js
test('Home page displays featured gallery', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Pelei Niki' })).toBeVisible();
  // ... more assertions
});
```

---

### 6.2 Accessibility Testing

**Add axe-core integration:**

```bash
npm install -D axe-playwright
```

```javascript
// tests/accessibility.spec.js
import { injectAxe, checkA11y } from 'axe-playwright';

test('Home page has no accessibility violations', async ({ page }) => {
  await page.goto('/');
  await injectAxe(page);
  await checkA11y(page);
});
```

---

### 6.3 Visual Regression Testing

**Consider Percy or Chromatic for visual testing:**

```bash
npm install -D @percy/cli @percy/playwright
```

---

### 6.4 Performance Testing

**Add Lighthouse CI:**

```bash
npm install -D @lhci/cli
```

```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:5173/peleiniki/"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "performance": ["error", { "minScore": 0.9 }],
        "accessibility": ["error", { "minScore": 0.95 }]
      }
    }
  }
}
```

**Impact:** Comprehensive quality assurance

---

## 7. User Experience Enhancements ✅

**Status:** ✅ Completed on 2025-10-16

### 7.1 Loading States - COMPLETED

**Status:** ✅ Completed on 2025-10-16

**Completed Work:**
- ✅ Created [SkeletonImage.jsx](website/src/components/SkeletonImage.jsx) component
  - Shimmer animation effect for loading states
  - Responsive design with aspect ratio preservation
  - Reusable across the application
- ✅ Created [SkeletonGallery.jsx](website/src/components/SkeletonGallery.jsx) component
  - Grid layout matching portfolio design
  - Configurable number of skeleton items
  - Ready for integration in portfolio/gallery pages

**Implementation:**
```jsx
// components/SkeletonImage.jsx
function SkeletonImage({ className = '' }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
        <div className="aspect-[4/3] w-full"></div>
      </div>
    </div>
  );
}
```

**Impact:** ✅ Better perceived performance, smoother user experience during content loading

---

### 7.2 Error Boundaries - COMPLETED

**Status:** ✅ Completed on 2025-10-16

**Completed Work:**
- ✅ Created [ErrorBoundary.jsx](website/src/components/ErrorBoundary.jsx) component
  - Catches React errors at component level
  - Prevents entire app from crashing
  - User-friendly error message in Hungarian
  - Developer error details (development mode only)
  - Two recovery options: reload page or return to homepage
- ✅ Integrated ErrorBoundary in [App.jsx](website/src/App.jsx#L17)
  - Wraps entire application for global error handling
  - Graceful error recovery

**Implementation:**
```jsx
// App.jsx
function App() {
  return (
    <ErrorBoundary>
      <Router basename="/peleiniki">
        {/* app content */}
      </Router>
    </ErrorBoundary>
  );
}
```

**Impact:** ✅ Prevents white screen of death, better error recovery, improved user confidence

---

### 7.3 404 Page - COMPLETED

**Status:** ✅ Completed on 2025-10-16

**Completed Work:**
- ✅ Created [NotFound.jsx](website/src/pages/NotFound.jsx) page component
  - Beautiful gradient background matching brand colors
  - Clear 404 heading and explanation
  - Two call-to-action buttons (homepage, portfolio)
  - Quick navigation links to main pages
  - SEO meta tags included
  - Animated entrance with staggered delays
- ✅ Added catch-all route in [App.jsx](website/src/App.jsx#L37)
  - `<Route path="*" element={<NotFound />} />`
- ✅ All tests pass (58/58 including 404 handling test)

**Impact:** ✅ Professional handling of invalid URLs, reduced user confusion, better navigation recovery

---

### 7.4 Touch Gestures in Lightbox - COMPLETED

**Status:** ✅ Completed on 2025-10-16

**Completed Work:**
- ✅ Installed `react-swipeable` library (v7.0.2)
- ✅ Enhanced [Lightbox.jsx](website/src/components/Lightbox.jsx) with touch support
  - Swipe left to view next image
  - Swipe right to view previous image
  - Mouse drag support enabled via `trackMouse: true`
  - Prevents default touch events for smooth interaction
  - Minimum swipe distance of 50px to prevent accidental triggers
  - Image marked as non-draggable for better UX
  - Touch-friendly CSS classes added

**Implementation:**
```jsx
// Lightbox.jsx
import { useSwipeable } from 'react-swipeable';

const swipeHandlers = useSwipeable({
  onSwipedLeft: () => {
    if (currentIndex < images.length - 1) {
      handleNext();
    }
  },
  onSwipedRight: () => {
    if (currentIndex > 0) {
      handlePrev();
    }
  },
  preventDefaultTouchmoveEvent: true,
  trackMouse: true,
  delta: 50,
});

<div {...swipeHandlers} className="max-w-7xl max-h-[90vh] p-4 touch-pan-y select-none">
  <img src={currentImage.src} alt={currentImage.alt} draggable={false} />
</div>
```

**Impact:** ✅ Significantly better mobile user experience, intuitive navigation, modern touch interactions

---

**Overall Section Impact:** ✅ Professional-grade user experience with error handling, loading states, 404 page, and touch gestures. All 58 tests pass, build successful, zero ESLint errors.

---

## 8. Developer Experience

### 8.1 Code Formatting

**Add Prettier:**

```bash
npm install -D prettier eslint-config-prettier
```

**.prettierrc:**
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

**Update package.json:**
```json
{
  "scripts": {
    "format": "prettier --write \"src/**/*.{js,jsx,json,css}\"",
    "format:check": "prettier --check \"src/**/*.{js,jsx,json,css}\""
  }
}
```

---

### 8.2 Git Hooks

**Add Husky:**

```bash
npm install -D husky lint-staged
npx husky install
```

**.husky/pre-commit:**
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

**package.json:**
```json
{
  "lint-staged": {
    "*.{js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{json,css,md}": ["prettier --write"]
  }
}
```

---

### 8.3 Conventional Commits

**Add commitlint:**

```bash
npm install -D @commitlint/cli @commitlint/config-conventional
```

**commitlint.config.js:**
```javascript
export default {
  extends: ['@commitlint/config-conventional']
};
```

---

### 8.4 JSDoc Documentation

**Add to components:**

```jsx
/**
 * Lazy loading image component with shimmer placeholder
 * @param {Object} props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text for accessibility
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element}
 */
function LazyImage({ src, alt, className }) {
  // ...
}
```

**Impact:** Better code maintainability, easier onboarding

---

## 9. Dependency Updates

### Current Outdated Packages

| Package | Current | Latest | Type | Breaking |
|---------|---------|--------|------|----------|
| @types/react-dom | 19.2.1 | 19.2.2 | patch | No |
| eslint-plugin-react-hooks | 5.2.0 | 7.0.0 | major | Yes |
| tailwindcss | 3.4.18 | 4.1.14 | major | Yes |
| vite | 7.1.9 | 7.1.10 | patch | No |

### Update Strategy

**Safe updates (patches):**
```bash
cd website
npm update @types/react-dom vite
```

**Major updates (require testing):**
```bash
# Test in separate branch
npm install eslint-plugin-react-hooks@latest
npm run lint
npm test

# Tailwind v4 requires migration
# See: https://tailwindcss.com/docs/upgrade-guide
```

**Impact:** Security patches, bug fixes, new features

---

## 10. Content Improvements

### Placeholder Content to Replace

**High Priority:**

1. **Phone Number** ([Contact.jsx:157-161](website/src/pages/Contact.jsx))
   ```jsx
   // Replace:
   <a href="tel:YOUR_PHONE">YOUR_PHONE_NUMBER</a>
   // With actual phone number
   ```

2. **Social Media URLs** ([Contact.jsx:173-186](website/src/pages/Contact.jsx))
   ```jsx
   // Replace:
   href="YOUR_INSTAGRAM_URL"
   href="YOUR_FACEBOOK_URL"
   // With actual URLs
   ```

3. **Footer Social Links** (Footer.jsx)
   - Update all social media URLs

**Impact:** Professional appearance, functional contact info

---

## 11. Build & Deployment

### 11.1 Build Optimization

**Enable CSS purging in production:**

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  // Purging happens automatically in production
}
```

---

### 11.2 Compression

**Add to Vite config:**

```bash
npm install -D vite-plugin-compression
```

```javascript
// vite.config.js
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
});
```

---

### 11.3 Service Worker (PWA)

**Add PWA support:**

```bash
npm install -D vite-plugin-pwa
```

```javascript
// vite.config.js
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Pelei Niki Fotográfus',
        short_name: 'Pelei Niki',
        theme_color: '#8b7355',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
```

**Impact:** Offline support, faster repeat visits, app-like experience

---

### 11.4 Analytics & Monitoring

**Google Analytics (privacy-focused alternative: Plausible):**

```jsx
// Use React Helmet to add GA script
<Helmet>
  <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
  <script>
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
    `}
  </script>
</Helmet>
```

**Error Tracking (Sentry):**

```bash
npm install @sentry/react
```

```jsx
// main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
});
```

**Impact:** Data-driven decisions, proactive error fixing

---

## 12. Portfolio-Specific Features

### 12.1 Image Protection

**Right-click protection:**

```jsx
<img
  src={image.src}
  alt={image.alt}
  onContextMenu={(e) => e.preventDefault()}
  draggable={false}
/>
```

**CSS watermark:**

```css
.portfolio-image::after {
  content: '© Pelei Niki';
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  pointer-events: none;
}
```

---

### 12.2 Enhanced Lightbox

**Zoom functionality:**

```bash
npm install react-zoom-pan-pinch
```

```jsx
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function Lightbox({ image }) {
  return (
    <TransformWrapper>
      <TransformComponent>
        <img src={image.src} alt={image.alt} />
      </TransformComponent>
    </TransformWrapper>
  );
}
```

---

### 12.3 Image Metadata Display

**Show EXIF data:**

```bash
npm install exif-js
```

```jsx
import EXIF from 'exif-js';

function ImageDetails({ image }) {
  const [exif, setExif] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = image.src;
    img.onload = () => {
      EXIF.getData(img, function() {
        setExif({
          camera: EXIF.getTag(this, 'Model'),
          fStop: EXIF.getTag(this, 'FNumber'),
          iso: EXIF.getTag(this, 'ISOSpeedRatings'),
        });
      });
    };
  }, [image]);

  return exif && (
    <div className="text-sm text-gray-400">
      {exif.camera} | f/{exif.fStop} | ISO {exif.iso}
    </div>
  );
}
```

---

### 12.4 Masonry Grid Layout

```bash
npm install react-masonry-css
```

```jsx
import Masonry from 'react-masonry-css';

function Portfolio() {
  const breakpointColumns = {
    default: 3,
    1024: 2,
    640: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="masonry-grid"
      columnClassName="masonry-column"
    >
      {images.map(image => (
        <LazyImage key={image.id} {...image} />
      ))}
    </Masonry>
  );
}
```

---

### 12.5 Business Features

**Booking Integration:**
- Calendly embed
- Custom booking form with date picker

**Package Comparison:**
```jsx
function PackageComparison() {
  return (
    <table className="comparison-table">
      <thead>
        <tr>
          <th>Jellemző</th>
          <th>Alap csomag</th>
          <th>Prémium csomag</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Fotózás időtartama</td>
          <td>1 óra</td>
          <td>2 óra</td>
        </tr>
        {/* ... */}
      </tbody>
    </table>
  );
}
```

**Testimonials Section:**
```jsx
function Testimonials() {
  const testimonials = [
    {
      name: 'Kiss Anna',
      text: 'Csodálatos élmény volt...',
      rating: 5,
    },
  ];

  return (
    <div className="testimonials">
      {testimonials.map(t => (
        <blockquote key={t.name}>
          <p>{t.text}</p>
          <cite>— {t.name}</cite>
          <div className="rating">{'⭐'.repeat(t.rating)}</div>
        </blockquote>
      ))}
    </div>
  );
}
```

**Impact:** Better client engagement, increased bookings

---

## 13. Priority Recommendations

### Immediate (Critical) - Do This Week

**Estimated Time:** 2-4 hours (30 min remaining)

- [x] ✅ Fix ESLint errors (15 min) - **COMPLETED 2025-10-15**
  - ✅ `playwright.config.js` - Added Node.js globals to eslint.config.js
  - ✅ `LazyImage.jsx` - Fixed ref cleanup
  - ✅ `lightbox.spec.js` - Removed unused variable

- [ ] Replace placeholder content (30 min)
  - Contact page phone number
  - Social media URLs (Contact & Footer)

- [x] ✅ Update dependencies with security patches (15 min) - **COMPLETED 2025-10-15**
  - ✅ Updated `@types/react-dom` 19.2.1 → 19.2.2
  - ✅ Updated `vite` 7.1.9 → 7.1.10
  - ✅ Updated `eslint-plugin-react-refresh` 0.4.23 → 0.4.24
  - ✅ All tests pass (58/58)
  - ✅ Lint successful
  - ✅ Build successful
  - ✅ 0 vulnerabilities found

- [x] ✅ Add basic SEO meta tags (1 hour) - **COMPLETED 2025-10-15**
  - ✅ Created reusable [SEO.jsx](website/src/components/SEO.jsx) component
  - ✅ Added comprehensive meta tags to [index.html](website/index.html)
  - ✅ Open Graph tags (Facebook sharing)
  - ✅ Twitter Card metadata
  - ✅ Page-specific descriptions for all 7 pages
  - ✅ Canonical URLs for all pages
  - ✅ Keywords and author metadata
  - ✅ Hungarian locale (hu_HU)
  - ✅ Dynamic title updates per page
  - ✅ Installed prop-types dependency
  - ✅ All tests pass (22/22 routing tests)
  - ✅ Build successful

**Impact:** Professional appearance, clean builds, better discoverability

---

### Short-term (High Impact) - Do This Month

**Estimated Time:** 1-2 weeks (50% completed)

- [x] ✅ Basic image optimization (COMPLETED 2025-10-15)
  - ✅ Resize oversized images
  - ✅ Apply JPEG compression
  - ✅ Reduce asset size by 16%
- [ ] Advanced image optimization (2-3 days remaining)
  - Generate responsive images (srcset)
  - Convert to WebP format
  - Add blur-up placeholders
  - Implement lazy loading improvements

- [ ] Add comprehensive test coverage (3-4 days)
  - Page component tests
  - Accessibility tests (axe-core)
  - Visual regression tests
  - Performance tests

- [x] ✅ Improve mobile UX (COMPLETED 2025-10-16)
  - ✅ Touch gestures in lightbox
  - ✅ Swipe navigation support
  - ✅ Mouse drag support

- [x] ✅ Add error boundaries and 404 page (COMPLETED 2025-10-16)
  - ✅ Global error boundary component
  - ✅ User-friendly error messages
  - ✅ 404 NotFound page with navigation
  - ✅ Loading skeleton components

- [ ] Implement code splitting (1 day)
  - Lazy load routes
  - Split portfolio images

**Impact:** ✅ Significantly better UX with error handling and touch gestures. Performance and testing improvements still needed.

---

### Medium-term (Quality of Life) - Do This Quarter

**Estimated Time:** 2-4 weeks

- [ ] Developer experience improvements (1 week)
  - Add Prettier
  - Configure Husky + lint-staged
  - Add conventional commits
  - JSDoc documentation

- [ ] Security hardening (3-4 days)
  - Implement CSP
  - Add honeypot to contact form
  - Input sanitization
  - Phone validation

- [ ] Advanced SEO (2-3 days)
  - JSON-LD structured data
  - Dynamic page titles
  - Generate sitemap.xml
  - robots.txt

- [ ] Analytics & monitoring (2-3 days)
  - Set up Google Analytics or Plausible
  - Implement error tracking (Sentry)
  - Add performance monitoring

**Impact:** Better development workflow, enhanced security, measurable growth

---

### Long-term (Nice to Have) - Future Roadmap

**Estimated Time:** 1-3 months

- [ ] PWA implementation (1 week)
  - Service worker
  - Offline support
  - App manifest
  - Install prompts

- [ ] Advanced portfolio features (2-3 weeks)
  - Image zoom in lightbox
  - EXIF metadata display
  - Masonry grid layout
  - Image protection (watermarks)

- [ ] Business features (3-4 weeks)
  - Booking integration
  - Package comparison tool
  - Client testimonials
  - FAQ section
  - Blog functionality

- [ ] Design system (2-3 weeks)
  - Storybook setup
  - Component documentation
  - Design tokens
  - Pattern library

**Impact:** Professional-grade features, better client engagement, scalable codebase

---

## Implementation Notes

### Getting Started

1. **Create a feature branch:**
   ```bash
   git checkout -b improvements/critical-fixes
   ```

2. **Prioritize by impact:**
   - Start with critical issues (ESLint, placeholders)
   - Move to high-impact improvements (images, tests)
   - Add nice-to-have features gradually

3. **Test thoroughly:**
   - Run tests after each change
   - Check in multiple browsers
   - Test on mobile devices

4. **Document changes:**
   - Update CLAUDE.md if architecture changes
   - Add comments for complex code
   - Update README if new scripts added

### Measuring Success

**Performance Metrics:**
- Lighthouse score >90 for all categories
- Page load time <2 seconds
- Largest Contentful Paint <2.5s
- First Input Delay <100ms

**Quality Metrics:**
- Zero ESLint errors/warnings
- 80%+ test coverage
- Zero accessibility violations
- 100% of placeholders replaced

**Business Metrics:**
- Increased contact form submissions
- Lower bounce rate
- Higher time on site
- More portfolio views

---

## Questions or Need Help?

- Review [CLAUDE.md](CLAUDE.md) for project overview
- Check [TESTING.md](TESTING.md) for testing guidelines
- See [ACCESSIBILITY.md](ACCESSIBILITY.md) for a11y standards
- Consult [SECURITY.md](SECURITY.md) for security practices

---

**Last Updated:** 2025-10-16
**Maintainer:** Development Team
**Status:** Living Document - Update as improvements are implemented
**Progress:** 4 major sections completed (Code Quality ✅, Dependencies ✅, SEO ✅, User Experience ✅)
