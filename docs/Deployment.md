# Deployment Guide

This document describes the production deployment process for the EVS Healthcare Solutions platform, including CI/CD, Cloudflare configuration, Netlify deployment, environment variables, and post-deployment verification.

---

# Overview

The EVS Healthcare Solutions platform uses a modern cloud-native deployment architecture built around GitHub, Netlify, and Cloudflare.

## Deployment Architecture

```

Developer
│
▼

GitHub Repository
│
▼

Automatic Push to Main Branch
│
▼

Netlify CI/CD Pipeline
│
▼

Production Build
│
▼

Deploy Static Assets + Serverless Functions
│
▼

Cloudflare Edge Network
│
▼

HTTPS + WAF + DDoS Protection
│
▼

Users

```

---

# Production Infrastructure

| Component | Service |
|------------|----------|
| Source Control | GitHub |
| Hosting | Netlify |
| CDN | Cloudflare |
| DNS | Cloudflare |
| SSL/TLS | Cloudflare |
| Backend | Netlify Functions |
| File Storage | Cloudinary |
| Email Service | EmailJS |

---

# Continuous Integration & Continuous Deployment (CI/CD)

Deployment is fully automated using GitHub and Netlify.

## Workflow

```

Developer

↓

Code Changes

↓

Git Commit

↓

Git Push

↓

GitHub Repository

↓

Netlify detects new commit

↓

Build Application

↓

Deploy Serverless Functions

↓

Deploy Static Website

↓

Production Website Updated

```

Every push to the **main** branch automatically triggers a new production deployment.

---

# GitHub Repository

The application source code is maintained using Git version control.

Repository contains:

- React frontend
- Netlify Functions
- Documentation
- Configuration files
- Deployment settings

Main Branch

```

main

```

Production deployments are triggered only from the main branch.

---

# Netlify Deployment

## Build Configuration

Build Command

```

npm run build

```

Publish Directory

```

build

```

Functions Directory

```

netlify/functions

```

Node Version

```

20.x

```

---

# Netlify Configuration

Example **netlify.toml**

```toml
[build]
command = "npm run build"
publish = "build"
functions = "netlify/functions"

[build.environment]
NODE_ENV = "production"
CI = "true"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

---

# Environment Variables

Sensitive credentials are never stored inside the repository.

They are configured inside Netlify Environment Variables.

## EmailJS

```
EMAILJS_SERVICE_ID

EMAILJS_TEMPLATE_ID

EMAILJS_USER_TEMPLATE_ID

EMAILJS_PUBLIC_KEY

EMAILJS_PRIVATE_KEY
```

---

## Cloudinary

```
CLOUDINARY_CLOUD_NAME

CLOUDINARY_UPLOAD_PRESET
```

---

## Administrator

```
ADMIN_EMAIL
```

---

# Secret Management

Application secrets are protected using:

- Netlify Environment Variables
- Server-side access only
- No credentials inside frontend code
- No secrets committed to GitHub

The repository includes only:

```
.env.example
```

The actual

```
.env
```

file is excluded using

```
.gitignore
```

---

# Cloudflare Configuration

Cloudflare provides the first layer of protection before traffic reaches Netlify.

## DNS

Configured DNS records include:

| Record | Purpose |
|---------|----------|
| A | Root domain |
| CNAME | www subdomain |
| MX | Email delivery |

---

# SSL/TLS

Configuration

```
Mode:
Full (Strict)
```

Minimum TLS Version

```
TLS 1.2
```

Supported

- TLS 1.2
- TLS 1.3

Always Use HTTPS

```
Enabled
```

HSTS

```
Enabled
```

---

# Cloudflare Security

Enabled protections include:

- Web Application Firewall (WAF)
- Managed Rules
- DDoS Protection
- Rate Limiting
- Bot Fight Mode
- HTTPS Enforcement
- Edge Caching

---

# Rate Limiting

Configured to protect the application endpoint.

Example

```
Endpoint:
/apply

Limit:
5 requests per minute

Action:
Block

Duration:
1 hour
```

---

# DNS Migration

The production domain was migrated to Cloudflare DNS.

Migration included:

- DNS export
- Record verification
- MX record recreation
- SSL verification
- Propagation testing

This ensured minimal downtime during production migration.

---

# Deployment Procedure

## Step 1

Commit changes

```bash
git add .

git commit -m "Update production"
```

---

## Step 2

Push to GitHub

```bash
git push origin main
```

---

## Step 3

Netlify automatically:

- Detects new commit
- Downloads repository
- Installs dependencies
- Builds React application
- Deploys Netlify Functions
- Publishes website

---

## Step 4

Verify deployment

Check:

- Website loads
- Forms submit correctly
- Email delivery
- CV uploads
- HTTPS certificate
- Security headers

---

# Post-Deployment Validation

After every deployment the following checks are performed.

## Functional

- Homepage loads
- Navigation works
- Forms submit
- Email notifications sent
- CV upload successful

---

## Security

Verify

- HTTPS enabled
- TLS certificate valid
- HSTS active
- CSP active
- Security headers present

---

## Performance

Confirm

- Fast page loading
- Responsive design
- Mobile compatibility
- Static assets cached

---

# Rollback Strategy

If deployment issues occur:

1. Identify failed deployment.
2. Restore previous stable commit.
3. Push rollback commit.
4. Netlify automatically redeploys the previous version.
5. Verify production functionality.

---

# Deployment Checklist

Before deployment

- React application tested
- No console errors
- Mobile responsiveness verified
- Forms validated
- Email functionality tested
- File upload tested
- Environment variables configured
- Security headers configured
- GitHub repository updated

After deployment

- Website accessible
- HTTPS active
- Email delivery confirmed
- Cloudinary upload confirmed
- Security scan completed
- Performance verified

---

# Production Monitoring

Production services monitored include:

- Netlify deployment status
- Cloudflare Analytics
- EmailJS Dashboard
- SSL certificate validity
- Website availability

---

# Lessons from Deployment

During deployment several challenges were encountered and resolved, including:

- DNS migration
- Redirect loops
- Build failures
- Email authentication
- Cloudflare WAF tuning
- Security header configuration

Detailed root cause analysis is documented in **Lessons-Learned.md**.

---

# Deployment Summary

The EVS Healthcare Solutions platform was deployed using a secure cloud-native architecture with automated CI/CD, Cloudflare edge protection, Netlify serverless hosting, and centralized secret management.

This deployment approach provides:

- Automated releases
- Secure infrastructure
- Minimal operational overhead
- High availability
- Layered security
- Scalable serverless architecture
- Simplified maintenance
- Production-ready reliability