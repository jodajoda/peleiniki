# GitHub Secrets Setup Guide

## Quick Setup for EmailJS Credentials

This guide shows you how to configure GitHub Secrets so your contact form works on the deployed site.

---

## Why Do I Need This?

Your `.env` file is **gitignored** (not uploaded to GitHub), so when GitHub Actions builds your site, it doesn't have access to your EmailJS credentials. Without GitHub Secrets, **the contact form won't work on the live site**.

---

## Step-by-Step Instructions

### 1. Access Repository Settings

1. Go to your repository: [https://github.com/jodajoda/peleiniki](https://github.com/jodajoda/peleiniki)
2. Click the **Settings** tab (top navigation)
3. In the left sidebar, click **Secrets and variables** → **Actions**

![GitHub Secrets Location](https://docs.github.com/assets/cb-121025/mw-1440/images/help/repository/actions-secrets-variables-menu.webp)

### 2. Add Three Secrets

Click **New repository secret** and add each of these **three times** (one for each secret):

#### Secret 1: Service ID
- **Name:** `VITE_EMAILJS_SERVICE_ID`
- **Value:** `service_lxc4g8l` *(or your actual Service ID from EmailJS)*
- Click **Add secret**

#### Secret 2: Template ID
- **Name:** `VITE_EMAILJS_TEMPLATE_ID`
- **Value:** `template_n3otimx` *(or your actual Template ID from EmailJS)*
- Click **Add secret**

#### Secret 3: Public Key
- **Name:** `VITE_EMAILJS_PUBLIC_KEY`
- **Value:** `00skKQszSH1adZxe3` *(or your actual Public Key from EmailJS)*
- Click **Add secret**

### 3. Verify Secrets Are Added

You should see all three secrets listed:

```
VITE_EMAILJS_SERVICE_ID     Updated X seconds ago
VITE_EMAILJS_TEMPLATE_ID    Updated X seconds ago
VITE_EMAILJS_PUBLIC_KEY     Updated X seconds ago
```

**Note:** You won't be able to view the secret values after adding them (they're encrypted).

---

## How to Find Your EmailJS Credentials

If you don't have your credentials handy:

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Log in to your account
3. **Service ID:**
   - Go to **Email Services**
   - Copy the **Service ID** (e.g., `service_lxc4g8l`)
4. **Template ID:**
   - Go to **Email Templates**
   - Copy the **Template ID** (e.g., `template_n3otimx`)
5. **Public Key:**
   - Go to **Account** → **General**
   - Copy your **Public Key** (e.g., `00skKQszSH1adZxe3`)

---

## Testing the Deployment

### After Adding Secrets:

1. **Make a small change** to your repository (e.g., edit README.md)
2. **Commit and push** to the `main` branch:
   ```bash
   git add .
   git commit -m "test: trigger deployment with secrets"
   git push origin main
   ```
3. **Check deployment status:**
   - Go to the **Actions** tab in GitHub
   - Watch the deployment workflow run
   - Wait for it to complete (green checkmark ✓)
4. **Test the contact form:**
   - Visit: [https://jodajoda.github.io/peleiniki/contact](https://jodajoda.github.io/peleiniki/contact)
   - Fill out and submit the form
   - Check your email to confirm it was sent

---

## Troubleshooting

### ❌ Contact form shows "EmailJS credentials are not configured"

**Cause:** GitHub Secrets not set up correctly

**Solution:**
1. Double-check secret names are **exactly** as shown (case-sensitive, including `VITE_` prefix)
2. Verify all three secrets exist in GitHub repository settings
3. Re-run the GitHub Actions workflow:
   - Go to **Actions** tab
   - Click on the latest workflow run
   - Click **Re-run all jobs**

### ❌ Build fails in GitHub Actions

**Cause:** Typo in secret names or missing secrets

**Solution:**
1. Check the GitHub Actions logs for error messages
2. Verify secret names match exactly: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`
3. Ensure you didn't add spaces before/after the secret values

### ❌ Form submits but emails don't arrive

**Cause:** Invalid EmailJS credentials or domain restrictions

**Solution:**
1. Verify credentials in EmailJS dashboard are correct
2. Check EmailJS dashboard usage to see if requests are being received
3. Ensure domain whitelist includes `jodajoda.github.io` (see [SECURITY.md](SECURITY.md))
4. Check spam folder in your email

### ❌ Browser console shows "The Public Key is invalid"

**Cause:** Wrong public key value

**Solution:**
1. Go to EmailJS Dashboard → Account → General
2. Copy the **Public Key** (not the User ID)
3. Update the `VITE_EMAILJS_PUBLIC_KEY` secret in GitHub with the correct value
4. Re-deploy

---

## Security Notes

### Are GitHub Secrets Safe?

- ✅ **Yes** - GitHub Secrets are encrypted and only accessible to repository maintainers
- ✅ **Yes** - They're hidden from GitHub Actions logs
- ✅ **Yes** - They're only available during workflow runs

### But Aren't They Exposed in the Browser?

- ⚠️ **Yes** - After being bundled into JavaScript, they become visible in browser dev tools
- 🔒 **That's OK** - EmailJS public keys are designed to be exposed
- 🛡️ **Primary Security** - Domain restrictions in EmailJS dashboard (not secret values)

**Summary:** GitHub Secrets protect your credentials from being committed to version control, but the values are still bundled into client-side JavaScript. This is expected and acceptable for EmailJS public keys, as long as you configure domain restrictions.

---

## What's Next?

After setting up GitHub Secrets:

1. ✅ Configure domain whitelist in EmailJS dashboard (see [SECURITY.md](SECURITY.md#-critical-required-emailjs-dashboard-configuration))
2. ✅ Test the contact form on your live site
3. ✅ Monitor EmailJS dashboard usage periodically

---

## Need Help?

- **EmailJS Documentation:** [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- **GitHub Secrets Documentation:** [https://docs.github.com/en/actions/security-guides/encrypted-secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- **Full Security Guide:** [SECURITY.md](SECURITY.md)

---

**Last Updated:** 2025-10-10
