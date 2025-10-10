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
├── dist/                    # Build output (gitignored)
├── index.html               # HTML entry point
├── vite.config.js           # Vite configuration (base: '/peleiniki/')
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
1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Create email service and template
3. Copy `website/.env.example` to `website/.env`
4. Update `.env` with your EmailJS credentials:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
5. **CRITICAL**: Configure domain whitelist in EmailJS dashboard (see [SECURITY.md](SECURITY.md))

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

1. Workflow runs in `website/` directory
2. Builds production bundle (`npm run build`)
3. Uploads `website/dist/` to GitHub Pages
4. Site deploys to: https://jodajoda.github.io/peleiniki/

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
- Navigation includes proper ARIA labels
- Lightbox supports keyboard navigation
- Use semantic HTML elements
- Maintain sufficient color contrast with primary palette
- Add descriptive alt text to all images

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
