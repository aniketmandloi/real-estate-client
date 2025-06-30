# Deployment Guide

This guide explains how to deploy the Real Estate Lead Management System to production using Vercel.

## Prerequisites

1. A Vercel account
2. A GitHub account
3. All external services configured (Supabase, SendGrid, Twilio, n8n)
4. Environment variables ready

## Deployment Steps

### 1. Prepare for Deployment

1. Ensure your code is committed to GitHub
2. Run build locally to check for issues:
   ```bash
   npm run build
   ```
3. Verify all environment variables are set
4. Check all external service connections

### 2. Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure project settings:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Install Command: `npm ci`
   - Output Directory: .next

### 3. Configure Environment Variables

1. In Vercel project settings, add all environment variables:
   - Database connection strings
   - n8n webhook URL and secret
   - SendGrid credentials
   - Twilio credentials
2. Update `NEXT_PUBLIC_APP_URL` to your production domain

### 4. Deploy and Monitor

1. Trigger deployment in Vercel dashboard
2. Monitor build logs for any issues
3. Check deployment status
4. Verify the application is working:
   - Test lead form submission
   - Check dashboard access
   - Verify email/SMS notifications
   - Monitor n8n workflow execution

## Production Checklist

- [ ] Database properly configured
- [ ] n8n workflow activated
- [ ] Email service verified
- [ ] SMS service verified
- [ ] Environment variables set
- [ ] SSL certificate active
- [ ] Domain configured
- [ ] Monitoring set up

## Monitoring and Maintenance

1. Set up monitoring:

   - Vercel Analytics
   - Error tracking
   - Performance monitoring
   - Database monitoring

2. Regular maintenance:
   - Check error logs
   - Monitor API usage
   - Update dependencies
   - Backup database
   - Rotate API keys

## Troubleshooting Production Issues

1. Check Vercel deployment logs
2. Monitor n8n workflow execution
3. Verify external service status
4. Check database connections
5. Review error tracking

## Scaling Considerations

1. Database scaling:

   - Monitor connection limits
   - Optimize queries
   - Consider connection pooling

2. API rate limits:

   - SendGrid limits
   - Twilio pricing
   - n8n execution limits

3. Application scaling:
   - Edge caching
   - API route optimization
   - Database indexing

## Backup and Recovery

1. Database backups:

   - Automated Supabase backups
   - Regular exports
   - Backup verification

2. Configuration backups:
   - Environment variables
   - n8n workflows
   - API configurations

## Security Best Practices

1. Enable security features:

   - HTTP security headers
   - CORS policies
   - Rate limiting
   - DDoS protection

2. Regular security tasks:
   - Rotate API keys
   - Update dependencies
   - Security scanning
   - Access review

## Support and Maintenance

For ongoing support and maintenance:

1. Monitor system health
2. Keep dependencies updated
3. Review and optimize performance
4. Handle security updates
5. Maintain documentation

## Rollback Procedures

If deployment issues occur:

1. Use Vercel's instant rollback
2. Restore database if needed
3. Revert n8n workflow changes
4. Update DNS if required
5. Communicate status
