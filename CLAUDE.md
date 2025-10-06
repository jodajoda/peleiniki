# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static photography portfolio website for Pelei Niki Fotográfus (photographer). The site is built with vanilla HTML, CSS, and JavaScript - no build process or frameworks required. Content is primarily in Hungarian.

## Architecture

### Page Structure
The site consists of 6 main HTML pages, all following a consistent structure:
- `index.html` - Homepage with gallery of featured photos
- `about.html` - About the photographer page
- `portfolio.html` - Portfolio organized into themed photo groups
- `packages.html` - Photography packages and pricing
- `photoshooting.html` - Information about photoshoot experience
- `contact.html` - Contact information and social links

### JavaScript Modules
The site uses three separate JavaScript files loaded independently:

- **`script.js`** - Core navigation functionality:
  - Header shrink effect on scroll
  - Hamburger menu toggle for mobile navigation
  - Loaded on ALL pages

- **`animate.js`** - Animation system:
  - Handles `.animate-on-load` elements
  - Staggered fade-in animations with 0.2s delays per element
  - Loaded on ALL pages

- **`lightbox.js`** - Image lightbox/modal functionality:
  - Click to enlarge gallery images
  - Previous/next navigation (mouse clicks and arrow keys)
  - ESC key to close
  - ONLY loaded on `portfolio.html` (where the lightbox modal markup exists)

### CSS Architecture
Single `style.css` file contains all styles organized by component:
- Global styles and header/navigation (lines 1-59)
- Main content and gallery grid (lines 61-93)
- Contact page styles (lines 94-118)
- Footer and social links (lines 120-166)
- Animations (lines 168-185)
- Packages page styles (lines 187-233)
- About page styles (lines 235-263)
- Hamburger menu and mobile navigation (lines 264-343)
- Portfolio page styles (lines 345-356)
- Lightbox modal styles (lines 358-443)

### Common Patterns

**Header Navigation:**
All pages share identical header structure:
- Fixed header with shrink effect on scroll
- Logo linking to homepage
- Hamburger menu (button) for mobile
- Desktop navigation links
- Current page should have `aria-current="page"` attribute

**Footer:**
All pages share identical footer with:
- Social media links (Instagram, Facebook, Email) - placeholders need updating
- Footer navigation links (Családfotózás, Adatkezelési tájékoztató, Impresszum)

**Gallery Images:**
- Images use `.gallery` grid layout (auto-fill, minmax(300px, 1fr))
- Individual images wrapped in `.img-wrapper` div for hover effects
- Homepage: Direct `<img>` tags with `.animate-on-load` class
- Portfolio: Images wrapped in `.img-wrapper` divs, organized in `.portfolio-group` sections

**Animation System:**
- Add `.animate-on-load` class to any element for staggered fade-in
- Animation triggers on DOMContentLoaded
- Each element gets 0.2s delay multiplied by its index

## Development Workflow

### No Build Process
This is a static site - simply open HTML files in a browser or use a local server:
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if http-server is installed)
npx http-server -p 8000
```

Then visit `http://localhost:8000`

### File Organization
```
/
├── *.html           # 6 main page files
├── style.css        # All styles
├── script.js        # Navigation & header
├── animate.js       # Animation system
├── lightbox.js      # Lightbox (portfolio only)
└── assets/
    ├── homepage/    # Homepage gallery images
    ├── portfolio/   # Portfolio gallery images
    ├── about-me/    # About page images
    ├── emma-birthday/ # Additional photo collections
    └── icons/       # Logo and social media icons
```

## Important Notes

### Language Consistency
- Primary language is Hungarian (`lang="hu"`)
- Some pages still have `lang="en"` - should be updated to `lang="hu"`
- Navigation text mixing English/Hungarian - standardize to Hungarian

### Placeholder Content
Several placeholders need to be updated:
- Social media URLs: `YOUR_INSTAGRAM_URL`, `YOUR_FACEBOOK_URL`
- Email address: `YOUR_EMAIL_ADDRESS`
- Footer links currently point to `#` (no destination)

### Accessibility Considerations
When editing:
- Maintain ARIA labels on navigation and interactive elements
- Use `<button>` for hamburger menu (not `<a>`)
- Include `aria-current="page"` on current page nav link
- Add `rel="noopener noreferrer"` to external links
- Provide descriptive alt text for images
- Include width/height attributes on footer social icons

### Known Issues
- Line 58 in `portfolio.html` has typo: `src_` instead of `src`
- Inconsistent language attributes across pages
- Some navigation text inconsistent (e.g., "Home" vs "Kezdőlap")

## Adding New Content

### Adding Portfolio Group
In `portfolio.html`, add within `<main>`:
```html
<div class="portfolio-group animate-on-load">
    <h2>Portfolio Title</h2>
    <p>Description of the portfolio collection.</p>
    <div class="gallery">
        <div class="img-wrapper">
            <img src="assets/portfolio/image.jpg" alt="Descriptive alt text">
        </div>
        <!-- More images... -->
    </div>
</div>
```

### Adding Package
In `packages.html`, add within `.packages-container`:
```html
<article class="package animate-on-load">
    <h2>Package Name</h2>
    <p class="description">Package description</p>
    <ul class="package-details">
        <li class="duration"><strong>Időtartam:</strong> Duration info</li>
        <li class="photos"><strong>Képek száma:</strong> Photo count</li>
    </ul>
    <p class="price" aria-label="Ár: price">Price Ft</p>
</article>
```

## Refactoring Guidelines

When refactoring HTML pages:
1. Use semantic HTML (`<article>`, `<section>`, `<nav>`)
2. Add proper ARIA attributes for accessibility
3. Use `<button>` for interactive elements (not `<a href="#">`)
4. Include meta description for SEO
5. Add preconnect for external resources (fonts)
6. Maintain consistent structure across all pages
7. Keep Hungarian language throughout (`lang="hu"`)
8. Use structured lists (`<ul>`) for grouped content where appropriate