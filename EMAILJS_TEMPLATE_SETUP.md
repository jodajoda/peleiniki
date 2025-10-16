# EmailJS Template Setup Guide

This guide shows you how to create an email template in EmailJS for the Pelei Niki Photography Portfolio contact form.

---

## 📧 Template Overview

The contact form sends these parameters to EmailJS:

| Parameter | Description | Example |
|-----------|-------------|---------|
| `{{from_name}}` | Visitor's name | `"Kovács Anna"` |
| `{{from_email}}` | Visitor's email address | `"anna.kovacs@example.com"` |
| `{{phone}}` | Visitor's phone number (optional) | `"+36 30 123 4567"` |
| `{{message}}` | Visitor's message | `"Szeretnék időpontot foglalni..."` |

---

## 🚀 Step-by-Step Setup

### Step 1: Log in to EmailJS

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Log in with your account

---

### Step 2: Create Email Service (if not already done)

1. Click **Email Services** in the left sidebar
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Click **Create Service**
6. **Copy the Service ID** (e.g., `service_lxc4g8l`) - you'll need this

---

### Step 3: Create Email Template

1. Click **Email Templates** in the left sidebar
2. Click **Create New Template**
3. You'll see the template editor

---

### Step 4: Configure Template Settings

**Template Name:**
```
Pelei Niki Portfolio - Contact Form
```

**Template ID:** (auto-generated, e.g., `template_n3otimx`)
- **Copy this ID** - you'll need it for configuration

---

### Step 5: Set Email Subject

In the **Subject** field, enter:

```
Új üzenet a Pelei Niki Photography oldalról - {{from_name}}
```

**Translation:** "New message from Pelei Niki Photography - [Visitor Name]"

---

### Step 6: Create Email Body

#### **Option 1: Hungarian Template (Recommended)**

Copy and paste this into the **Content** field:

```html
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Új üzenet</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #f5f3f0 0%, #e8e3dc 100%); padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">

        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #6d5d4b; margin: 0; font-size: 24px;">
                📸 Pelei Niki Photography
            </h1>
            <p style="color: #8a7968; margin: 5px 0 0 0; font-size: 14px;">
                Új üzenet érkezett a weboldalról
            </p>
        </div>

        <!-- Contact Information -->
        <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #6d5d4b; margin-top: 0; font-size: 18px; border-bottom: 2px solid #f0ebe4; padding-bottom: 10px;">
                Kapcsolattartó adatai
            </h2>

            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #6d5d4b; width: 100px;">
                        👤 Név:
                    </td>
                    <td style="padding: 8px 0; color: #333;">
                        {{from_name}}
                    </td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #6d5d4b;">
                        📧 Email:
                    </td>
                    <td style="padding: 8px 0;">
                        <a href="mailto:{{from_email}}" style="color: #8a7968; text-decoration: none;">
                            {{from_email}}
                        </a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #6d5d4b;">
                        📱 Telefon:
                    </td>
                    <td style="padding: 8px 0; color: #333;">
                        {{phone}}
                    </td>
                </tr>
            </table>
        </div>

        <!-- Message Content -->
        <div style="background: white; padding: 25px; border-radius: 8px;">
            <h2 style="color: #6d5d4b; margin-top: 0; font-size: 18px; border-bottom: 2px solid #f0ebe4; padding-bottom: 10px;">
                💬 Üzenet
            </h2>
            <div style="color: #333; white-space: pre-wrap; line-height: 1.8;">
{{message}}
            </div>
        </div>

        <!-- Quick Reply Button -->
        <div style="text-align: center; margin-top: 25px;">
            <a href="mailto:{{from_email}}?subject=Re: Pelei Niki Photography megkeresés"
               style="display: inline-block; background: linear-gradient(135deg, #8a7968 0%, #6d5d4b 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                ✉️ Válasz küldése
            </a>
        </div>

        <!-- Footer -->
        <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #999; font-size: 12px; margin: 5px 0;">
                Ez az üzenet a Pelei Niki Photography weboldalról érkezett
            </p>
            <p style="color: #999; font-size: 12px; margin: 5px 0;">
                <a href="https://peleiniki.com/" style="color: #8a7968; text-decoration: none;">
                    peleiniki.com
                </a>
            </p>
        </div>
    </div>
</body>
</html>
```

---

#### **Option 2: Simple Text Template**

If you prefer plain text, use this in the **Content** field:

```
Új üzenet érkezett a Pelei Niki Photography weboldalról!

----------------------------------------
KAPCSOLATTARTÓ ADATAI
----------------------------------------

Név:     {{from_name}}
Email:   {{from_email}}
Telefon: {{phone}}

----------------------------------------
ÜZENET
----------------------------------------

{{message}}

----------------------------------------

Válasz küldéséhez kattints ide:
mailto:{{from_email}}

---
Ez az üzenet a Pelei Niki Photography weboldalról érkezett.
https://peleiniki.com
```

---

### Step 7: Configure "To Email" Address

In the **To Email** field, enter the email address where you want to receive contact form submissions:

```
peleinikifotoi@gmail.com
```

**OR** use a variable to send to yourself:
```
{{to_email}}
```

(Then you'd need to add `to_email` parameter in Contact.jsx)

---

### Step 8: Configure "From" Fields

**From Name:**
```
{{from_name}} (via Pelei Niki Photography)
```

**From Email:**
- Use your verified email address (e.g., `peleinikifotoi@gmail.com`)
- **Do NOT use** `{{from_email}}` here (most email providers reject this)

**Reply-To:**
```
{{from_email}}
```
This allows you to click "Reply" and respond directly to the visitor.

---

### Step 9: Test the Template

1. Click **Test Email** button in EmailJS
2. Fill in test values:
   ```
   from_name: Test User
   from_email: test@example.com
   phone: +36 30 123 4567
   message: This is a test message from the contact form.
   ```
3. Click **Send Test**
4. Check your inbox for the test email
5. Verify formatting looks correct

---

### Step 10: Save the Template

1. Click **Save** button
2. The template is now active and ready to use!

---

## 🔧 Update Your Configuration Files

After creating the template, update your credentials:

### Local Development (`website/.env`):

```env
VITE_EMAILJS_SERVICE_ID=service_lxc4g8l
VITE_EMAILJS_TEMPLATE_ID=template_n3otimx
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### GitHub Secrets:

Update these three secrets in GitHub repository settings:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

See [GITHUB_SECRETS_SETUP.md](GITHUB_SECRETS_SETUP.md) for instructions.

---

## 📊 Template Variables Reference

These variables are sent from [Contact.jsx](website/src/pages/Contact.jsx#L71-L76):

```javascript
const emailParams = {
  from_name: formData.name,      // → {{from_name}}
  from_email: formData.email,    // → {{from_email}}
  phone: formData.phone,         // → {{phone}}
  message: formData.message,     // → {{message}}
};
```

**Usage in template:**
- `{{from_name}}` - Visitor's name
- `{{from_email}}` - Visitor's email
- `{{phone}}` - Visitor's phone (may be empty)
- `{{message}}` - Visitor's message

---

## 🎨 Customization Ideas

### Add More Fields

If you want to add more fields to the contact form:

1. **Update Contact.jsx:**
   ```javascript
   const emailParams = {
     from_name: formData.name,
     from_email: formData.email,
     phone: formData.phone,
     message: formData.message,
     photoshoot_type: formData.photoshootType,  // NEW
   };
   ```

2. **Update EmailJS Template:**
   ```html
   <tr>
       <td style="padding: 8px 0; font-weight: bold;">Fotózás típusa:</td>
       <td style="padding: 8px 0;">{{photoshoot_type}}</td>
   </tr>
   ```

### Style Customization

The HTML template uses your brand colors from Tailwind config:
- Primary: `#6d5d4b` (primary-700)
- Background: `#f5f3f0` (primary-50)
- Accent: `#8a7968` (primary-600)

Feel free to adjust colors to match your branding!

---

## ✅ Testing Checklist

After setting up the template:

- [ ] Template created in EmailJS dashboard
- [ ] Subject line includes visitor name
- [ ] All 4 variables display correctly (name, email, phone, message)
- [ ] "To Email" is your correct email address
- [ ] "Reply-To" is set to `{{from_email}}`
- [ ] Test email sent and received successfully
- [ ] Test email formatting looks good
- [ ] Reply button works (opens email client with correct recipient)
- [ ] Template ID copied to `.env` and GitHub Secrets
- [ ] Contact form tested on local dev server
- [ ] Contact form tested on live deployed site

---

## 🆘 Troubleshooting

### Template not receiving emails

**Check:**
1. Service ID, Template ID, and Public Key are correct
2. "To Email" field has your email address
3. EmailJS dashboard shows the request in **Logs**
4. Check spam folder
5. Verify domain whitelist includes your domain

### Variables showing as {{from_name}} instead of actual values

**Fix:**
1. Ensure variable names match exactly (case-sensitive)
2. Check Contact.jsx is sending correct parameter names
3. View browser console logs to verify parameters

### Emails going to spam

**Fix:**
1. Use a verified email address in "From Email"
2. Don't use `{{from_email}}` in "From Email" field
3. Set up SPF/DKIM records (EmailJS handles this for verified services)
4. Use "Reply-To" field for visitor's email instead

### HTML not rendering (showing raw HTML)

**Fix:**
1. In EmailJS template editor, click the **</>** icon to toggle HTML mode
2. Ensure "Content Type" is set to **HTML** (not plain text)

---

## 📚 Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Template Parameters](https://www.emailjs.com/docs/user-guide/template-parameters/)
- [Contact Form Code](website/src/pages/Contact.jsx)

---

## 📧 Template Preview

Here's what your email will look like:

```
Subject: Új üzenet a Pelei Niki Photography oldalról - Kovács Anna

┌─────────────────────────────────────────┐
│     📸 Pelei Niki Photography          │
│   Új üzenet érkezett a weboldalról     │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Kapcsolattartó adatai                   │
├─────────────────────────────────────────┤
│ 👤 Név:     Kovács Anna                │
│ 📧 Email:   anna.kovacs@example.com    │
│ 📱 Telefon: +36 30 123 4567            │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ 💬 Üzenet                               │
├─────────────────────────────────────────┤
│ Szeretnék időpontot foglalni egy       │
│ családi fotózásra. Mikor lennél        │
│ elérhető?                              │
└─────────────────────────────────────────┘

        [ ✉️ Válasz küldése ]

────────────────────────────────────────────
Ez az üzenet a Pelei Niki Photography
weboldalról érkezett
peleiniki.com
```

---

**Last Updated:** 2025-10-10
