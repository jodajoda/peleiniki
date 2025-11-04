# Setup EmailJS Integration

You are tasked with configuring EmailJS for the contact form functionality.

## Objective

Set up EmailJS service to enable the contact form to send emails to the client without requiring a backend server.

## What is EmailJS?

EmailJS is a service that allows sending emails directly from client-side JavaScript without a backend. Perfect for static sites deployed on GitHub Pages.

**Pricing:**
- Free tier: 200 emails/month
- Personal: $7/month (1,000 emails)
- Professional: $15/month (5,000 emails)

Most photography portfolios stay within the free tier.

## Prerequisites

Ask the client:
```
"To set up the contact form, I need:

1. The email address where you want to receive contact form submissions
2. Access to create an EmailJS account (free)
3. Your website domain (for security whitelist)

Do you already have an EmailJS account, or should we create one?"
```

## Setup Process

### Step 1: Create EmailJS Account

Guide the client:

```
"Let's create your EmailJS account:

1. Go to https://www.emailjs.com/
2. Click 'Sign Up' (top right)
3. Choose 'Sign up with Google' (easiest) or use email
4. Verify your email if required
5. You'll land on the dashboard

Created? Great! Let's continue..."
```

### Step 2: Add Email Service

```
"Now we'll connect your email:

1. In EmailJS dashboard, click 'Email Services' (left sidebar)
2. Click 'Add New Service'
3. Choose your email provider:
   - Gmail (most common)
   - Outlook/Hotmail
   - Yahoo Mail
   - Custom SMTP (advanced)
4. For Gmail:
   - Click 'Connect Account'
   - Sign in with your Google account
   - Allow EmailJS permissions
5. Click 'Create Service'
6. Copy the 'Service ID' (looks like 'service_xxxxxxx')

Got the Service ID? Save it, we'll need it in a moment."
```

**Service ID Example:** `service_abc1234`

### Step 3: Create Email Template

```
"Now let's create the email template:

1. Click 'Email Templates' (left sidebar)
2. Click 'Create New Template'
3. Template name: 'Contact Form Submission'
4. Edit the template:"
```

**Subject:**
```
New Contact Form Message from {{from_name}}
```

**Content:**
```
You received a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone_number}}

Message:
{{message}}

---
This message was sent from your website contact form.
```

**Template settings:**
- From Name: `{{from_name}}` (visitor's name)
- From Email: Use your email (prevents spam filter issues)
- Reply To: `{{from_email}}` (visitor's email - allows easy reply)
- To Email: Your email (where you want to receive messages)

```
"5. Click 'Save'
6. Copy the 'Template ID' (looks like 'template_xxxxxxx')

Got it? Save this ID too."
```

**Template ID Example:** `template_xyz9876`

### Step 4: Get Public Key

```
"One more ID to copy:

1. Click 'Account' (top right)
2. Click 'General' tab
3. Find 'Public Key' (looks like a long random string)
4. Copy the entire key

This is the last credential we need!"
```

**Public Key Example:** `xYz123AbC456DeF789`

### Step 5: Configure Environment Variables

Now configure the local development environment.

File: `website/.env`

Create this file (if it doesn't exist):

```bash
cd website
cp .env.example .env
```

Edit `.env` with the credentials:

```env
VITE_EMAILJS_SERVICE_ID=service_abc1234
VITE_EMAILJS_TEMPLATE_ID=template_xyz9876
VITE_EMAILJS_PUBLIC_KEY=xYz123AbC456DeF789
```

**Important:** This file is gitignored (never committed to repository).

### Step 6: Configure GitHub Secrets (for deployment)

For the live site to work, add secrets to GitHub:

```
"Let's add these credentials to GitHub (keeps them secure):

1. Go to your GitHub repository
2. Click 'Settings' tab
3. Click 'Secrets and variables' → 'Actions'
4. Click 'New repository secret'
5. Add three secrets:

   Name: EMAILJS_SERVICE_ID
   Value: [paste Service ID]

   Name: EMAILJS_TEMPLATE_ID
   Value: [paste Template ID]

   Name: EMAILJS_PUBLIC_KEY
   Value: [paste Public Key]

These are now securely stored and will be used during deployment."
```

### Step 7: Configure Domain Whitelist (Security)

**CRITICAL SECURITY STEP:**

```
"For security, we need to whitelist your website domain:

1. In EmailJS dashboard, click 'Account' → 'General'
2. Scroll to 'Restricted Access'
3. Toggle ON 'Restricted Access'
4. Add your domains:
   - For testing: localhost:5173
   - For production: yourdomain.com (or username.github.io)
5. Click 'Save'

This prevents others from using your EmailJS account to send spam."
```

**Example whitelist entries:**
- `localhost`
- `peleiniki.com`
- `username.github.io`

### Step 8: Test the Contact Form

#### Local Testing

```bash
cd website
npm run dev
```

```
"Let's test the contact form:

1. Open http://localhost:5173
2. Navigate to the Contact page
3. Fill out the form with test data
4. Click 'Send Message'
5. You should see a success message
6. Check your email inbox for the test message

Did you receive the email? Great! The contact form is working."
```

If no email received, troubleshoot:
- Check EmailJS dashboard for sent emails (Logs section)
- Verify spam/junk folder
- Check browser console for errors
- Verify all credentials are correct

#### Production Testing

After deployment:

```
"Test the live site:

1. Visit your live website
2. Submit a test message through the contact form
3. Verify email receipt

If it doesn't work:
- Check GitHub Secrets are correctly named
- Verify domain is whitelisted in EmailJS
- Check deployment logs for errors"
```

## Verification Checklist

Before marking EmailJS setup as complete:

- [ ] EmailJS account created
- [ ] Email service connected (Gmail, Outlook, etc.)
- [ ] Email template created and customized
- [ ] Template includes: from_name, from_email, phone_number, message
- [ ] All three credentials copied (Service ID, Template ID, Public Key)
- [ ] `.env` file created locally with credentials
- [ ] GitHub Secrets added (for deployment)
- [ ] Domain whitelist configured
- [ ] Test email sent successfully from localhost
- [ ] Test email received in inbox
- [ ] (After deployment) Test email sent from live site

## Contact Form Code Reference

The contact form is already implemented in: `website/src/pages/Contact.jsx`

Key features:
- EmailJS integration using credentials from environment variables
- Form validation (name, email, message required)
- Rate limiting (30-second cooldown between submissions)
- Loading states and error handling
- Success/error messages

**No code changes needed** - just configure the credentials!

## Template Customization

You can customize the email template further:

### Add Logo
In EmailJS template editor, add HTML:
```html
<img src="https://yourdomain.com/assets/logo/logo.png" alt="Logo" style="width: 150px;">
```

### Styling
Use inline CSS for email compatibility:
```html
<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
  <h2 style="color: #333;">New Contact Form Message</h2>
  <!-- ... rest of template -->
</div>
```

### Auto-Reply (Optional)

Create a second template for auto-replies to visitors:

**Template name:** "Contact Form Auto-Reply"

**Content:**
```
Hi {{from_name}},

Thank you for contacting me! I received your message and will get back to you within 24-48 hours.

In the meantime, feel free to browse my portfolio or follow me on social media:
- Instagram: @yourhandle
- Facebook: /yourpage

Best regards,
[Your Name]
[Your Business Name]
```

Then update `Contact.jsx` to send two emails:
1. To you (main template)
2. To visitor (auto-reply template)

## Troubleshooting

### Issue: "Failed to send message"

**Possible causes:**
1. Incorrect credentials
2. Domain not whitelisted
3. EmailJS service not connected
4. Network error

**Solution:**
```bash
# Check environment variables are loaded
cd website
npm run dev
# Open browser console, look for errors
```

Verify:
- `.env` file exists in `website/` directory
- Variable names start with `VITE_`
- No spaces around `=` in `.env` file
- EmailJS dashboard shows service is active

### Issue: Email goes to spam

**Solution:**
- Use a professional "From" address (not Gmail)
- Set up SPF/DKIM records (advanced)
- Ask client to whitelist the sender email
- Avoid spam trigger words in template

### Issue: Rate limiting too strict

Current rate limit: 30 seconds between submissions

To adjust, edit `website/src/pages/Contact.jsx`:

```jsx
// Find this constant
const RATE_LIMIT_MS = 30000; // 30 seconds

// Change to desired value (in milliseconds)
const RATE_LIMIT_MS = 60000; // 60 seconds
```

### Issue: Missing form fields

Default form fields:
- `from_name` - Visitor's name
- `from_email` - Visitor's email
- `phone_number` - Visitor's phone
- `message` - Message text

To add fields:
1. Add input in `Contact.jsx`
2. Add to `formData` state
3. Add to EmailJS template with `{{field_name}}`

## Security Best Practices

Remind the client:

```
"Important security reminders:

1. ✅ Never share your EmailJS credentials publicly
2. ✅ Never commit .env files to Git (already gitignored)
3. ✅ Always use domain whitelist in EmailJS
4. ✅ Use GitHub Secrets for production credentials
5. ✅ Regularly check EmailJS logs for suspicious activity
6. ✅ Consider CAPTCHA if spam becomes an issue

Your setup is secure! The domain whitelist prevents abuse."
```

## Monitoring & Maintenance

### Check Email Logs

```
"To monitor contact form submissions:

1. Login to EmailJS dashboard
2. Click 'Email History' (left sidebar)
3. View sent emails, success rate, errors

Check this monthly to ensure everything works."
```

### Monitor Usage

```
"Check your usage to stay within free tier:

1. Dashboard → Account → Usage
2. Shows emails sent this month
3. Free tier: 200/month
4. Upgrade if you exceed regularly"
```

### Update Credentials

If credentials need to change:

**Local:**
1. Update `website/.env`
2. Restart dev server

**Production:**
1. Update GitHub Secrets
2. Trigger new deployment (push to main)

## Alternative: Custom Backend

If client needs more control or features:

**Alternatives to EmailJS:**
- Formspree (similar to EmailJS)
- Netlify Forms (if hosted on Netlify)
- Custom backend (Node.js + Nodemailer)
- SendGrid API
- Mailgun API

EmailJS is recommended for its simplicity and no-backend requirement.

## Success Confirmation

Once EmailJS is working:

```
"Perfect! Your contact form is now live and working! 🎉

Summary:
✅ EmailJS account created
✅ Email service connected
✅ Template customized
✅ Credentials configured (local & GitHub)
✅ Domain whitelisted
✅ Test email sent and received

Your clients can now reach you through your website!

Tips:
- Check your email regularly for new messages
- Add the sender to your contacts to avoid spam folder
- Consider setting up email forwarding if you want messages in multiple places
- Monitor EmailJS usage to stay within your plan limits

Need any changes to the form or email template? Just let me know!"
```

## EmailJS Dashboard Quick Reference

**Important sections:**
- **Email Services** - Connect/manage email accounts
- **Email Templates** - Create/edit message templates
- **Email History** - View sent emails and logs
- **Account → General** - Get Public Key, configure domain whitelist
- **Account → Usage** - Monitor monthly email quota

## Resources

Share with client:
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Templates Guide](https://www.emailjs.com/docs/user-guide/creating-templates/)
- [Domain Whitelist Setup](https://www.emailjs.com/docs/user-guide/security/)
- [Troubleshooting Guide](https://www.emailjs.com/docs/troubleshooting/)
