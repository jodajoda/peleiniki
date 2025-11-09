# Migration Guide: GitHub Pages → Firebase Hosting

This guide provides a step-by-step process for migrating your portfolio website from GitHub Pages to Firebase Hosting.

## Migration Overview

**Current Setup:**
- Hosting: GitHub Pages
- Domain: peleiniki.com
- DNS: GitHub Pages A records
- Deployment: Automated via `.github/workflows/deploy.yml`

**New Setup:**
- Hosting: Firebase Hosting
- Domain: peleiniki.com (same domain, new DNS)
- Firebase Project: `peleiniki-portfolio`
- Deployment: Automated via `.github/workflows/firebase-deploy.yml`

## Pre-Migration Checklist

Before starting the migration, ensure you have:

- [ ] Firebase project created: `peleiniki-portfolio`
- [ ] Access to your domain registrar (for DNS changes)
- [ ] GitHub repository admin access (for secrets)
- [ ] Firebase CLI installed (optional, for local testing)

## Migration Steps

### Step 1: Set Up Firebase Service Account

This is the most critical step for enabling automated deployments.

**Recommended: Use Firebase CLI**

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize GitHub integration (run from repository root)
firebase init hosting:github
```

When prompted:
1. Select repository: `jodajoda/peleiniki`
2. Choose to set up workflow: **No** (we already have the workflow)
3. The CLI will automatically create and add the GitHub secret

**Alternative: Manual Setup**

If the automated setup doesn't work:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: `peleiniki-portfolio`
3. Navigate to **Project Settings** → **Service Accounts**
4. Click **Generate New Private Key**
5. Save the JSON file
6. Go to GitHub: `Settings` → `Secrets and variables` → `Actions`
7. Create new secret: `FIREBASE_SERVICE_ACCOUNT_PELEINIKI_PORTFOLIO`
8. Paste the entire JSON content

### Step 2: Verify Deployment Configuration

All configuration files are already in place:

```
✅ firebase.json - Firebase hosting configuration
✅ .firebaserc - Firebase project settings
✅ .github/workflows/firebase-deploy.yml - Deployment workflow
✅ .github/workflows/deploy.yml.disabled - Old workflow (disabled)
```

### Step 3: Test Deployment (Optional but Recommended)

Before making DNS changes, test the Firebase deployment:

1. **Push to a test branch** (optional):
   ```bash
   git checkout -b test-firebase-deploy
   git add .
   git commit -m "Test Firebase deployment"
   git push origin test-firebase-deploy
   ```

2. **Or push to main** (deployment will happen automatically):
   ```bash
   git add .
   git commit -m "Migrate to Firebase Hosting"
   git push origin main
   ```

3. **Monitor GitHub Actions**:
   - Go to repository → Actions tab
   - Watch the workflow run
   - Ensure all jobs pass: test → build → deploy

4. **Verify Firebase deployment**:
   - Default URL: https://peleiniki-portfolio.web.app
   - Alternative: https://peleiniki-portfolio.firebaseapp.com
   - Test all pages and functionality

### Step 4: Configure Custom Domain in Firebase

Now that deployment works, set up your custom domain:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: `peleiniki-portfolio`
3. Navigate to **Hosting** section
4. Click **Add custom domain**
5. Enter: `peleiniki.com`
6. Firebase will display DNS records you need to add

**Example DNS Records (Firebase will provide exact values):**

```
Type: A
Name: @
Value: <Firebase IP addresses>

Type: CNAME
Name: www
Value: peleiniki-portfolio.web.app
```

7. Keep this page open - you'll need these values for the next step

### Step 5: Update DNS Records

**IMPORTANT:** Make these changes during low-traffic hours if possible.

**At your domain registrar:**

1. **Remove old GitHub Pages records**:
   - Delete A records pointing to:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Delete any CNAME record pointing to `jodajoda.github.io`

2. **Add new Firebase records**:
   - Add A records with values provided by Firebase
   - Add CNAME record for www subdomain

3. **Save changes**

**DNS Propagation:**
- Can take 24-48 hours for full propagation
- Initial changes may be visible in 5-10 minutes
- Use https://dnschecker.org to monitor propagation worldwide

### Step 6: Verify Domain Connection

After DNS propagation begins:

1. **In Firebase Console**:
   - Return to the custom domain setup page
   - Firebase will automatically verify DNS records
   - Status will change from "Pending" to "Connected"
   - SSL certificate will be automatically provisioned

2. **Test the domain**:
   ```bash
   # Check DNS resolution
   dig peleiniki.com

   # Check SSL certificate
   curl -I https://peleiniki.com
   ```

3. **Browser testing**:
   - Visit https://peleiniki.com
   - Verify all pages load correctly
   - Check browser console for errors
   - Test contact form and all interactive features

### Step 7: Clean Up GitHub Pages

Once Firebase is working correctly:

1. **Disable GitHub Pages** (optional):
   - Go to repository **Settings** → **Pages**
   - Under "Source", select "None"
   - This prevents accidental deployments

2. **Keep old workflow disabled**:
   - The file `.github/workflows/deploy.yml.disabled` is preserved for reference
   - It will not run but can be restored if needed

## Rollback Plan

If you encounter issues and need to rollback to GitHub Pages:

### Quick Rollback

1. **Re-enable GitHub Pages workflow**:
   ```bash
   mv .github/workflows/deploy.yml.disabled .github/workflows/deploy.yml
   ```

2. **Disable Firebase workflow**:
   ```bash
   mv .github/workflows/firebase-deploy.yml .github/workflows/firebase-deploy.yml.disabled
   ```

3. **Restore DNS records**:
   - Remove Firebase DNS records
   - Add back GitHub Pages A records
   - Restore CNAME if removed

4. **Re-enable GitHub Pages**:
   - Go to repository **Settings** → **Pages**
   - Source: Deploy from branch `main`
   - Custom domain: `peleiniki.com`

5. **Push to trigger deployment**:
   ```bash
   git add .
   git commit -m "Rollback to GitHub Pages"
   git push origin main
   ```

## Post-Migration Checklist

After successful migration:

- [ ] All pages load correctly on https://peleiniki.com
- [ ] SSL certificate is active (https, no warnings)
- [ ] Contact form works (EmailJS integration)
- [ ] Images load properly
- [ ] Navigation works on all pages
- [ ] Lightbox functionality works
- [ ] Mobile responsiveness is maintained
- [ ] Analytics updated (if using Google Analytics)

## Monitoring and Maintenance

### Firebase Hosting Features

**Deployment History:**
- View in Firebase Console → Hosting → Release History
- Rollback to previous versions if needed

**Usage Monitoring:**
- Firebase Console → Hosting → Usage tab
- Monitor bandwidth and requests

**Performance:**
- Firebase automatically serves from global CDN
- Built-in caching for static assets

### GitHub Actions

**Monitor Deployments:**
- Repository → Actions tab
- All deployments are logged with test results

**Email Notifications:**
- GitHub sends emails on workflow failures
- Configure in repository settings

## Troubleshooting

### Deployment Fails

**Error: "Resource not accessible by integration"**
- Check that `FIREBASE_SERVICE_ACCOUNT_PELEINIKI_PORTFOLIO` secret is set
- Verify the JSON is valid

**Error: "Permission denied"**
- Service account may not have correct permissions
- Re-generate service account with Firebase CLI

### DNS Issues

**Domain not resolving**
- Wait longer - propagation can take 48 hours
- Clear browser DNS cache: `chrome://net-internals/#dns`
- Try different DNS servers: `nslookup peleiniki.com 8.8.8.8`

**SSL Certificate Error**
- Firebase provisions SSL automatically after DNS verification
- Can take several hours after DNS is verified
- Check Firebase Console for status

### Build Issues

**Environment Variables Missing**
- Verify all EmailJS secrets are still in GitHub
- Check workflow environment configuration

**Tests Failing**
- Review test logs in GitHub Actions
- Ensure all dependencies are up to date

## Additional Resources

- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [Custom Domain Setup](https://firebase.google.com/docs/hosting/custom-domain)
- [GitHub Actions for Firebase](https://github.com/FirebaseExtended/action-hosting-deploy)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)

## Support

If you encounter issues:

1. Check [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for detailed setup instructions
2. Review Firebase Console for error messages
3. Check GitHub Actions logs for deployment errors
4. Use Firebase support forums for Firebase-specific issues
5. Check GitHub Discussions for repository-specific questions

## Timeline

**Estimated migration time:** 2-4 hours (excluding DNS propagation)

- Setup: 30 minutes
- Testing: 30 minutes
- DNS changes: 5 minutes (but 24-48 hours to propagate)
- Verification: 30 minutes
- Buffer for troubleshooting: 1-2 hours

**Best time to migrate:** During low-traffic hours or weekends
