# Email Configuration Setup

Your enquiry form is now set up! To complete the email functionality, follow these steps:

## Quick Setup (Using Resend - Recommended)

1. **Create a Resend Account**
   - Go to [resend.com](https://resend.com)
   - Sign up for a free account (100 emails/day free tier)

2. **Get Your API Key**
   - Go to [API Keys page](https://resend.com/api-keys)
   - Click "Create API Key"
   - Copy the key (it starts with `re_`)

3. **Create .env.local File**
   - Copy `.env.local.example` to `.env.local` in your project root
   - Or create a new file named `.env.local` with:
   ```env
   RESEND_API_KEY=re_your_actual_api_key_here
   ADMIN_EMAIL=your-email@example.com
   ```

4. **Update Your Email**
   - Replace `your-email@example.com` with your actual email address
   - This is where you'll receive repair requests

5. **Restart Development Server**
   ```bash
   npm run dev
   ```

## Testing the Form

1. Click "Book Repair Now" button on your website
2. Fill out the form with test data
3. Click "Submit Request"
4. You should receive an email at your ADMIN_EMAIL address

## Important Notes

- **Domain Verification (Production)**: For production, you need to verify your domain in Resend
  - Until then, emails will come from `onboarding@resend.dev`
  - Update the `from` field in `app/api/send-enquiry/route.ts` once verified

- **Free Tier Limits**: Resend free tier includes 100 emails/day and 3,000/month
  - Perfect for small to medium businesses
  - Upgrade if you need more

- **Security**: Never commit `.env.local` to git (it's already in .gitignore)

## Alternative Email Services

### Using SendGrid

1. Install SendGrid:
   ```bash
   npm install @sendgrid/mail
   ```

2. Update `.env.local`:
   ```env
   SENDGRID_API_KEY=your_sendgrid_api_key
   ADMIN_EMAIL=your-email@example.com
   ```

3. Modify `app/api/send-enquiry/route.ts` to use SendGrid instead of Resend

### Using Nodemailer (Gmail/SMTP)

1. Install Nodemailer:
   ```bash
   npm install nodemailer
   ```

2. Update `.env.local` with SMTP credentials
3. Modify the API route accordingly

## Troubleshooting

- **"Email service not configured" error**: Make sure RESEND_API_KEY is set in .env.local
- **"Failed to send email" error**: Check your API key is valid and not expired
- **Email not received**: Check spam folder, verify ADMIN_EMAIL is correct
- **Changes not reflecting**: Restart the development server after changing .env.local

## What Happens When Form is Submitted?

1. User fills out the form and clicks "Submit Request"
2. Form data is sent to `/api/send-enquiry` endpoint
3. API validates the data
4. Email is sent to your ADMIN_EMAIL using Resend
5. Success message is shown to the user
6. Form resets and modal closes after 3 seconds

## Email Template

You'll receive emails with:
- Customer name
- Email address
- Phone number
- Device type
- Issue description

All nicely formatted in HTML!
