# n8n Workflow Setup Guide

This guide explains how to set up the automated lead processing workflow in n8n for the Real Estate Lead Management system.

## Prerequisites

1. n8n instance (cloud or self-hosted)
2. SendGrid account for email notifications
3. Twilio account for SMS notifications
4. Access to your deployed application

## Setup Steps

### 1. Environment Variables

Configure the following environment variables in your n8n instance:

```env
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=your_verified_sender_email
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_number
WEBHOOK_SECRET=your_webhook_secret
WEBHOOK_CALLBACK_URL=https://your-app.com/api/webhook
```

### 2. Import Workflow

1. Go to your n8n dashboard
2. Click "Import Workflow"
3. Upload the `lead-automation.json` file
4. Click "Import"

### 3. Configure Nodes

#### Webhook Node

- Copy the generated webhook URL
- Set this URL as your `N8N_WEBHOOK_URL` in your application's environment variables
- Enable "Authentication" and set the header name to "Authorization"

#### SendGrid Node

- Connect your SendGrid account
- Verify the "From Email" is properly configured
- Test the email template

#### Twilio Node

- Connect your Twilio account
- Verify the "From Number" is properly configured
- Test the SMS template

#### Database Nodes

- Update the database connection credentials
- Test the connection

### 4. Activate the Workflow

1. Click "Save" to save all changes
2. Click "Activate" to enable the workflow
3. Test the complete flow by submitting a lead through your application

## Error Handling

The workflow includes error handling:

- Failed email/SMS attempts are logged
- Database updates include error states
- Webhook callbacks report status changes
- Each step has retry logic

## Testing

1. Submit a test lead through your application
2. Monitor the workflow execution
3. Check email and SMS delivery
4. Verify database status updates
5. Confirm webhook callbacks

## Troubleshooting

### Common Issues

1. **Webhook Authentication Fails**

   - Verify the `WEBHOOK_SECRET` matches in both n8n and your application
   - Check the Authorization header format

2. **Email Delivery Fails**

   - Verify SendGrid API key permissions
   - Check email template syntax
   - Confirm sender email is verified

3. **SMS Delivery Fails**

   - Verify Twilio credentials
   - Check phone number format
   - Confirm Twilio number is active

4. **Database Updates Fail**
   - Check database connection string
   - Verify table schema matches
   - Confirm update permissions

### Support

For additional support:

- Check n8n documentation: https://docs.n8n.io
- Review application logs
- Contact system administrator

## Maintenance

Regular maintenance tasks:

1. Monitor workflow execution logs
2. Update API keys periodically
3. Review and update message templates
4. Check for n8n updates
5. Monitor error rates and performance

## Security Considerations

1. Keep all API keys secure
2. Regularly rotate the webhook secret
3. Use environment variables for sensitive data
4. Monitor for unauthorized access attempts
5. Keep n8n and all nodes updated

## Customization

The workflow can be customized:

1. Modify email/SMS templates
2. Add additional notification channels
3. Implement custom error handling
4. Add data enrichment steps
5. Customize status update logic

## n8n Integration

This project includes automated lead processing using n8n workflows. For setup instructions:

1. See [n8n Setup Guide](docs/n8n-setup.md)
2. Configure required environment variables
3. Import the workflow from `n8n-workflow/lead-automation.json`
4. Follow testing procedures in the setup guide

Required external services:

- SendGrid for email notifications
- Twilio for SMS notifications
