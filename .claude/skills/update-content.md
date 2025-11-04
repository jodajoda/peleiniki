# Update Website Content

You are tasked with updating the content of a photography portfolio website for a new client.

## Objective

Replace all placeholder text, images, and contact information with the client's actual content while maintaining the site structure and functionality.

## Content Checklist

Gather the following information from the client:

### 1. Basic Information
- [ ] Business/photographer name
- [ ] Tagline or slogan
- [ ] Business description (1-2 sentences)
- [ ] Contact email
- [ ] Phone number (optional)
- [ ] Physical address (optional)
- [ ] Business hours (optional)

### 2. Social Media
- [ ] Instagram URL
- [ ] Facebook URL
- [ ] Other platforms (Pinterest, TikTok, LinkedIn, etc.)

### 3. About Section
- [ ] Photographer bio (2-3 paragraphs)
- [ ] Professional experience/background
- [ ] Photography style/approach
- [ ] Personal touch (optional: hobbies, inspirations)
- [ ] Profile photo

### 4. Services & Packages
- [ ] Service offerings (weddings, portraits, events, etc.)
- [ ] Package names and descriptions
- [ ] Pricing (if publicly displayed)
- [ ] What's included in each package
- [ ] Booking process description

### 5. Portfolio Content
- [ ] Collection names (e.g., "Weddings", "Portraits", "Events")
- [ ] Collection descriptions
- [ ] Photos organized by collection
- [ ] Featured images for homepage

### 6. Legal & SEO
- [ ] Privacy policy (or template to customize)
- [ ] Terms of service (optional)
- [ ] SEO metadata (title, description, keywords)
- [ ] Copyright information

## Files to Update

### 1. Package Configuration (`website/package.json`)

Update the project name and metadata:

```json
{
  "name": "client-portfolio-website",
  "description": "[Client Name] Photography Portfolio",
  "author": "[Client Name]",
  // ... rest of config
}
```

### 2. HTML Metadata (`website/index.html`)

Update:
- `<title>` tag
- `<meta name="description">`
- `<meta property="og:*">` (Open Graph for social sharing)
- Favicon reference (if new icon provided)

Example:
```html
<title>[Client Name] - Professional Photography</title>
<meta name="description" content="[Client's photography style/specialty] based in [Location]" />
```

### 3. Navigation (`website/src/components/Navigation.jsx`)

Update:
- Logo/business name in header
- Menu items (if adding/removing pages)

Look for:
```jsx
<Link to="/" className="...">
  [Business Name]
</Link>
```

### 4. Footer (`website/src/components/Footer.jsx`)

Update:
- Business name
- Copyright year
- Social media links
- Contact information

Look for:
```jsx
// Social media links
<a href="https://instagram.com/[handle]" ...>
<a href="https://facebook.com/[page]" ...>

// Copyright
© {new Date().getFullYear()} [Business Name]
```

### 5. Home Page (`website/src/pages/Home.jsx`)

Update:
- Hero section heading and subheading
- Introduction text
- Featured images
- Call-to-action text

Look for:
```jsx
<h1>Welcome to [Business Name]</h1>
<p>Your story description...</p>
```

### 6. About Page (`website/src/pages/About.jsx`)

Update:
- About me heading
- Bio paragraphs
- Profile photo path
- Mission statement or philosophy

### 7. Portfolio Page (`website/src/pages/Portfolio.jsx`)

Update:
- Collection names and descriptions
- Image paths to match new asset structure

Example structure:
```jsx
const collections = [
  {
    id: 'weddings',
    title: 'Weddings',
    description: 'Capturing your special day...',
    images: [
      { src: 'assets/portfolio/weddings/img1.jpg', alt: '...' },
      // ...
    ]
  },
  // ... more collections
];
```

### 8. Packages Page (`website/src/pages/Packages.jsx`)

Update:
- Package names
- Package descriptions
- Pricing (if shown)
- What's included lists
- Booking CTA text

### 9. Contact Page (`website/src/pages/Contact.jsx`)

Update:
- Contact form intro text
- Business address (if shown)
- Contact details
- Business hours
- Social media links

### 10. Privacy Policy (`website/src/pages/PrivacyPolicy.jsx`)

Update:
- Business name throughout
- Contact information
- Data collection practices
- Email service details
- Last updated date

## Asset Organization

Guide the client on organizing their images:

### Recommended Structure:
```
assets/
├── logo/
│   ├── logo.svg
│   └── favicon.ico
├── homepage/
│   ├── hero-image.jpg
│   └── featured-1.jpg
├── portfolio/
│   ├── weddings/
│   │   ├── wedding-1.jpg
│   │   └── wedding-2.jpg
│   ├── portraits/
│   │   └── ...
│   └── events/
│       └── ...
├── about/
│   └── profile-photo.jpg
└── icons/
    ├── instagram.svg
    └── facebook.svg
```

### Image Optimization Tips:

Recommend to the client:
1. **Format:** WebP for best compression (60-70% smaller than JPEG)
2. **Sizes:**
   - Hero images: 1920x1080px (max 200KB)
   - Portfolio images: 1600x1200px (max 150KB)
   - Thumbnails: 800x600px (max 80KB)
3. **Tools:** TinyPNG, Squoosh, ImageOptim

## Step-by-Step Process

### Step 1: Gather Content

**Ask the client:**
```
"Let's update your website content! I'll need information in several categories:

1. Basic info: business name, tagline, contact details
2. About you: bio, experience, photography style
3. Services: what you offer and pricing
4. Portfolio: collection names and photos
5. Social media: links to your profiles

Do you have all this ready, or should we work through it section by section?"
```

### Step 2: Update Text Content First

Start with non-visual content:
1. Navigation and Footer (business name, links)
2. Home page text
3. About page bio
4. Packages/Services descriptions
5. Contact page details
6. Privacy Policy

**For each page:**
```
"Let's start with the [Page Name]. Here's what I need:
- [Specific content item 1]
- [Specific content item 2]
..."
```

### Step 3: Update Image Paths

After client provides image locations:
1. Verify image file names and paths
2. Update all image imports/paths in components
3. Update alt text for accessibility

### Step 4: Update Metadata

Update SEO and social sharing metadata:
- Page titles (unique for each page)
- Meta descriptions (155 characters max)
- Open Graph tags (for Facebook/LinkedIn)
- Twitter Card tags (if applicable)

### Step 5: Test All Content

Run through each page and verify:
- [ ] All text is updated (no "Pelei Niki" or placeholder text)
- [ ] All images load correctly
- [ ] All links work (social media, internal navigation)
- [ ] Contact information is correct
- [ ] Copyright year is current
- [ ] Privacy policy reflects actual practices

**Testing command:**
```bash
cd website
npm run dev
```

Visit each page: Home, About, Portfolio, Packages, Contact, Privacy Policy

### Step 6: SEO Optimization

For each page, optimize:
- **Title:** 50-60 characters, include keywords
- **Description:** 150-160 characters, compelling summary
- **Headings:** Proper hierarchy (H1 → H2 → H3)
- **Alt text:** Descriptive for all images

## Common Content Patterns

### Hero Section (Home Page)
```jsx
<h1 className="text-5xl md:text-7xl font-light">
  [Photographer Name]
</h1>
<p className="text-xl md:text-2xl">
  [Specialty] | [Location]
</p>
```

### Call-to-Action Buttons
```jsx
<Link to="/contact" className="...">
  Book Your Session
</Link>
<Link to="/portfolio" className="...">
  View Portfolio
</Link>
```

### About Bio Structure
```
[Opening hook - what drives your photography]

[Background - experience, training, years in business]

[Approach/Style - how you work with clients]

[Personal touch - what makes you unique]

[Call to action - invite them to connect]
```

### Package Descriptions
```
Package Name: [e.g., "Classic Wedding Package"]

Description: [1-2 sentences about what makes this package great]

Includes:
- [Item 1 - e.g., "6 hours of coverage"]
- [Item 2 - e.g., "300+ edited high-resolution images"]
- [Item 3 - e.g., "Online gallery for sharing"]
- [Item 4 - e.g., "Print release"]

Starting at: [$$$] (or "Contact for pricing")
```

## Language Considerations

**Current site language:** Hungarian (lang="hu")

Ask the client:
```
"What language should your site be in?
- Keep Hungarian (current)
- Switch to English
- Bilingual (requires additional setup)
"
```

If changing language:
1. Update `<html lang="hu">` in `index.html`
2. Update all text content
3. Consider date/time formats
4. Update privacy policy for local regulations

## Quality Control

Before marking content update as complete:

### Text Review
- [ ] No spelling or grammar errors
- [ ] Consistent tone and style
- [ ] All placeholder text replaced
- [ ] Names and titles are correct
- [ ] Contact information is accurate

### Visual Review
- [ ] All images load
- [ ] Images are properly sized
- [ ] Alt text is descriptive
- [ ] Logo displays correctly
- [ ] Favicon shows in browser tab

### Functional Review
- [ ] All internal links work
- [ ] All external links open correctly
- [ ] Contact form has correct recipient
- [ ] Social media links verified
- [ ] Mobile responsive on all pages

### SEO Review
- [ ] Unique page titles
- [ ] Compelling meta descriptions
- [ ] Proper heading structure
- [ ] Image alt text for accessibility
- [ ] No broken links

## Example Client Conversation

**You:** "Let's update your website content! First, what's your business name and tagline?"

**Client:** "Golden Hour Photography - Capturing Life's Precious Moments"

**You:** "Beautiful! Let's start with your About page. Can you share a brief bio? I need 2-3 paragraphs about your background, photography style, and what makes your work unique."

**Client:** [Provides bio text]

**You:** "Perfect! I've updated the About page. Now, what are your main photography services? For example: weddings, portraits, family sessions, etc.?"

**Client:** "I specialize in weddings and couple portraits."

**You:** "Great! Let's set up your portfolio collections for those. Do you have your photos organized? I'll need them grouped by collection type..."

[Continue gathering content methodically]

## Helpful Tips

- **Start with text, then images** - Easier to iterate on copy
- **Use placeholders temporarily** - If images aren't ready, use temporary images and note what's needed
- **Keep client's voice** - Use their language and tone, don't over-edit
- **Mobile-first** - View on mobile while editing to ensure text length works
- **Save original content** - Comment out original content instead of deleting (easy reference)

## Troubleshooting

**Issue:** "The client doesn't have a written bio"

**Solution:** Interview them with questions:
- How did you get into photography?
- What do you love most about your work?
- How would you describe your style?
- What makes your approach unique?

Then draft a bio for their approval.

---

**Issue:** "Images are different sizes/ratios"

**Solution:** Recommend consistent aspect ratios per section:
- Hero images: 16:9
- Portfolio images: 3:2 or 4:3
- Profile photos: 1:1 (square)

Provide image editing guidance or tools (Canva, Photopea).

---

**Issue:** "Client unsure about pricing display"

**Solution:** Offer options:
1. Show full pricing (transparent, attracts serious inquiries)
2. Show starting prices ("Starting at $...")
3. "Contact for pricing" (allows custom quotes)

Recommend based on their business model and target market.
