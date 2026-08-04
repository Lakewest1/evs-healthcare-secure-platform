# Security Engineering Report

This document provides a detailed overview of the security architecture, implementation decisions, security controls, testing methodology, and validation results for the EVS Healthcare Solution ltd platform.

---

# Executive Summary

Security was integrated throughout the software development lifecycle rather than being treated as a final deployment task.

The primary security objectives were to:

- Protect applicant personal information
- Secure CV uploads
- Protect administrator communication
- Secure serverless APIs
- Prevent common web application attacks (OWASP top 10)
- Implement a layered (Defense-in-Depth) security architecture

The final production deployment successfully achieved:

| Security Assessment | Result |
|---------------------|--------|
| SSL Labs | Grade A |
| SecurityHeaders.com | Grade A |
| Mozilla Observatory | 75/100 |
| OWASP ZAP | 0 High / Medium Vulnerabilities |
| Google Safe Browsing | Clean |
| SPF | PASS |
| DKIM | PASS |
| DMARC | PASS |

---

# Security Objectives

The project was designed to satisfy the following objectives:

- Confidentiality of applicant information
- Integrity of submitted forms
- Secure file uploads
- Strong HTTPS configuration
- Protection against automated attacks
- Secure deployment pipeline
- Secure secret management

---

# Security Architecture

## High-Level Architecture

```
                    Users
                      │
                      ▼
            Cloudflare Edge Network
      ┌─────────────────────────────┐
      │ Web Application Firewall    │
      │ DDoS Protection             │
      │ Rate Limiting               │
      │ Bot Protection              │
      │ HTTPS Enforcement           │
      └─────────────────────────────┘
                      │
                      ▼
               Netlify Hosting
      ┌─────────────────────────────┐
      │ React Frontend              │
      │ Static Assets               │
      │ CDN                         │
      └─────────────────────────────┘
                      │
                      ▼
        Netlify Serverless Functions
      ┌─────────────────────────────┐
      │ Input Validation            │
      │ Form Processing             │
      │ Email Processing            │
      │ Secret Management           │
      └─────────────────────────────┘
              │                │
              ▼                ▼
       Cloudinary         EmailJS
     Secure CV Storage   Email Delivery
```

---

# Defense in Depth

The application follows a multi-layered security model.

## Layer 1 — Edge Protection

Provided by Cloudflare.

Controls include:

- Web Application Firewall (WAF)
- DDoS Protection
- Bot Fight Mode
- Rate Limiting
- HTTPS Enforcement

Purpose:

Filter malicious traffic before requests reach the application.

---

## Layer 2 — Transport Security

All communications are encrypted.

Implemented:

- HTTPS
- TLS 1.2
- TLS 1.3
- HSTS

Purpose:

Protect data during transmission.

---

## Layer 3 — Application Security

Security headers protect the client application.

Implemented:

- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer Policy
- Permissions Policy

Purpose:

Reduce browser-based attack vectors.

---

## Layer 4 — Backend Security

Serverless functions handle sensitive operations.

Implemented:

- Input validation
- Error handling
- Environment variables
- Duplicate submission prevention
- Secret isolation

Purpose:

Prevent unauthorized access to backend resources.

---

## Layer 5 — External Services

Third-party integrations were secured.

Services:

- Cloudinary
- EmailJS

Security measures:

- Environment variables
- Private API credentials
- Server-side execution

---

# Security Controls

## Identity & Secrets

Secrets are never stored in source code.

Protected using:

- Netlify Environment Variables
- .gitignore
- .env.example template

---

## Secure File Upload

Applicant CV uploads are protected through:

- File validation
- Controlled upload workflow
- Cloudinary cloud storage

Purpose:

Reduce the risk of malicious file uploads.

---

## Email Security

Email infrastructure includes:

- SPF
- DKIM
- DMARC

Benefits:

- Prevent spoofing
- Improve deliverability
- Verify sender identity

---

## Rate Limiting

Cloudflare Rate Limiting protects the application form.

Configuration:

- Endpoint protection
- 5 requests per minute
- Temporary blocking of abusive traffic

Purpose:

Reduce spam and automated attacks.

---

## Security Headers

Implemented HTTP response headers include:

- Strict-Transport-Security
- Content-Security-Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

Purpose:

Protect against:

- Clickjacking
- XSS
- MIME sniffing
- Information leakage

---

# OWASP Top 10 Mitigation

The application was designed to address common web application risks.

| OWASP Risk | Mitigation |
|------------|------------|
| Broken Access Control | Server-side validation |
| Cryptographic Failures | HTTPS, TLS 1.2/1.3 |
| Injection | Input validation |
| Insecure Design | Defense-in-Depth architecture |
| Security Misconfiguration | Security headers, WAF |
| Vulnerable Components | Dependency management |
| Identification & Authentication | Email verification workflow |
| Software Integrity Failures | GitHub version control and controlled deployment |
| Logging & Monitoring | Cloudflare Analytics and Netlify logs |
| SSRF | Restricted external integrations |

---

# Security Testing

Multiple industry-standard tools were used.

## SSL Labs

Purpose:

Validate HTTPS and TLS configuration.

Result:

✅ Grade A

---

## Mozilla Observatory

Purpose:

Review browser security configuration.

Result:

✅ 75/100

---

## SecurityHeaders.com

Purpose:

Validate HTTP security headers.

Result:

✅ Grade A

---

## OWASP ZAP

Purpose:

Dynamic Application Security Testing.

Result:

- No High vulnerabilities
- No Medium vulnerabilities

---

## Google Safe Browsing

Purpose:

Verify site reputation.

Result:

Clean

---

# Security Decisions

Several key engineering decisions influenced the final architecture.

## Serverless Backend

Chosen because:

- Reduced attack surface
- No server management
- Automatic scaling

---

## Cloudflare

Chosen because:

- WAF
- CDN
- DDoS Protection
- TLS Management

---

## Netlify

Chosen because:

- Automated deployment
- Integrated serverless functions
- HTTPS
- Continuous Deployment

---

## Cloudinary

Chosen because:

- Secure cloud storage
- Reliable file delivery
- External file isolation

---

## EmailJS

Chosen because:

- Secure email delivery
- Backend integration
- Environment variable support

---

# Security Challenges

Several security-related challenges were encountered during implementation.

Examples include:

- DNS migration
- CSP configuration
- Email authentication
- Duplicate submissions
- WAF tuning
- Build failures

Complete analysis is available in **Lessons-Learned.md**.

---

# Security Monitoring

The production environment is monitored using:

- Cloudflare Analytics
- Netlify Logs
- EmailJS Dashboard
- Uptime monitoring

Monitoring focuses on:

- Availability
- Deployment status
- Traffic analysis
- Email delivery
- Security events

---

# Future Security Enhancements

Potential future improvements include:

- Role-Based Access Control (RBAC)
- Multi-Factor Authentication (MFA)
- Security Information and Event Management (SIEM)
- Centralized audit logging
- Automated vulnerability scanning
- Security event alerting

---

## Security Configuration Benchmark

The production deployment was evaluated using several independent security assessment tools.

Results:

| Tool | EVS Healthcare | Observation |
|------|---------------|-------------|
| SSL Labs | Grade A | Excellent TLS configuration |
| SecurityHeaders.com | Grade A | Strong HTTP security headers |
| Mozilla Observatory | 75/100 | Good security posture |

During testing, these tools occasionally assigned higher configuration scores to the EVS deployment than to some large public websites, including Google, for specific header or TLS configuration checks.

This comparison is intended only to illustrate the effectiveness of the deployed security configuration and should not be interpreted as indicating that the overall security of EVS exceeds that of those organizations.
# Conclusion

Security was integrated throughout the development lifecycle using a layered security architecture combining Cloudflare, Netlify, serverless computing, secure HTTP configuration, environment-based secret management, and industry-standard testing.

The completed platform demonstrates practical implementation of secure software engineering principles and cloud security best practices suitable for production deployment.