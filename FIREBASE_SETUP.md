# Firebase Hosting Setup Guide

This guide will help you complete the migration from GitHub Pages to Firebase Hosting.

## Prerequisites

- Firebase project already created: `peleiniki-portfolio`
- GitHub repository with existing EmailJS secrets
- Firebase CLI installed (optional for local testing)

## Step 1: Generate Firebase Service Account

You need to create a service account for GitHub Actions to deploy to Firebase.

### Option A: Using Firebase CLI (Recommended)

1. Install Firebase CLI if not already installed:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Generate a service account key:
   ```bash
   firebase init hosting:github
   ```

   This command will:
   - Ask you to select the repository
   - Automatically create the service account
   - Add the `FIREBASE_SERVICE_ACCOUNT_PELEINIKI_PORTFOLIO` secret to GitHub
   - Set up the workflow (you can skip this since we already have the workflow)

### Option B: Manual Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `peleiniki-portfolio`
3. Go to **Project Settings** → **Service Accounts**
4. Click **Generate New Private Key**
5. Save the JSON file securely (you'll need it for the next step)

## Step 2: Add GitHub Secret

If you used Option B above or if the automatic setup didn't work:

1. Go to your GitHub repository: `https://github.com/jodajoda/peleiniki`
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `FIREBASE_SERVICE_ACCOUNT_PELEINIKI_PORTFOLIO`
5. Value: Paste the entire contents of the service account JSON file
6. Click **Add secret**

## Step 3: Verify Existing Secrets

The following secrets should already exist in your GitHub repository (used for EmailJS):

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

These will continue to work with Firebase Hosting without any changes.

## Step 4: Configure Custom Domain in Firebase

To use your custom domain `peleiniki.com` with Firebase Hosting:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: `peleiniki-portfolio`
3. Go to **Hosting** in the left menu
4. Click **Add custom domain**
5. Enter your domain: `peleiniki.com`
6. Firebase will provide DNS records to add to your domain registrar

### DNS Configuration

Firebase will give you specific DNS records. Typically you'll need to add:

**For apex domain (peleiniki.com):**
- Type: `A`
- Host: `@`
- Value: Firebase IP addresses (provided in the console)

**For www subdomain:**
- Type: `CNAME`
- Host: `www`
- Value: Your Firebase hosting domain (e.g., `peleiniki-portfolio.web.app`)

**Important:**
- Remove the old GitHub Pages DNS records before adding Firebase records
- DNS propagation can take 24-48 hours
- Firebase will automatically provision SSL certificates

## Step 5: Test Local Deployment (Optional)

Before deploying via GitHub Actions, you can test locally:

1. Build the project:
   ```bash
   cd website
   npm run build
   ```

2. Test Firebase hosting locally:
   ```bash
   firebase serve
   ```

3. Deploy manually (if you want to test):
   ```bash
   firebase deploy
   ```

## Step 6: Deploy via GitHub Actions

Once everything is set up:

1. Disable the old GitHub Pages workflow:
   - Rename `.github/workflows/deploy.yml` to `.github/workflows/deploy.yml.disabled`
   - Or delete it if you're confident

2. Push changes to the `main` branch:
   ```bash
   git add .
   git commit -m "Migrate to Firebase Hosting"
   git push origin main
   ```

3. GitHub Actions will automatically:
   - Run tests
   - Build the project
   - Deploy to Firebase Hosting

4. Check the Actions tab in GitHub to monitor the deployment

## Step 7: Verify Deployment

After deployment completes:

1. Check your Firebase Hosting URL:
   - Default: `https://peleiniki-portfolio.web.app`
   - Or: `https://peleiniki-portfolio.firebaseapp.com`

2. Once DNS propagates, verify custom domain:
   - https://peleiniki.com

3. Test all pages and functionality

## Rollback Plan

If you need to rollback to GitHub Pages:

1. Re-enable the GitHub Pages workflow
2. Go to repository **Settings** → **Pages**
3. Re-configure the source branch
4. Remove Firebase DNS records and restore GitHub Pages DNS

## Firebase CLI Commands Reference

Useful commands for managing your Firebase deployment:

```bash
# Login to Firebase
firebase login

# List your projects
firebase projects:list

# Deploy to Firebase Hosting
firebase deploy --only hosting

# View deployment history
firebase hosting:channel:list

# View hosting logs
firebase hosting:channel:open live
```

## Troubleshooting

### Deployment Fails with Authentication Error
- Verify `FIREBASE_SERVICE_ACCOUNT_PELEINIKI_PORTFOLIO` secret is set correctly
- The secret should be valid JSON
- Check that the service account has proper permissions

### Custom Domain Not Working
- Wait 24-48 hours for DNS propagation
- Use [dnschecker.org](https://dnschecker.org) to verify DNS records
- Ensure old GitHub Pages DNS records are removed

### Build Fails
- Check that EmailJS secrets are still configured
- Verify Node.js version is 20
- Check GitHub Actions logs for specific errors

## Additional Resources

- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [GitHub Actions for Firebase](https://github.com/FirebaseExtended/action-hosting-deploy)
- [Custom Domain Setup](https://firebase.google.com/docs/hosting/custom-domain)
