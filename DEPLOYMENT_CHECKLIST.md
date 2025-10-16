# 🚀 Deployment Checklist for Pelei Niki Photography Portfolio

Complete these steps to ensure your contact form works on the live website.

---

## ✅ Completed (Already Done)

- [x] Environment variables setup in `website/.env`
- [x] GitHub Actions workflow configured to use secrets
- [x] Rate limiting implemented in contact form
- [x] `.env` files excluded from git via `.gitignore`
- [x] Documentation created (SECURITY.md, GITHUB_SECRETS_SETUP.md)

---

## 🔴 REQUIRED: Complete These Steps

### 0. Create EmailJS Template (FIRST)

**You need to create an email template in EmailJS before the contact form will work!**

Follow the guide: [EMAILJS_TEMPLATE_SETUP.md](EMAILJS_TEMPLATE_SETUP.md)

**Quick Steps:**
1. Go to: https://dashboard.emailjs.com/
2. Create an **Email Service** (if you haven't already)
3. Create an **Email Template** using the HTML template provided
4. Copy the **Service ID**, **Template ID**, and **Public Key**

**Status:** ⚠️ **PENDING - You must do this first**

---

### 1. Configure GitHub Secrets (CRITICAL)

**Without this, the contact form will NOT work on the deployed site!**

Follow the guide: [GITHUB_SECRETS_SETUP.md](GITHUB_SECRETS_SETUP.md)

**Quick Steps:**
1. Go to: https://github.com/[YOUR-USERNAME]/peleiniki/settings/secrets/actions
2. Click **New repository secret** (3 times)
3. Add these three secrets:

| Secret Name | Where to Find Value |
|-------------|---------------------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS Dashboard → Email Services |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS Dashboard → Email Templates |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS Dashboard → Account → General |

**Status:** ⚠️ **PENDING - You must do this**

---

### 2. Configure EmailJS Domain Whitelist (CRITICAL)

**Without this, anyone can abuse your email quota!**

**Steps:**
1. Go to: https://dashboard.emailjs.com/
2. Navigate to **Account** → **Security**
3. Enable **"Allow only from specific domains"**
4. Add these domains:
   ```
   peleiniki.com
   localhost
   ```
5. Click **Save**

**Status:** ⚠️ **PENDING - You must do this**

---

### 3. Deploy and Test

After completing steps 1 and 2:

**Deploy:**
```bash
git add .
git commit -m "feat: configure EmailJS with environment variables and security"
git push origin main
```

**Test:**
1. Wait for GitHub Actions to complete (check **Actions** tab)
2. Visit: https://peleiniki.com/contact
3. Fill out and submit the contact form
4. Verify email arrives at your inbox

**Status:** ⚠️ **PENDING - Do after steps 1 & 2**

---

## 📊 Setup Status

| Step | Status | Action Required |
|------|--------|-----------------|
| EmailJS Template | ⚠️ **Not Set** | **Create in EmailJS** |
| Environment Variables | ✅ Configured | None |
| GitHub Secrets | ⚠️ **Not Set** | **Set up in GitHub** |
| Domain Whitelist | ⚠️ **Not Set** | **Configure in EmailJS** |
| Rate Limiting | ✅ Implemented | None |
| Git Protection | ✅ Configured | None |

---

## 🎯 Current Values

Your EmailJS credentials (from `website/.env`):

```
Service ID:  service_lxc4g8l
Template ID: template_n3otimx
Public Key:  00skKQszSH1adZxe3
```

**Use these exact values when setting up GitHub Secrets.**

---

## 📚 Documentation Reference

- **EmailJS Template Setup:** [EMAILJS_TEMPLATE_SETUP.md](EMAILJS_TEMPLATE_SETUP.md)
- **GitHub Secrets Setup:** [GITHUB_SECRETS_SETUP.md](GITHUB_SECRETS_SETUP.md)
- **Security Guide:** [SECURITY.md](SECURITY.md)
- **Development Guide:** [CLAUDE.md](CLAUDE.md)

---

## ⚡ Quick Links

- **GitHub Secrets Setup:** https://github.com/[YOUR-USERNAME]/peleiniki/settings/secrets/actions
- **EmailJS Dashboard:** https://dashboard.emailjs.com/
- **Live Site:** https://peleiniki.com
- **GitHub Actions:** https://github.com/[YOUR-USERNAME]/peleiniki/actions

---

## 🆘 Need Help?

If something doesn't work:

1. Check [GITHUB_SECRETS_SETUP.md](GITHUB_SECRETS_SETUP.md) troubleshooting section
2. Review [SECURITY.md](SECURITY.md) FAQ
3. Check GitHub Actions logs for errors
4. Verify EmailJS dashboard for usage/errors

---

**Last Updated:** 2025-10-10
