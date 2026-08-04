# EVS Healthcare Solutions Architecture

## High-Level Architecture

```
                      Users
                        │
                        ▼
                Cloudflare Edge
        ┌──────────────────────────┐
        │ • WAF                    │
        │ • DDoS Protection        │
        │ • Rate Limiting          │
        │ • Bot Protection         │
        │ • HTTPS Enforcement      │
        └──────────────────────────┘
                        │
                        ▼
                 Netlify Hosting
        ┌──────────────────────────┐
        │ React Application        │
        │ Static Assets            │
        │ Routing                  │
        └──────────────────────────┘
                        │
                        ▼
            Netlify Serverless Functions
        ┌──────────────────────────┐
        │ Validate Requests        │
        │ Process Forms            │
        │ Protect Secrets          │
        └──────────────────────────┘
                 │             │
                 │             │
                 ▼             ▼
          Cloudinary       EmailJS
      Secure File Store   Email Service
           │                   │
           ▼                   ▼
     Store Applicant CVs   Notify Recruiter
                            Notify Applicant
```

---

## Request Flow

```
Visitor

↓

Cloudflare

↓

Netlify

↓

React Application

↓

User submits form

↓

Netlify Function

↓

Validate Input

↓

Cloudinary (Store CV)

↓

EmailJS

↓

Recruiter Email

↓

Applicant Confirmation Email
```

---

## Security Layers

Layer 1
Cloudflare Edge Security

- WAF
- DDoS Protection
- Bot Protection
- Rate Limiting

↓

Layer 2
Netlify Hosting

- HTTPS
- TLS
- CDN

↓

Layer 3
Application Security

- CSP
- Security Headers
- Input Validation

↓

Layer 4
Serverless Backend

- Environment Variables
- Secret Protection

↓

Layer 5
External Services

- Cloudinary
- EmailJS