# Environment Setup Guide

This guide explains how to set up all required environment variables and external services for the Real Estate Lead Management System.

## Required Environment Variables

Create a `.env.local` also `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@host:port/database"
DIRECT_URL="postgresql://username:password@host:port/database"

# n8n Integration
N8N_WEBHOOK_URL="https://your-n8n-instance.com/webhook/..."
WEBHOOK_SECRET="your-secure-webhook-secret"

# Email Service (SendGrid)
SENDGRID_API_KEY="your-sendgrid-api-key"
SENDGRID_FROM_EMAIL="your-verified-sender@example.com"

# SMS Service (Twilio)
TWILIO_ACCOUNT_SID="your-twilio-account-sid"
TWILIO_AUTH_TOKEN="your-twilio-auth-token"
TWILIO_PHONE_NUMBER="your-twilio-phone-number"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Service Setup Instructions

### 1. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Get your database connection strings from Project Settings > Database
3. Set `DATABASE_URL` and `DIRECT_URL` in your `.env.local`
4. Run database migrations:
   ```bash
   npm run prisma:generate
   npm run db:push
   ```

### 2. SendGrid Setup

1. Create a SendGrid account at [sendgrid.com](https://sendgrid.com)
2. Create an API key with email sending permissions
3. Verify your sender email address
4. Set `SENDGRID_API_KEY` and `SENDGRID_FROM_EMAIL` in your `.env.local`

### 3. Twilio Setup

1. Create a Twilio account at [twilio.com](https://twilio.com)
2. Get your Account SID and Auth Token from the dashboard
3. Purchase or use an existing Twilio phone number
4. Set the Twilio environment variables in your `.env.local`

### 4. n8n Setup

1. Set up an n8n instance (cloud or self-hosted)
2. Import the workflow from `n8n-workflow/lead-automation.json`
3. Configure the workflow as per [n8n Setup Guide](n8n-setup.md)
4. Set `N8N_WEBHOOK_URL` and `WEBHOOK_SECRET` in your `.env.local`

## Vercel Deployment Variables

When deploying to Vercel, add all environment variables in the Vercel project settings:

1. Go to your project settings in Vercel
2. Navigate to the Environment Variables section
3. Add all variables from your `.env.local`
4. Update `NEXT_PUBLIC_APP_URL` to your production URL

## Security Considerations

1. Never commit `.env.local` to version control
2. Use strong, unique values for `WEBHOOK_SECRET`
3. Rotate API keys periodically
4. Use environment-specific variables for different deployments
5. Keep all credentials secure and never share them

## Troubleshooting

If you encounter issues with environment variables:

1. Verify all variables are properly set
2. Check for typos in variable names
3. Ensure values are properly formatted
4. Restart the development server after changes
5. See [Troubleshooting Guide](troubleshooting.md) for more help
