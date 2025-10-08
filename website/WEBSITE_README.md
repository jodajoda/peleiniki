# Pelei Niki Photography Portfolio

Modern photography portfolio website built with React, Vite, and Tailwind CSS.

## 🚀 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **EmailJS** - Contact form integration

## 🎨 Features

- ✅ Responsive design (mobile-first)
- ✅ Image lightbox with keyboard navigation
- ✅ Smooth animations and hover effects
- ✅ Contact form with EmailJS integration
- ✅ 6 main pages (Home, Photo shoot with me, Portfolio, About, Packages, Contact)
- ✅ SEO optimized
- ✅ Accessibility features

## 📧 EmailJS Setup

To enable the contact form:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a service and template
3. Update the credentials in `src/pages/Contact.jsx`:
   - `SERVICE_ID`
   - `TEMPLATE_ID`
   - `PUBLIC_KEY`

## 🌐 Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions when pushing to the `main` branch.

Visit: https://jodajoda.github.io/peleiniki/

## 📝 Content Updates

- **Social Media Links**: Update in `src/components/Footer.jsx` and `src/pages/Contact.jsx`
- **Email Address**: Update in `src/components/Footer.jsx` and `src/pages/Contact.jsx`
- **Images**: Located in the parent `assets/` folder
