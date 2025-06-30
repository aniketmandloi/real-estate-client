# Real Estate Lead Management System

A complete lead capture and follow-up automation system built with Next.js, Supabase, and n8n integration. The system captures property viewing requests through a web form, automatically processes them through an n8n workflow, sends confirmations via email and SMS, and provides a real-time dashboard for lead tracking.

## Features

- 📝 Lead capture form with validation
- 📊 Real-time dashboard with lead statistics
- 📧 Automated email and SMS notifications
- 🔄 n8n workflow automation
- 📱 Mobile-responsive design
- ⚡ Real-time updates with polling
- 🎨 Professional real estate styling

## Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Form Handling**: React Hook Form, Zod
- **Automation**: n8n
- **Notifications**: SendGrid (email), Twilio (SMS)
- **Deployment**: Vercel

## Quick Start

1. Clone the repository:

   ```bash
   git clone https://github.com/aniketmandloi/real-estate-client.git
   cd real-estate-client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.local.example .env.local
   cp .env.local.example .env
   ```

   Fill in the required environment variables (see Environment Setup section).

4. Set up the database:

   ```bash
   npm run prisma:generate
   npm run db:push
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Documentation

- [Environment Setup](docs/environment-setup.md)
- [Deployment Guide](docs/deployment.md)
- [n8n Setup Guide](docs/n8n-setup.md)
- [Troubleshooting](docs/troubleshooting.md)
