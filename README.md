# EVS Healthcare Solutions

A secure healthcare recruitment platform built with React, Netlify Functions, Cloudflare, and Cloudinary. The application enables healthcare professionals to apply for jobs, upload CVs securely, and communicate with recruiters while protecting sensitive data using cloud security best practices.

🌐 **Live Demo:** https://www.evshealthcare.co.uk

---

# Project Overview

This project demonstrates the complete lifecycle of designing, developing, deploying, and securing a production-ready healthcare recruitment platform.

The primary objectives were to:

- Build a modern responsive web application
- Secure applicant data and CV uploads
- Protect communication channels
- Deploy using cloud-native technologies
- Apply defense-in-depth security principles
- Document the complete engineering process

---

# Architecture

```
                       Users
                         │
                         ▼
               Cloudflare Edge Security
        ┌────────────────────────────────┐
        │ • Web Application Firewall     │
        │ • DDoS Protection              │
        │ • Bot Protection               │
        │ • Rate Limiting                │
        │ • HTTPS Enforcement            │
        └────────────────────────────────┘
                         │
                         ▼
                  Netlify Hosting
        ┌────────────────────────────────┐
        │ React Application              │
        │ Static Assets                  │
        │ Secure Routing                 │
        └────────────────────────────────┘
                         │
                         ▼
            Netlify Serverless Functions
        ┌────────────────────────────────┐
        │ Input Validation               │
        │ Form Processing                │
        │ Secret Management              │
        └────────────────────────────────┘
                 │                  │
                 │                  │
                 ▼                  ▼
          Cloudinary           EmailJS
      Secure CV Storage     Email Delivery
                 │                  │
                 ▼                  ▼
      Recruiter Dashboard     Applicant Confirmation
```

---

# Application Flow

```
Visitor

↓

Cloudflare Security

↓

Netlify Hosting

↓

React Frontend

↓

Application Form

↓

Netlify Function

↓

Input Validation

↓

Cloudinary (CV Upload)

↓

EmailJS

↓

Recruiter Notification

↓

Applicant Confirmation Email
```

---

# Key Features

## Frontend

- React 19
- Vite
- Responsive Design
- Mobile-first UI
- Form Validation

## Backend

- Netlify Functions
- Serverless API
- Secure Form Processing
- Error Handling

## Cloud

- Cloudflare
- Netlify
- Cloudinary
- EmailJS

---

# Security Features

## Edge Security

- Cloudflare WAF
- DDoS Protection
- Bot Protection
- Rate Limiting

## Transport Security

- HTTPS
- TLS 1.2 / TLS 1.3
- HSTS

## Application Security

- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Permissions Policy
- Input Validation

## Backend Security

- Environment Variables
- Secret Management
- Serverless Isolation

## Email Security

- SPF
- DKIM
- DMARC

---

# Security Testing

The platform was validated using:

| Tool | Purpose |
|-------|---------|
| SSL Labs | TLS Configuration |
| Mozilla Observatory | Security Headers |
| OWASP ZAP | Vulnerability Assessment |
| SecurityHeaders.com | HTTP Security Headers |

---

# Technology Stack

### Frontend

- React
- JavaScript
- Vite
- Tailwind CSS

### Backend

- Node.js
- Netlify Functions

### Cloud

- Cloudflare
- Netlify
- Cloudinary
- EmailJS

### Tools

- Git
- GitHub
- OWASP ZAP
- SSL Labs

---

# Project Structure

```
evs-healthcare/

├── src/
├── public/
├── netlify/
│   └── functions/
├── docs/
│   ├── Architecture.md
│   ├── Deployment.md
│   ├── Security-Report.md
│   ├── Testing.md
│   ├── Lessons-Learned.md
│   └── Screenshots/
├── .env.example
├── .gitignore
├── netlify.toml
└── README.md
```

---

# Documentation

Detailed documentation is available inside the **docs/** folder.

Included documentation:

- Architecture
- Deployment Guide
- Security Report
- Security Testing
- Lessons Learned
- Screenshots

---

# Local Development

```bash
git clone https://github.com/Lakewest1/EVS-HEALTH.git

cd EVS-HEALTH

npm install

cp .env.example .env

npm run dev
```

---

# Deployment

Production deployment uses:

- Cloudflare CDN
- Netlify Hosting
- Automatic HTTPS
- Automatic SSL Renewal
- Serverless Functions

---

# Lessons Learned

Throughout this project I gained practical experience in:

- Cloud Security
- Secure Web Development
- Serverless Architecture
- Production Deployment
- Secret Management
- Defense-in-Depth
- Secure File Uploads
- Cloud-based Email Delivery

---

# Future Improvements

- Role-Based Access Control (RBAC)
- Multi-Factor Authentication (MFA)
- SIEM Integration
- Security Monitoring Dashboard
- Audit Logging
- Admin Portal

---

# Live Demo

https://www.evshealthcare.co.uk

---

# Author

**Musa Olalekan**

Cloud Security Engineer | DevSecOps Engineer | Full Stack Developer

GitHub

https://github.com/Lakewest1




---

# License

MIT License
