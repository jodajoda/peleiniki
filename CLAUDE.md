# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Photography portfolio website for Pelei Niki Fotográfus (photographer), built with React, Vite, and Tailwind CSS. The site features responsive design, image lightbox functionality, contact form integration, and smooth animations. Content is primarily in Hungarian.

**Repository Structure:**
- `website/` - Main React application (primary development directory)
- `public/` - Symlink to `../assets/` for image assets
- Root directory contains deployment outputs from `website/dist/`

## Development Commands

All commands must be run from the `website/` directory:

```bash
cd website

# Development
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)

# Production
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint

# Testing (Playwright E2E tests)
npm test             # Run all tests (headless)
npm run test:ui      # Run tests with interactive UI
npm run test:headed  # Run tests with visible browser
npm run test:debug   # Debug tests interactively
npm run test:report  # View last test report

# Deployment (automated via GitHub Actions)
npm run deploy       # Build and copy to root (manual deployment)
```

## Architecture

### Tech Stack
- **React 19.1** - UI framework
- **Vite 7.1** - Build tool and dev server
- **Tailwind CSS 3.4** - Utility-first styling
- **React Router 7.9** - Client-side routing
- **EmailJS 4.4** - Contact form email integration
- **Playwright 1.56** - End-to-end testing framework

### Project Structure

```
website/
├── src/
│   ├── App.jsx              # Main app with routing setup
│   ├── main.jsx             # React entry point
│   ├── index.css            # Global styles + Tailwind directives
│   ├── components/
│   │   ├── Navigation.jsx   # Header navigation with mobile menu
│   │   ├── Footer.jsx       # Footer with social links
│   │   ├── Lightbox.jsx     # Image lightbox modal (keyboard nav)
│   │   ├── LazyImage.jsx    # Lazy loading image component
│   │   └── ScrollToTop.jsx  # Scroll restoration on route change
│   └── pages/
│       ├── Home.jsx         # Homepage with featured gallery
│       ├── Photoshooting.jsx # Photoshoot experience info
│       ├── Portfolio.jsx    # Portfolio with grouped collections
│       ├── About.jsx        # About the photographer
│       ├── Packages.jsx     # Photography packages & pricing
│       ├── Contact.jsx      # Contact form (EmailJS integration)
│       └── PrivacyPolicy.jsx # Privacy policy (Hungarian: Adatkezelési tájékoztató)
├── public/
│   └── assets/              # Symlink to ../../assets/
├── tests/                   # Playwright E2E tests
│   ├── navigation.spec.js   # Navigation component tests
│   ├── contact-form.spec.js # Contact form validation & submission tests
│   ├── lightbox.spec.js     # Image lightbox tests
│   ├── routing.spec.js      # Routing & page load tests
│   └── README.md            # Testing documentation
├── dist/                    # Build output (gitignored)
├── index.html               # HTML entry point
├── vite.config.js           # Vite configuration (base: '/peleiniki/')
├── playwright.config.js     # Playwright test configuration
└── tailwind.config.js       # Tailwind theme customization
```

### Routing Configuration

App uses React Router with base path `/peleiniki/` for GitHub Pages deployment:

- `/` - Home
- `/photoshooting` - Photoshoot Experience
- `/portfolio` - Portfolio Collections
- `/about` - About Page
- `/packages` - Photography Packages
- `/contact` - Contact Form
- `/adatkezelesi-tajekoztato` - Privacy Policy

**Important:** Router basename is set to `/peleiniki/` in [App.jsx:15](website/src/App.jsx#L15) and Vite base in [vite.config.js:7](website/vite.config.js#L7).

### Key Components

**Navigation.jsx**
- Sticky header with scroll-triggered shrink effect
- Hamburger menu for mobile with smooth transitions
- Active page highlighting
- Manages its own mobile menu state

**Lightbox.jsx**
- Full-screen image viewer with smooth animations
- Keyboard navigation: Arrow keys (next/prev), Escape (close)
- Click outside to close
- Direction-based slide transitions
- Used in Portfolio page for gallery images

**LazyImage.jsx**
- Lazy loading with intersection observer
- Shimmer placeholder animation
- Smooth fade-in on load

**ScrollToTop.jsx**
- Restores scroll position to top on route changes
- Essential for SPA navigation

### Tailwind Configuration

Custom theme extensions in [tailwind.config.js](website/tailwind.config.js):

**Color Palette:**
- `primary.*` - Earth tones (50-900 scale) for brand identity
- `accent.*` - Named colors (warm, sunset, gold, rose, lavender)

**Custom Utilities:**
- `shadow-soft`, `shadow-soft-lg` - Subtle shadows
- `shadow-glow`, `shadow-glow-warm` - Glowing effects
- `bg-gradient-*` - Pre-defined gradient backgrounds (primary, warm, sunset, dreamy, ocean)
- `animate-shimmer` - Shimmer loading effect

### EmailJS Integration

Contact form in [Contact.jsx](website/src/pages/Contact.jsx) uses EmailJS for email delivery. Credentials are managed via environment variables.

**Setup instructions:**

**Local Development:**
1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Create email service and template
3. Copy `website/.env.example` to `website/.env`
4. Update `.env` with your EmailJS credentials:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

**Production Deployment (GitHub Pages):**
1. Add credentials as GitHub Secrets (see [GITHUB_SECRETS_SETUP.md](GITHUB_SECRETS_SETUP.md))
2. **CRITICAL**: Configure domain whitelist in EmailJS dashboard (see [SECURITY.md](SECURITY.md))

**Security features:**
- Environment variable management for credentials
- Client-side rate limiting (30 second cooldown)
- Domain restrictions (must be configured in EmailJS dashboard)

**Important:** See [SECURITY.md](SECURITY.md) for comprehensive security setup and best practices

### Asset Management

Images are stored in `assets/` at repository root and symlinked into `public/`:

```
assets/
├── homepage/        # Featured photos for homepage
├── portfolio/       # Portfolio collection images
├── about-me/        # About page photos
├── emma-birthday/   # Additional collections
└── icons/          # Logo and social media icons
```

In React components, reference assets as: `assets/homepage/image.jpg`

The symlink ensures assets are accessible during development and get copied during build.

## Deployment

### GitHub Pages (Automated)

Deployment is automated via GitHub Actions on push to `main`:

**Deployment Pipeline** (tests → build → deploy):

1. **Test Job** - Runs Playwright E2E tests (parallel execution)
   - **Deployment is blocked if tests fail** ✅
   - Tests run in 2 parallel shards for speed
   - Uploads test reports and screenshots

2. **Build Job** - Creates production bundle (requires tests to pass)
   - Runs in `website/` directory
   - Executes `npm run build`
   - Injects EmailJS secrets as environment variables

3. **Deploy Job** - Publishes to GitHub Pages (requires build to pass)
   - Uploads `website/dist/` to GitHub Pages
   - Site deploys to: https://jodajoda.github.io/peleiniki/

Configuration in [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

### Manual Deployment

If needed, use the deploy script:
```bash
cd website
npm run deploy
```

This builds and copies dist contents to repository root, then commits and pushes.

## Development Patterns

### Adding New Pages

1. Create page component in `src/pages/NewPage.jsx`
2. Add route in [src/App.jsx](website/src/App.jsx):
   ```jsx
   import NewPage from './pages/NewPage';
   // ...
   <Route path="/new-page" element={<NewPage />} />
   ```
3. Add navigation link in [src/components/Navigation.jsx](website/src/components/Navigation.jsx)

### Using Animations

Common animation patterns:

```jsx
// Fade in on scroll
<div className="opacity-0 animate-fadeIn">Content</div>

// Hover scale effect
<div className="transition-transform hover:scale-105">Card</div>

// Staggered animations (manually using delays)
<div className="animate-fadeIn delay-100">Item 1</div>
<div className="animate-fadeIn delay-200">Item 2</div>
```

### Image Galleries

Use LazyImage component for performance:

```jsx
import LazyImage from '../components/LazyImage';

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <LazyImage
    src="assets/portfolio/photo1.jpg"
    alt="Description"
    className="w-full h-auto"
  />
</div>
```

For lightbox functionality, see Portfolio.jsx implementation.

## Important Notes

### Language
- Primary language: Hungarian (`lang="hu"` in index.html)
- UI text should be in Hungarian
- Some placeholder English text may need translation

### Social Media Links
Update social media URLs in:
- [src/components/Footer.jsx](website/src/components/Footer.jsx)
- [src/pages/Contact.jsx](website/src/pages/Contact.jsx)

Currently uses placeholders that need real URLs.

### Performance Considerations
- All images should use LazyImage component for lazy loading
- Large portfolios benefit from image optimization before committing
- Vite automatically code-splits routes

### Accessibility

The website meets WCAG 2.1 Level AA standards with comprehensive accessibility features:

**Keyboard Navigation:**
- Skip-to-content link (visible on focus)
- All interactive elements are keyboard accessible
- Enhanced focus indicators (2px ring on all focusable elements)
- Lightbox supports Arrow keys and Escape

**Screen Readers:**
- Semantic HTML with proper landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`)
- ARIA labels on all interactive elements
- `aria-current="page"` for active navigation links
- `aria-live` regions for dynamic content updates
- Proper heading hierarchy on all pages

**Visual Accessibility:**
- WCAG AA color contrast ratios
- `prefers-reduced-motion` support
- Clear focus indicators on all interactive elements

**Forms:**
- All inputs have associated labels
- Required fields properly marked
- Error messages announced to screen readers
- Status updates via `aria-live` regions

**Testing:**
- Automated accessibility tests using axe-core
- 180+ test cases covering WCAG compliance
- Run tests: `npm test -- accessibility.spec.js`

See [ACCESSIBILITY.md](../ACCESSIBILITY.md) for complete documentation.

## Troubleshooting

**Dev server not starting:**
- Ensure you're in `website/` directory
- Delete `node_modules/` and `package-lock.json`, then `npm install`

**Assets not loading:**
- Check symlink: `ls -la website/public/assets`
- Should point to `../../assets`

**Build errors:**
- Check ESLint: `npm run lint`
- Verify all imports use correct paths
- Ensure EmailJS credentials aren't causing issues

**Deployment failing:**
- Check GitHub Actions logs
- Verify base path matches: `/peleiniki/` in both vite.config.js and App.jsx

**Routing issues after deployment:**
- GitHub Pages requires hash routing for SPAs, or proper base configuration
- Current setup uses base path `/peleiniki/` correctly configured

## Testing

### Overview

The project includes comprehensive end-to-end tests using Playwright covering:
- **Navigation**: Desktop/mobile menus, scroll behavior
- **Contact Form**: Validation, submission, rate limiting
- **Lightbox**: Keyboard navigation, image gallery
- **Routing**: All pages, SEO, accessibility

**Total Coverage**: 66+ test cases across 4 test files

See [TESTING.md](../TESTING.md) for complete testing guide.

### Quick Test Commands

```bash
cd website

# First time setup
npx playwright install

# Run tests
npm test              # Headless mode
npm run test:ui       # Interactive UI (recommended)
npm run test:headed   # With visible browser
npm run test:debug    # Debug mode
npm run test:report   # View last report
```

### Test Files

- [tests/navigation.spec.js](website/tests/navigation.spec.js) - Navigation component tests
- [tests/contact-form.spec.js](website/tests/contact-form.spec.js) - Contact form tests
- [tests/lightbox.spec.js](website/tests/lightbox.spec.js) - Lightbox functionality tests
- [tests/routing.spec.js](website/tests/routing.spec.js) - Routing and page load tests

### Writing New Tests

1. Create test file in `website/tests/` with `.spec.js` extension
2. Follow existing patterns (see [tests/README.md](website/tests/README.md))
3. Use semantic selectors: `getByRole`, `getByLabel`
4. Mock external services (EmailJS)
5. Run tests: `npm test`

### CI/CD Integration

Tests automatically run on GitHub Actions for:
- Push to `main` or `develop` branches
- Pull requests to `main`

Configuration: [.github/workflows/playwright-tests.yml](../.github/workflows/playwright-tests.yml)

### Test Environment

Environment variables for EmailJS (optional, tests use mocks):
```bash
cp .env.test.example .env
# Edit .env with EmailJS credentials
```
