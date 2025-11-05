# Claude Skills for Photography Portfolio Template

This directory contains Claude AI skills designed to help you reproduce and customize this photography portfolio website for different clients.

## 📚 Overview

These skills provide step-by-step guidance for creating customized photography portfolio websites based on the Pelei Niki template. Each skill focuses on a specific aspect of the setup process.

## 🎯 Available Skills

### 1. **new-portfolio.md** - Complete Portfolio Setup
**Use when:** Starting a new portfolio project from scratch

**What it does:**
- Guides through complete setup process
- Coordinates all other skills
- Provides validation checklist
- Ensures nothing is missed

**Typical workflow:**
1. Gather client information
2. Set up repository structure
3. Customize branding and design
4. Migrate content
5. Configure deployment
6. Test and validate

**Command:** `/skill new-portfolio` (or invoke in Claude Code)

---

### 2. **update-colors.md** - Color Scheme Customization
**Use when:** Customizing brand colors and theme

**What it does:**
- Generates Tailwind color scales (50-900)
- Updates primary and accent colors
- Modifies gradients and shadows
- Ensures accessibility compliance

**Handles:**
- `website/tailwind.config.js` customization
- Color palette generation
- Gradient backgrounds
- Shadow/glow effects

**Command:** Use when changing client's brand colors

---

### 3. **update-content.md** - Content Migration
**Use when:** Replacing placeholder content with client's actual content

**What it does:**
- Updates all text content (pages, navigation, footer)
- Replaces images and media
- Updates contact information
- Customizes SEO metadata

**Covers:**
- Business name and branding
- About page bio
- Service packages
- Portfolio collections
- Contact details
- Privacy policy

**Files modified:** All page components, Navigation, Footer

---

### 4. **setup-deployment.md** - Deployment Configuration
**Use when:** Deploying the website to production

**What it does:**
- Configures GitHub Pages deployment
- Sets up custom domain (optional)
- Configures DNS records
- Sets up CI/CD pipeline

**Options:**
- GitHub Pages (default URL)
- GitHub Pages (custom domain)
- Alternative hosting (Netlify, Vercel)

**Includes:** Testing, monitoring, troubleshooting

---

### 5. **setup-emailjs.md** - Contact Form Setup
**Use when:** Configuring the contact form functionality

**What it does:**
- Creates EmailJS account
- Connects email service
- Creates email templates
- Configures environment variables
- Sets up security whitelist

**Handles:**
- Local development setup (`.env`)
- Production setup (GitHub Secrets)
- Domain whitelisting
- Testing and troubleshooting

---

## 🚀 Quick Start

### For a Brand New Portfolio

Start with the main skill:

1. **Invoke the main skill:**
   ```
   Use /skill new-portfolio in Claude Code
   ```

2. **The skill will guide you to:**
   - Gather client requirements
   - Use appropriate sub-skills
   - Complete setup step-by-step
   - Validate everything works

3. **Follow the prompts** for each section

### For Specific Customizations

Use individual skills directly:

**Changing colors only?**
→ Use `update-colors.md`

**Just updating content?**
→ Use `update-content.md`

**Setting up contact form?**
→ Use `setup-emailjs.md`

**Deploying to production?**
→ Use `setup-deployment.md`

## 📋 Typical Project Flow

Here's the recommended order for setting up a new portfolio:

```
1. new-portfolio (kickoff)
   ↓
2. update-colors (branding)
   ↓
3. update-content (text & images)
   ↓
4. setup-emailjs (contact form)
   ↓
5. setup-deployment (go live)
```

**Time estimate:** 3-6 hours for complete setup (depending on content readiness)

## 🎨 Use Case Examples

### Example 1: New Wedding Photography Portfolio

**Client:** Sarah's Wedding Photography
**Domain:** sarahweddings.com
**Colors:** Soft blush pink, champagne gold
**Collections:** Weddings, Engagements, Bridal Portraits

**Skills sequence:**
1. `new-portfolio` → Initial setup
2. `update-colors` → Soft pink/gold theme
3. `update-content` → Replace with Sarah's content
4. `setup-emailjs` → Contact form for inquiries
5. `setup-deployment` → Deploy to sarahweddings.com

---

### Example 2: Commercial Photography Portfolio

**Client:** Urban Lens Studio
**Domain:** urbanlens.studio
**Colors:** Cool grays, electric blue
**Collections:** Architecture, Corporate, Product

**Skills sequence:**
1. `new-portfolio` → Clone and set up
2. `update-colors` → Modern cool tones
3. `update-content` → Commercial content
4. `setup-emailjs` → Business inquiries
5. `setup-deployment` → Deploy to custom domain

---

### Example 3: Update Existing Portfolio

**Scenario:** Client wants to refresh colors and add new portfolio section

**Skills sequence:**
1. `update-colors` → New brand colors
2. `update-content` → Add new collection
3. (Test locally)
4. Push changes (auto-deploys via existing CI/CD)

## 🛠️ Prerequisites

Before using these skills, ensure:

### Technical Requirements
- [ ] Node.js 20+ installed
- [ ] Git installed
- [ ] GitHub account
- [ ] Code editor (VS Code recommended)
- [ ] Basic command line knowledge

### Client Deliverables
- [ ] Brand colors (hex codes)
- [ ] Logo files (SVG preferred)
- [ ] Portfolio images (organized, optimized)
- [ ] Text content (bio, descriptions, packages)
- [ ] Social media links
- [ ] Contact information
- [ ] Domain name (if using custom domain)

### Optional
- [ ] EmailJS account (for contact form)
- [ ] Google Analytics ID (for tracking)
- [ ] Custom fonts (if not using defaults)

## 📁 File Structure Reference

Understanding the structure helps when using skills:

```
repository/
├── .claude/
│   └── skills/              # This directory
│       ├── README.md        # This file
│       ├── new-portfolio.md
│       ├── update-colors.md
│       ├── update-content.md
│       ├── setup-deployment.md
│       └── setup-emailjs.md
├── website/                 # Main React application
│   ├── src/
│   │   ├── pages/          # Page components
│   │   ├── components/     # Reusable components
│   │   ├── App.jsx         # Router configuration
│   │   └── index.css       # Global styles
│   ├── public/             # Static assets (symlink)
│   ├── tests/              # E2E tests
│   ├── package.json
│   ├── vite.config.js      # Vite/build config
│   └── tailwind.config.js  # Theme config
├── assets/                 # Images and media
│   ├── homepage/
│   ├── portfolio/
│   └── about/
├── .github/
│   └── workflows/          # CI/CD pipelines
└── CLAUDE.md              # Main project documentation
```

## 💡 Tips for Using Skills

### 1. Prepare Before Starting
- Gather all client content beforehand
- Have brand colors ready (hex codes)
- Organize images before upload
- Know hosting/domain requirements

### 2. Use Skills in Order
- Follow the recommended sequence
- Don't skip steps (especially testing)
- Complete one skill before moving to next

### 3. Customize as Needed
- Skills are templates, not rigid rules
- Adapt to specific client needs
- Add custom pages or sections
- Modify colors and layouts

### 4. Test Frequently
- Test after each major change
- Use `npm run dev` for local testing
- Test on mobile devices
- Run E2E tests before deployment

### 5. Version Control
- Commit after each completed section
- Use descriptive commit messages
- Create branches for major changes
- Keep main branch deployable

## 🔧 Common Customizations

Beyond the core skills, common requests:

### Add New Page
1. Create component in `src/pages/`
2. Add route in `App.jsx`
3. Add navigation link in `Navigation.jsx`
4. Update tests

### Change Font
1. Import font in `index.css` or `index.html`
2. Update `tailwind.config.js` fontFamily
3. Test across all pages

### Add Google Analytics
1. Get GA4 tracking ID
2. Add script to `website/index.html`
3. Test tracking in GA dashboard

### Add Blog Section
1. Create `Blog.jsx` page
2. Set up content management (markdown files or CMS)
3. Add route and navigation
4. Style blog post layouts

### Multilingual Support
1. Add language toggle component
2. Create language files (i18n)
3. Update all pages with translations
4. Update SEO for each language

## 🐛 Troubleshooting

### Skill Not Working?

**Check:**
- Are you in the correct directory? (`website/` for most operations)
- Do you have required credentials? (EmailJS, GitHub)
- Are dependencies installed? (`npm install`)
- Is the dev server running? (`npm run dev`)

### Build Errors?

**Try:**
```bash
cd website
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deployment Failing?

**Verify:**
- GitHub Secrets are set correctly
- `vite.config.js` base path matches deployment
- CNAME file exists (if using custom domain)
- DNS records are correct (for custom domain)

### Contact Form Not Working?

**Check:**
- `.env` file exists in `website/` (local)
- GitHub Secrets are added (production)
- Domain is whitelisted in EmailJS
- EmailJS service is active

## 📚 Additional Resources

### Documentation
- [Main Project Docs](../../CLAUDE.md)
- [Testing Guide](../../TESTING.md)
- [Security Guide](../../SECURITY.md)
- [Accessibility Guide](../../ACCESSIBILITY.md)

### External Resources
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [EmailJS Docs](https://www.emailjs.com/docs/)
- [GitHub Pages Docs](https://docs.github.com/pages)

### Design Resources
- [Coolors](https://coolors.co/) - Color palette generator
- [UI Colors](https://uicolors.app/create) - Tailwind color scales
- [TinyPNG](https://tinypng.com/) - Image optimization
- [Unsplash](https://unsplash.com/) - Stock photos (if needed)

## 🎓 Learning Path

**New to this workflow?**

1. **Read main docs first:** [CLAUDE.md](../../CLAUDE.md)
2. **Try updating existing site:** Use `update-colors` on this repository
3. **Create test portfolio:** Use `new-portfolio` for practice client
4. **Deploy to test domain:** Use GitHub Pages default URL
5. **Full client project:** Follow complete workflow with real client

**Experienced?**

Jump straight to the skill you need. Each is self-contained with complete instructions.

## 🤝 Contributing

Found a way to improve these skills?

1. Test your improvement
2. Update the relevant skill file
3. Update this README if needed
4. Commit with clear description
5. Share with the team

## ❓ FAQ

### Can I use these skills for non-photography portfolios?

**Yes!** The template works for any visual portfolio:
- Architecture
- Interior design
- Fine art
- Fashion
- Product photography
- Videography
- Illustration
- Graphic design

Just adjust content and color scheme appropriately.

### Do I need to use all skills?

**No.** Use only what you need:
- Updating colors only? → Use `update-colors`
- Already deployed? → Skip `setup-deployment`
- Not using contact form? → Skip `setup-emailjs`

### How long does setup take?

**Typical timeline:**
- Colors only: 15-30 minutes
- Content update: 1-3 hours (depending on content volume)
- Full new portfolio: 3-6 hours (including testing)
- Custom modifications: Variable

### Can I customize beyond the skills?

**Absolutely!** Skills provide foundation. Customize:
- Add new components
- Create custom layouts
- Add animations
- Integrate additional services
- Build custom features

The skills ensure core functionality while leaving room for creativity.

### What if something breaks?

**Recovery steps:**
1. Check recent commits: `git log`
2. Revert if needed: `git revert HEAD`
3. Use test branch for experiments
4. Run tests: `npm test`
5. Check browser console for errors

**Always commit working code before major changes!**

## 📞 Getting Help

**During setup:**
- Use the skills - they include troubleshooting
- Check error messages carefully
- Review browser console
- Check GitHub Actions logs (for deployment)

**General questions:**
- Review [CLAUDE.md](../../CLAUDE.md)
- Check component comments in code
- Review Tailwind/React docs
- Test in isolation (reproduce in simple example)

## ✅ Success Checklist

Before delivering to client, verify:

- [ ] All skills completed (that apply)
- [ ] Site deployed and accessible
- [ ] All pages load without errors
- [ ] Images optimized and loading
- [ ] Contact form tested and working
- [ ] Mobile responsive verified
- [ ] Cross-browser tested
- [ ] SEO metadata complete
- [ ] Privacy policy customized
- [ ] Social links verified
- [ ] Performance: Lighthouse 90+ scores
- [ ] Client has credentials (EmailJS, GitHub)
- [ ] Client trained on updates
- [ ] Documentation provided

## 🎉 You're Ready!

These skills will help you efficiently create beautiful, functional photography portfolio websites for your clients.

**Start with:** `new-portfolio.md`

**Questions?** Each skill includes detailed guidance and troubleshooting.

**Good luck! 📸✨**
