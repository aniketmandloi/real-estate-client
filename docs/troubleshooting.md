# Troubleshooting Guide

Common issues and their solutions for the Real Estate Lead Management System.

## Common Issues

### 1. Lead Form Submission Fails

**Symptoms:**

- Form submission error
- No confirmation message
- Network error in console

**Solutions:**

1. Check API route connectivity
2. Verify database connection
3. Validate form data format
4. Check n8n webhook URL
5. Review server logs

### 2. Email/SMS Notifications Not Sending

**Symptoms:**

- Lead submitted but no notifications
- Error in n8n workflow
- Status stuck at "received"

**Solutions:**

1. Verify SendGrid/Twilio credentials
2. Check n8n workflow status
3. Review webhook authentication
4. Check service rate limits
5. Monitor error logs

### 3. Dashboard Not Updating

**Symptoms:**

- Stale data
- Loading spinner persists
- Console errors

**Solutions:**

1. Check polling configuration
2. Verify API route responses
3. Clear browser cache
4. Check database queries
5. Review React Query setup

### 4. Database Connection Issues

**Symptoms:**

- Database errors
- Slow responses
- Connection timeouts

**Solutions:**

1. Verify connection strings
2. Check Supabase status
3. Review database logs
4. Check connection limits
5. Optimize queries

## Development Issues

### Environment Setup

**Problem:** Environment variables not loading

```bash
# Check if .env.local exists
ls -la .env.local

# Verify variable format
cat .env.local | grep -v '^#' | grep .
```

**Solution:**

1. Copy `.env.local.example` to `.env.local`
2. Fill in all required values
3. Restart development server

### Build Errors

**Problem:** Next.js build fails

```bash
# Clear next cache
rm -rf .next

# Fresh install of dependencies
npm ci

# Rebuild
npm run build
```

### TypeScript Errors

**Problem:** Type errors in development

```bash
# Generate Prisma types
npm run prisma:generate

# Check TypeScript
npx tsc --noEmit
```

## Production Issues

### Deployment Failures

**Checklist:**

1. All environment variables set in Vercel
2. Build command succeeding locally
3. Dependencies properly installed
4. TypeScript types generated
5. Database migrations applied

### Performance Issues

**Monitoring:**

1. Check Vercel analytics
2. Review database performance
3. Monitor API response times
4. Check external service latency
5. Review client-side performance

## External Service Issues

### n8n Integration

**Troubleshooting Steps:**

1. Check workflow activation
2. Verify webhook URLs
3. Review authentication
4. Check error handling
5. Monitor execution logs

### Email Service

**SendGrid Issues:**

1. Verify API key permissions
2. Check sender verification
3. Review email templates
4. Monitor delivery rates
5. Check spam scores

### SMS Service

**Twilio Issues:**

1. Verify account status
2. Check phone number validity
3. Review message logs
4. Monitor credit balance
5. Check rate limits

## Security Issues

### Authentication Failures

**Webhook Authentication:**

1. Check secret values match
2. Verify header format
3. Review request logs
4. Check SSL/TLS
5. Monitor failed attempts

### API Security

**Common Problems:**

1. CORS issues
2. Rate limiting
3. Invalid tokens
4. Unauthorized access
5. Data validation

## Getting Help

If issues persist:

1. Check documentation
2. Review error logs
3. Search GitHub issues
4. Contact support
5. Create bug report

## Reporting Bugs

When reporting issues, include:

1. Error messages
2. Steps to reproduce
3. Environment details
4. Relevant logs
5. Expected behavior
