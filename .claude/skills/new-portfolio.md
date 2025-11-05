# New Portfolio Setup

You are tasked with creating a new photography portfolio website based on the Pelei Niki template.

## Objective

Guide the user through setting up a complete photography portfolio website with custom branding, content, and deployment configuration.

## Prerequisites

Before starting, gather the following information from the client:

1. **Branding Information:**
   - Business/photographer name
   - Preferred color scheme (primary colors, accent colors)
   - Logo file (if available)
   - Social media links (Instagram, Facebook, etc.)

2. **Content Requirements:**
   - Photography collections/categories
   - About text (photographer bio)
   - Contact information (email, phone)
   - Service packages and pricing (optional)
   - Privacy policy content

3. **Technical Requirements:**
   - Domain name (if using custom domain)
   - GitHub repository name
   - EmailJS account (for contact form)

## Setup Process

### 1. Repository Setup

Ask the user:
- "What should we name the new repository?"
- "Do you want to create it from scratch or fork the peleiniki repo?"

Then proceed to:
- Initialize new Git repository or create from template
- Set up proper directory structure (`website/`, `assets/`, etc.)
- Update package.json with new project name

### 2. Branding & Design

Use the `update-colors` skill to:
- Customize the color scheme in `tailwind.config.js`
- Update primary and accent colors
- Maintain design consistency

Ask the user:
- "What are your primary brand colors? (provide hex codes)"
- "What accent colors would you like? (warm tones, cool tones, etc.)"

### 3. Content Migration

Use the `update-content` skill to:
- Replace placeholder text with client content
- Update navigation menu items
- Configure page routes
- Set up social media links

Ask the user:
- "What pages do you need? (Home, Portfolio, About, Contact, Packages, etc.)"
- "Do you have all the content ready, or should we use placeholders?"

### 4. Asset Management

Guide the user to:
- Create `assets/` directory structure
- Organize photos into collections
- Optimize images (WebP format recommended)
- Add logo and icons

Ask the user:
- "Where are your photos located?"
- "How do you want to organize them? (by collection, by event, by date, etc.)"

### 5. Contact Form Integration

Use the `setup-emailjs` skill to:
- Configure EmailJS service
- Set up environment variables
- Test contact form functionality

### 6. Deployment Configuration

Use the `setup-deployment` skill to:
- Configure GitHub Pages or custom domain
- Set up GitHub Actions workflows
- Configure DNS (if custom domain)
- Add GitHub secrets for EmailJS

## Validation Checklist

Before completing the setup, verify:

- [ ] All pages load correctly
- [ ] Navigation works on mobile and desktop
- [ ] Images load with lazy loading
- [ ] Lightbox works for portfolio images
- [ ] Contact form sends test email successfully
- [ ] Responsive design works on all screen sizes
- [ ] All social media links are correct
- [ ] Color scheme is consistent throughout
- [ ] SEO metadata is updated (title, description, etc.)
- [ ] Privacy policy is customized
- [ ] Tests pass (`npm test`)

## Testing Commands

Run these commands to verify everything works:

```bash
cd website
npm install
npm run dev        # Test locally
npm run build      # Verify build works
npm test           # Run E2E tests
```

## Next Steps

After completing the setup:
1. Commit all changes to Git
2. Push to GitHub
3. Configure GitHub Pages
4. Test the deployed site
5. Share the live URL with the client

## Common Customizations

Remind the user they can further customize:
- Animation speeds and effects
- Typography (fonts)
- Layout spacing and grid columns
- Additional pages or sections
- Custom components

## Tips

- Keep the original peleiniki repository as reference
- Use semantic commit messages
- Test on mobile devices before going live
- Optimize images before committing (use WebP when possible)
- Keep EmailJS credentials secure (never commit .env files)

## Example Dialogue

**You:** "Let's create your new photography portfolio! First, what's your business name?"

**Client:** "Golden Hour Photography"

**You:** "Great! What are your brand colors? Please provide hex codes for your primary color."

**Client:** "#D4A574 for gold tones"

**You:** "Perfect! I'll set up a portfolio website for Golden Hour Photography with a warm gold color scheme. Do you have a custom domain, or should we use GitHub Pages?"

Continue gathering information and use the appropriate skills to complete each section of the setup.
