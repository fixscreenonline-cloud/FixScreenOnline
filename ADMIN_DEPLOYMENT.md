# Admin Panel Deployment Guide

This guide covers deploying the secure admin management system for FixScreenOnline.

## Prerequisites

- Node.js 20+
- MongoDB (Atlas or self-hosted)

## Environment Variables

Add these to `.env.local` (development) and your hosting provider (production):

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `AUTH_SECRET` | Yes | Random 32+ byte secret for Auth.js |
| `ADMIN_SEED_EMAIL` | Seed only | Initial admin email |
| `ADMIN_SEED_PASSWORD` | Seed only | Initial admin password (min 8 chars) |

Generate `AUTH_SECRET`:

```bash
openssl rand -base64 32
```

## Local Setup

1. Install dependencies: `npm install`
2. Set `DATABASE_URL` in `.env.local`
3. Run migrations: `npm run db:migrate` (or `npm run db:push`)
4. Seed admin: `npm run db:seed`
5. Start dev server: `npm run dev`
6. Open [http://localhost:3001/admin/login](http://localhost:3001/admin/login)

## Production (Vercel)

1. Add environment variables in Vercel project settings
2. Run production migrations:

```bash
DATABASE_URL="your-production-url" npx prisma migrate deploy
DATABASE_URL="your-production-url" npm run db:seed
```

3. Deploy

## Security Features

- bcrypt password hashing (12 rounds)
- Mandatory TOTP 2FA with recovery codes
- 3 failed login attempts → 15 minute lockout with countdown
- Failed login logging (IP, timestamp, user agent)
- 30-minute session inactivity timeout
- HTTP-only session cookies
- CSRF protection on mutating admin API routes
- Rate limiting on login endpoints
- Audit logs for all admin actions

## Admin Routes

| Route | Description |
|-------|-------------|
| `/admin/login` | Email + password |
| `/admin/login/2fa` | TOTP / recovery code |
| `/admin/setup-2fa` | First-login 2FA wizard |
| `/admin` | Dashboard |
| `/admin/bookings` | Customer bookings CRUD |

## Post-Deployment Checklist

- Change default admin password (see below)
- Save 2FA recovery codes offline
- Set strong `AUTH_SECRET` in production
- Enable database backups

## Change Admin Password

### Option A — While logged in (recommended)

1. Sign in at `/admin/login`
2. Open **Settings** in the sidebar
3. Enter your current password and a new password (min 8 characters)

### Option B — From the command line

If you forgot your password or cannot sign in:

1. Set the new password in `.env.local`:
   ```env
   ADMIN_SEED_EMAIL=fixscreenonline@gmail.com
   ADMIN_SEED_PASSWORD=YourNewSecurePassword123!
   ```
2. Run:
   ```bash
   npm run admin:change-password
   ```
3. Sign in with the new password

This updates the password in MongoDB and clears any login lockout.
