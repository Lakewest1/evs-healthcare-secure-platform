# Environment Setup Guide

This document describes how to configure the local development and production environments for the EVS Healthcare Solutions platform.

Sensitive credentials are managed using environment variables and must **never** be committed to the repository.

---

# Overview

The application uses:

- React 19
- Vite
- Netlify Functions
- Cloudflare
- Cloudinary
- EmailJS

Environment variables are required for:

- Email delivery
- File uploads
- Administrator notifications
- Serverless functions

---

# Requirements

Before running the project, install:

- Node.js 20.x or later
- npm
- Git
- Netlify CLI (optional)
- VS Code (recommended)

Verify installation:

```bash
node -v
npm -v
git --version
```

---

# Clone Repository

```bash
git clone https://github.com/<username>/evs-healthcare.git

cd evs-healthcare
```

---

# Install Dependencies

```bash
npm install
```

---

# Create Environment File

Create a file named:

```text
.env.local
```

or

```text
.env
```

depending on your local setup.

Copy the contents from:

```text
.env.example
```

---

# Required Environment Variables

```env
EMAILJS_SERVICE_ID=

EMAILJS_TEMPLATE_ID=

EMAILJS_USER_TEMPLATE_ID=

EMAILJS_PUBLIC_KEY=

EMAILJS_PRIVATE_KEY=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_UPLOAD_PRESET=

ADMIN_EMAIL=
```

---

# Environment Variable Description

| Variable | Description |
|-----------|-------------|
| EMAILJS_SERVICE_ID | EmailJS service identifier |
| EMAILJS_TEMPLATE_ID | Administrator email template |
| EMAILJS_USER_TEMPLATE_ID | Applicant confirmation template |
| EMAILJS_PUBLIC_KEY | EmailJS public API key |
| EMAILJS_PRIVATE_KEY | EmailJS private API key |
| CLOUDINARY_CLOUD_NAME | Cloudinary account name |
| CLOUDINARY_UPLOAD_PRESET | Upload preset for CV uploads |
| ADMIN_EMAIL | Destination email for applications |

---

# Netlify Environment Variables

In production, configure the same variables inside Netlify.

Navigate to:

```
Site Settings

↓

Build & Deploy

↓

Environment Variables
```

Add every variable listed above.

After updating variables:

Redeploy the application.

---

# Cloudinary Setup

Create a Cloudinary account.

Retrieve:

- Cloud Name
- Upload Preset

Add them to the environment variables.

Verify uploads using the application form.

---

# EmailJS Setup

Create an EmailJS account.

Configure:

- Email Service
- Administrator Template
- Applicant Template

Retrieve:

- Service ID
- Template IDs
- Public Key
- Private Key

Store them in Netlify Environment Variables.

---

# Administrator Email

Specify the destination email for job applications.

Example:

```env
ADMIN_EMAIL=admin@example.com
```

---

# Running the Application

Start the development server:

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

# Production Build

Create a production build:

```bash
npm run build
```

Preview:

```bash
npm run preview
```

---

# Netlify Functions

Serverless functions are located in:

```
netlify/functions/
```

Verify functions execute correctly during local testing.

---

# Cloudflare Configuration

Recommended production settings:

SSL Mode

```
Full (Strict)
```

Enable:

- Always Use HTTPS
- HSTS
- Bot Fight Mode
- Managed WAF Rules
- Rate Limiting

---

# Security Recommendations

Never commit:

- .env
- .env.local
- API keys
- Private credentials
- Tokens
- Passwords

Ensure `.gitignore` includes:

```text
.env
.env.local
.env.production
.env.development
```

---

# Local Verification Checklist

Before starting development verify:

- Node.js installed
- Dependencies installed
- Environment variables created
- Internet connection available
- EmailJS configured
- Cloudinary configured

---

# Production Verification Checklist

Before deployment verify:

- Environment variables configured
- Build successful
- Forms working
- Email delivery successful
- Cloudinary upload successful
- HTTPS enabled
- Security headers configured

---

# Common Issues

## Missing Environment Variables

Symptoms

- Forms fail
- Email not sent
- Upload errors

Solution

Verify every required variable exists.

---

## Invalid EmailJS Configuration

Symptoms

```
Unauthorized
```

Solution

Confirm:

- Public Key
- Private Key
- Service ID
- Template IDs

---

## Cloudinary Upload Failure

Verify:

- Cloud Name
- Upload Preset
- Upload permissions

---

## Build Errors

Run:

```bash
npm install

npm run build
```

Verify dependencies are installed correctly.

---

# Environment Variable Template

```env
EMAILJS_SERVICE_ID=service_xxxxx

EMAILJS_TEMPLATE_ID=template_xxxxx

EMAILJS_USER_TEMPLATE_ID=template_user_xxxxx

EMAILJS_PUBLIC_KEY=public_xxxxx

EMAILJS_PRIVATE_KEY=private_xxxxx

CLOUDINARY_CLOUD_NAME=your_cloud

CLOUDINARY_UPLOAD_PRESET=your_upload_preset

ADMIN_EMAIL=admin@example.com
```

---

# Best Practices

- Store secrets only in environment variables.
- Never hardcode credentials.
- Keep `.env.example` updated.
- Rotate credentials if compromised.
- Use different credentials for development and production where appropriate.
- Verify environment variables after every deployment.
- Restrict access to production credentials.

---

# Conclusion

The EVS Healthcare Solutions platform separates configuration from application code using environment variables.

This approach improves security, simplifies deployments, and allows the same codebase to be deployed across development, staging, and production environments with different configurations.

Following this guide ensures a consistent and secure setup process for contributors and future projects.