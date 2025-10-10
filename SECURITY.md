# Security Guide for Pelei Niki Photography Portfolio

This document outlines security best practices and configuration steps for the EmailJS integration in this photography portfolio website.

---

## Overview

This website uses EmailJS to handle contact form submissions client-side. While EmailJS public keys are designed to be exposed in frontend code, proper security measures must be implemented to prevent abuse.

---

## Current Security Measures

### ✅ Implemented Security Features

1. **Environment Variables** - EmailJS credentials stored in `.env` file for easier management
2. **Rate Limiting** - Client-side throttling prevents submissions within 30 seconds of each other
3. **Git Protection** - `.env` files excluded from version control via `.gitignore`
4. **Validation** - Form validates credentials exist before attempting to send

---

## 🔴 CRITICAL: Required EmailJS Dashboard Configuration

**You MUST complete these steps in your EmailJS dashboard immediately:**

### 1. Domain Whitelisting (MOST IMPORTANT)

This prevents unauthorized websites from using your public key to send emails through your account.

**Steps:**
1. Log in to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Navigate to **Account** → **Security**
3. Enable **"Allow only from specific domains"**
4. Add the following domains:
   ```
   jodajoda.github.io
   localhost
   ```
5. Click **Save**

**Why this matters:**
- Without domain restrictions, anyone who finds your public key can abuse your email quota
- Malicious actors could trigger your templates repeatedly
- This is your primary defense against abuse

---

### 2. Enable Private Key (Recommended)

For enhanced security, enable EmailJS's private key feature.

**Steps:**
1. In EmailJS Dashboard, go to **Account** → **Security**
2. Enable **"Use Private Key"**
3. Copy your **Private Key**
4. ⚠️ **For full security, this requires implementing a serverless function** (see Advanced Security below)

**Note:** The current implementation doesn't use private keys to keep setup simple. For a small portfolio site with domain restrictions, this is acceptable.

---

### 3. Monitor Usage

Regularly check your EmailJS dashboard for unusual activity.

**Steps:**
1. Navigate to **Dashboard** → **Usage**
2. Review email send counts
3. Set up email notifications for quota thresholds if available

**Warning signs:**
- Sudden spike in email sends
- Emails sent when you weren't expecting any
- Approaching quota limits unexpectedly

---

## Environment Variables Setup

### Local Development

The `.env` file contains your EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=service_lxc4g8l
VITE_EMAILJS_TEMPLATE_ID=template_n3otimx
VITE_EMAILJS_PUBLIC_KEY=00skKQszSH1adZxe3
```

**Important Notes:**
- ⚠️ These values are **NOT secret** - they're bundled into client-side JavaScript
- The `.env` file is for **convenience**, not security
- Anyone can view these values in the browser's developer tools
- **Never** commit `.env` files to version control (already protected via `.gitignore`)

### Production Deployment (GitHub Pages)

For GitHub Pages deployment, environment variables must be configured as **GitHub Secrets** since `.env` files are gitignored and won't be available during CI/CD builds.

#### Setting Up GitHub Secrets

**Step 1: Add Secrets to GitHub Repository**

1. Go to your GitHub repository: `https://github.com/jodajoda/peleiniki`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each of the following secrets:

| Secret Name | Value | Example |
|-------------|-------|---------|
| `VITE_EMAILJS_SERVICE_ID` | Your EmailJS Service ID | `service_lxc4g8l` |
| `VITE_EMAILJS_TEMPLATE_ID` | Your EmailJS Template ID | `template_n3otimx` |
| `VITE_EMAILJS_PUBLIC_KEY` | Your EmailJS Public Key | `00skKQszSH1adZxe3` |

**Step 2: How It Works**

The GitHub Actions workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) automatically:
1. Reads secrets from GitHub repository settings
2. Injects them as environment variables during the build step
3. Vite bundles them into the production JavaScript
4. Deploys to GitHub Pages with credentials embedded

**Step 3: Verify Deployment**

After pushing to `main` branch:
1. Check **Actions** tab in GitHub to see deployment status
2. Visit your live site: `https://jodajoda.github.io/peleiniki/contact`
3. Test the contact form to ensure emails are sent successfully

**Important Notes:**
- ✅ GitHub Secrets are encrypted and secure
- ✅ Only visible to repository maintainers
- ✅ Automatically available to GitHub Actions workflows
- ⚠️ Values are still bundled into client-side JavaScript (visible in browser)
- 🔒 Domain restrictions in EmailJS dashboard are still your primary security

**Local Development:**
```bash
cd website
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

---

## Rate Limiting Implementation

### Client-Side Throttling

The contact form includes rate limiting to prevent spam:

**Configuration:**
- **Cooldown Period**: 30 seconds between submissions
- **Implementation**: [Contact.jsx:38-50](website/src/pages/Contact.jsx#L38-L50)
- **User Feedback**: Displays remaining seconds if user tries to submit too soon

**Limitations:**
- Client-side only (can be bypassed by determined attackers)
- Resets on page refresh
- Browser-specific (doesn't track across devices)

**Why it's still useful:**
- Prevents accidental double-submissions
- Protects against simple bots
- Reduces load on EmailJS quota
- Works alongside EmailJS's server-side rate limits

---

## Advanced Security (Optional)

For maximum security, implement a serverless function to keep credentials truly private.

### Serverless Function Approach

**Architecture:**
```
User → Contact Form → Serverless Function → EmailJS → Email
```

**Benefits:**
- Private key never exposed to client
- Server-side validation possible
- Additional spam protection (CAPTCHA, honeypot fields)
- Request logging and monitoring

### Implementation Options

#### Option 1: Vercel Functions

1. Create `api/send-email.js` in project root:
```javascript
import emailjs from '@emailjs/browser';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message } = req.body;

    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      { from_name: name, from_email: email, phone, message },
      process.env.EMAILJS_PUBLIC_KEY
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
```

2. Update `Contact.jsx` to POST to `/api/send-email`
3. Set environment variables in Vercel dashboard (Account → Settings → Environment Variables)

#### Option 2: Netlify Functions

Similar approach using Netlify Functions directory structure.

**Trade-offs:**
- ✅ True credential security
- ✅ Server-side validation
- ❌ Requires serverless hosting (Vercel/Netlify, not GitHub Pages)
- ❌ More complex deployment

---

## Security FAQ

### Q: Is it safe to expose EmailJS public keys?
**A:** Yes, by design. EmailJS public keys only trigger predefined email templates. However, you MUST set domain restrictions to prevent abuse.

### Q: Why not use environment variables for true security?
**A:** In frontend apps like React, environment variables are embedded into the JavaScript bundle at build time. They're visible in the browser's source code. True security requires server-side processing.

### Q: What's the worst-case scenario without domain restrictions?
**A:** Someone could repeatedly trigger your email template, exhausting your EmailJS quota or causing spam. They cannot send arbitrary emails or access your account.

### Q: Should I rotate my public key?
**A:** Only if you suspect abuse or forgot to set domain restrictions. Rotation requires updating your `.env` file and redeploying.

### Q: Can attackers send spam emails through my account?
**A:** No. They can only trigger your predefined template with data from your contact form. EmailJS validates all requests against your configured templates.

### Q: Is rate limiting enough without domain restrictions?
**A:** No. Client-side rate limiting can be bypassed. Domain restrictions in EmailJS dashboard are the primary security mechanism.

---

## Security Checklist

Use this checklist to ensure proper security configuration:

- [ ] Domain whitelist configured in EmailJS dashboard
- [ ] Added `jodajoda.github.io` to allowed domains
- [ ] Added `localhost` for local development testing
- [ ] `.env` file created in `website/` directory
- [ ] `.env` files excluded from version control (check `.gitignore`)
- [ ] Tested contact form works in local development
- [ ] Tested contact form works on production site
- [ ] Monitored EmailJS dashboard usage after deployment
- [ ] Email notifications enabled for quota thresholds (if available)
- [ ] Reviewed recent commits to ensure no credentials exposed

**Optional Advanced Security:**
- [ ] Private key enabled in EmailJS dashboard
- [ ] Serverless function implemented (Vercel/Netlify)
- [ ] CAPTCHA integration added
- [ ] Server-side validation implemented

---

## Incident Response

If you suspect your EmailJS account is being abused:

1. **Immediately revoke public key**:
   - EmailJS Dashboard → Account → Public Key
   - Click "Regenerate"

2. **Check usage logs**:
   - Dashboard → Usage
   - Review recent email sends

3. **Verify domain restrictions**:
   - Account → Security
   - Confirm whitelist is enabled and correct

4. **Update credentials**:
   - Update `.env` file with new public key
   - Commit and redeploy

5. **Consider upgrades**:
   - Enable private key
   - Implement serverless function
   - Add CAPTCHA

---

## Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Security FAQ](https://www.emailjs.com/docs/faq/is-it-okay-to-expose-my-public-key/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

---

## Contact

For security concerns or questions about this implementation, please open an issue in the repository.

**Last Updated:** 2025-10-10
