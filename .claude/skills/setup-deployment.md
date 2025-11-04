# Setup Deployment

You are tasked with configuring deployment for a photography portfolio website.

## Objective

Set up automated deployment to GitHub Pages with optional custom domain configuration, ensuring the site is accessible and properly configured.

## Deployment Options

Ask the client:
```
"How would you like to deploy your website?

1. GitHub Pages with default URL ([username].github.io/[repo-name])
2. GitHub Pages with custom domain (e.g., yourdomain.com)
3. Other hosting (Netlify, Vercel, custom server)

Option 1 is free and automatic. Option 2 requires owning a domain ($10-15/year).
Which would you prefer?"
```

## Option 1: GitHub Pages (Default URL)

### Configuration Steps

#### 1. Update Vite Config

File: `website/vite.config.js`

If deploying to `username.github.io/repository-name`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/repository-name/',  // Add repository name
})
```

If deploying to `username.github.io` (repository named `username.github.io`):

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/',  // Root path
})
```

#### 2. Update Router Base

File: `website/src/App.jsx`

Match the base to Vite config:

```jsx
<Router basename="/repository-name">  {/* Or "/" for root */}
  <ScrollToTop />
  <Navigation />
  <Routes>
    {/* ... routes */}
  </Routes>
  <Footer />
</Router>
```

#### 3. Verify GitHub Actions Workflow

File: `.github/workflows/deploy.yml`

Ensure it exists and contains:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies
        run: cd website && npm ci
      - name: Install Playwright
        run: cd website && npx playwright install --with-deps
      - name: Run tests
        run: cd website && npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies
        run: cd website && npm ci
      - name: Build
        env:
          VITE_EMAILJS_SERVICE_ID: ${{ secrets.EMAILJS_SERVICE_ID }}
          VITE_EMAILJS_TEMPLATE_ID: ${{ secrets.EMAILJS_TEMPLATE_ID }}
          VITE_EMAILJS_PUBLIC_KEY: ${{ secrets.EMAILJS_PUBLIC_KEY }}
        run: cd website && npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: website/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### 4. Enable GitHub Pages

Guide the client:

```
"Now we need to enable GitHub Pages in your repository settings:

1. Go to your GitHub repository
2. Click 'Settings' tab
3. Click 'Pages' in the left sidebar
4. Under 'Source', select 'GitHub Actions'
5. Save

That's it! Your site will deploy automatically when you push to the main branch."
```

#### 5. First Deployment

```bash
git add .
git commit -m "Configure deployment for GitHub Pages"
git push origin main
```

Monitor deployment:
```
"Check the 'Actions' tab in your GitHub repository to see the deployment progress.
It usually takes 2-3 minutes. Once complete, your site will be at:
https://[username].github.io/[repository-name]"
```

## Option 2: GitHub Pages with Custom Domain

### Prerequisites

Client must have:
- A registered domain name
- Access to domain registrar's DNS settings

### Configuration Steps

#### 1. Configure for Root Domain

File: `website/vite.config.js`

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/',  // Always root for custom domain
})
```

File: `website/src/App.jsx`

```jsx
<Router basename="/">
  {/* ... */}
</Router>
```

#### 2. Add CNAME File

File: `website/public/CNAME`

Create this file with the domain:

```
yourdomain.com
```

Or for subdomain:
```
www.yourdomain.com
```

#### 3. Configure DNS Records

Guide the client to their domain registrar:

```
"You need to add DNS records at your domain registrar (GoDaddy, Namecheap, etc.):

For apex domain (yourdomain.com):
Add these A records:

185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153

For www subdomain (optional):
Add CNAME record:
www.yourdomain.com → [your-username].github.io

DNS changes can take 24-48 hours to propagate globally."
```

#### 4. Configure GitHub Pages

After DNS is configured:

```
"In your GitHub repository:

1. Go to Settings → Pages
2. Under 'Custom domain', enter: yourdomain.com
3. Wait for DNS check to complete (green checkmark)
4. Enable 'Enforce HTTPS' (may need to wait for SSL certificate)

GitHub will automatically provision an SSL certificate for your domain."
```

#### 5. Deploy

```bash
git add .
git commit -m "Configure custom domain deployment"
git push origin main
```

### DNS Verification

Help client verify DNS:

```bash
# Check A records
dig yourdomain.com

# Check CNAME
dig www.yourdomain.com
```

Or use online tools:
- [DNS Checker](https://dnschecker.org)
- [What's My DNS](https://whatsmydns.net)

## Option 3: Alternative Hosting

### Netlify

**Advantages:**
- Simpler deployment
- Automatic HTTPS
- Form handling built-in
- Better performance

**Configuration:**

File: `website/netlify.toml`

```toml
[build]
  command = "cd website && npm run build"
  publish = "website/dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "20"
```

**Deployment steps:**
1. Connect repository to Netlify
2. Set build command: `cd website && npm run build`
3. Set publish directory: `website/dist`
4. Add environment variables (EmailJS secrets)
5. Deploy

### Vercel

**Advantages:**
- Excellent React/Vite support
- Fast global CDN
- Automatic previews for PRs

**Configuration:**

File: `vercel.json`

```json
{
  "buildCommand": "cd website && npm run build",
  "outputDirectory": "website/dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Deployment steps:**
1. Import repository in Vercel
2. Configure build settings (auto-detected for Vite)
3. Add environment variables
4. Deploy

## Deployment Checklist

Before going live, verify:

- [ ] Build completes without errors (`npm run build`)
- [ ] Tests pass (`npm test`)
- [ ] All images load correctly
- [ ] Navigation works on all pages
- [ ] Contact form works (EmailJS configured)
- [ ] Social media links are correct
- [ ] Mobile responsive on various devices
- [ ] SEO metadata is updated
- [ ] Privacy policy is customized
- [ ] HTTPS is enabled (for custom domains)
- [ ] 404 page works (if custom 404 created)

## Testing Deployment

### Local Production Preview

Before deploying:

```bash
cd website
npm run build
npm run preview
```

Visit `http://localhost:4173` and test:
- All pages load
- Images display
- Links work
- Forms submit

### Post-Deployment Testing

After deployment, test on the live URL:

**Functionality:**
- [ ] Home page loads
- [ ] All navigation links work
- [ ] Images load (check browser console for errors)
- [ ] Contact form submits
- [ ] Lightbox works in portfolio
- [ ] Mobile menu functions

**Performance:**
- [ ] Page load time < 3 seconds
- [ ] Images are optimized (WebP preferred)
- [ ] No console errors

**SEO:**
- [ ] Meta tags are correct (view page source)
- [ ] Open Graph tags for social sharing
- [ ] Sitemap accessible (if generated)
- [ ] robots.txt allows indexing

**Cross-Browser:**
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## Continuous Deployment

Explain to the client:

```
"Your site is now set up for continuous deployment!

Whenever you push changes to the main branch:
1. Tests run automatically
2. If tests pass, the site builds
3. New version deploys automatically
4. Live site updates in 2-3 minutes

To update your site:
1. Make changes locally
2. Test with 'npm run dev'
3. Commit and push to main
4. Check 'Actions' tab for deployment status"
```

## Rollback Procedure

If a deployment breaks the site:

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or rollback to specific commit
git reset --hard [commit-hash]
git push --force origin main
```

GitHub Pages also allows manual redeployment of previous versions in the Actions tab.

## Performance Optimization

### Enable Compression

GitHub Pages automatically serves files with gzip compression.

For other hosts, ensure:
- Gzip or Brotli compression enabled
- Asset caching configured
- CDN enabled (if available)

### Image Optimization

Remind client:
```
"For best performance, ensure:
- Use WebP format for images
- Compress before uploading (TinyPNG, Squoosh)
- Serve responsive sizes (already configured in Lightbox)"
```

### Lighthouse Audit

After deployment, run Google Lighthouse:

```
"Open your live site in Chrome:
1. Right-click → Inspect
2. Click 'Lighthouse' tab
3. Click 'Generate report'

Aim for scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+"
```

## Monitoring & Analytics

### Google Analytics (Optional)

If client wants analytics:

File: `website/index.html`

Add before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Uptime Monitoring

Recommend free services:
- UptimeRobot (50 monitors free)
- Freshping
- StatusCake

## Troubleshooting

### Issue: 404 errors on page refresh

**Cause:** SPA routing not configured

**Solution:** Ensure SPA redirect is set up:
- GitHub Pages: Using client-side routing (works with current setup)
- Netlify: Add `_redirects` file or `netlify.toml`
- Vercel: Add `vercel.json` with rewrites

### Issue: Images not loading

**Cause:** Incorrect base path

**Solution:**
- Verify `base` in `vite.config.js` matches deployment URL structure
- Check image paths start with `assets/` not `/assets/`
- Verify `public` folder symlink is correct

### Issue: CSS not applying

**Cause:** Build issue or missing Tailwind directives

**Solution:**
- Rebuild: `npm run build`
- Check `src/index.css` has Tailwind imports
- Clear browser cache

### Issue: Environment variables not working

**Cause:** Secrets not configured in GitHub

**Solution:**
- Add secrets in GitHub: Settings → Secrets and variables → Actions
- Use exact names: `EMAILJS_SERVICE_ID`, etc.
- Restart deployment

### Issue: Custom domain not resolving

**Cause:** DNS not propagated or misconfigured

**Solution:**
- Wait 24-48 hours for DNS propagation
- Verify DNS records with `dig` command
- Check GitHub Pages shows green checkmark for domain
- Ensure CNAME file exists in `website/public/`

## Security Considerations

Remind client:

```
"Important security notes:

1. Never commit .env files with secrets
2. Use GitHub Secrets for sensitive data
3. Enable 'Enforce HTTPS' in GitHub Pages
4. Configure EmailJS domain whitelist
5. Keep dependencies updated (npm audit)
6. Review privacy policy for GDPR compliance"
```

## Success Confirmation

Once deployed, confirm with client:

```
"Congratulations! Your site is now live! 🎉

Your website: [URL]

Next steps:
1. Test all functionality on the live site
2. Share with friends for feedback
3. Submit to Google Search Console (for SEO)
4. Share on social media
5. Update business cards with new URL

The site will automatically update when you push changes to the main branch.
Need any changes? Just let me know!"
```

## Post-Deployment Checklist

Send this to the client:

- [ ] Bookmark live site URL
- [ ] Test contact form with real email
- [ ] Share site with test users for feedback
- [ ] Add URL to social media profiles
- [ ] Update Google My Business (if applicable)
- [ ] Submit to Google Search Console
- [ ] Set up Google Analytics (optional)
- [ ] Schedule regular content updates
- [ ] Monitor site performance monthly
- [ ] Keep repository backups

## Resources

Share helpful links:
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [Custom Domain Setup](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PageSpeed Insights](https://pagespeed.web.dev/)
