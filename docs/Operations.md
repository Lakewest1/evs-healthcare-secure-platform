# Operations Manual

This document defines the operational procedures, maintenance activities, routine checks, incident response workflows, and production management practices for the EVS Healthcare Solutions platform.

Its purpose is to ensure the platform remains secure, available, reliable, and maintainable throughout its operational lifecycle.

---

# Operations Objectives

The operational goals of the platform are to:

- Maintain high availability
- Ensure secure operation
- Detect issues early
- Respond quickly to incidents
- Maintain reliable deployments
- Protect sensitive data
- Support continuous improvement

---

# Production Environment

## Hosting

- Netlify
- Cloudflare
- GitHub

## Backend

- Netlify Serverless Functions

## External Services

- EmailJS
- Cloudinary

---

# Production Architecture

```
Users
   │
   ▼
Cloudflare
(WAF, CDN, TLS, Rate Limiting)
   │
   ▼
Netlify
(Hosting + Serverless Functions)
   │
   ├─────────────┐
   ▼             ▼
Cloudinary    EmailJS
(File Storage) (Email Service)
```

---

# Daily Operations

Perform the following checks every day.

## Website Availability

Verify:

- Homepage loads
- Navigation functions
- HTTPS enabled

Expected Result

Website accessible.

---

## Deployment Status

Review Netlify dashboard.

Confirm:

- Latest deployment successful
- No failed builds
- No deployment errors

---

## Application Testing

Test:

- Contact form
- Job application form
- Navigation
- Responsive layout

---

## Email Delivery

Verify:

- Administrator receives notifications
- Applicant confirmation emails are delivered

---

## Log Review

Check:

- Netlify Function Logs
- Browser Console (if required)
- Cloudflare Firewall Events

---

# Weekly Operations

## Security Review

Review:

- Cloudflare Analytics
- WAF Events
- Rate Limiting
- Bot Protection

---

## Performance Review

Verify:

- Page speed
- Static asset delivery
- CDN performance

---

## Form Testing

Submit a test application.

Confirm:

- Form validation
- File upload
- Email delivery

---

## SSL Verification

Confirm:

- HTTPS
- TLS configuration
- Certificate validity

---

# Monthly Operations

## Security Validation

Run:

- SSL Labs
- SecurityHeaders.com
- Mozilla Observatory

Verify expected scores remain unchanged.

---

## Dependency Review

Review project dependencies.

Check for:

- Security updates
- Bug fixes
- Compatibility updates

---

## Cloudinary Review

Verify:

- Storage usage
- Uploaded documents
- Service availability

---

## Email Review

Check:

- EmailJS dashboard
- Delivery statistics
- Error reports

---

## Documentation Review

Ensure documentation reflects current production configuration.

Update if required.

---

# Deployment Operations

Deployment Process

1. Complete development.
2. Test locally.
3. Commit changes.
4. Push to GitHub.
5. Netlify automatically deploys.
6. Verify deployment.
7. Perform production validation.

---

# Deployment Validation Checklist

After deployment verify:

- Website loads
- HTTPS enabled
- Forms working
- Emails delivered
- CV uploads successful
- Mobile compatibility
- Cloudflare active

---

# Backup Strategy

Maintain:

- GitHub repository
- Documentation
- Configuration files
- Environment templates

Sensitive credentials should never be stored inside the repository.

---

# Environment Management

Configuration is managed through Netlify Environment Variables.

Examples include:

```
EMAILJS_SERVICE_ID
EMAILJS_TEMPLATE_ID
EMAILJS_PUBLIC_KEY
EMAILJS_PRIVATE_KEY
CLOUDINARY_CLOUD_NAME
CLOUDINARY_UPLOAD_PRESET
ADMIN_EMAIL
```

Never commit secrets to Git.

---

# Security Operations

Daily review:

- WAF Events
- Firewall Logs
- Blocked Requests
- Bot Activity

Monthly review:

- Security Headers
- TLS Configuration
- SSL Rating
- DNS Configuration

---

# Incident Management

## Website Unavailable

Actions

1. Check Netlify deployment.
2. Review Build Logs.
3. Review Cloudflare.
4. Redeploy if necessary.

---

## Email Failure

Actions

- Verify EmailJS.
- Check environment variables.
- Test email delivery.
- Review DNS.

---

## Form Submission Failure

Actions

- Review Netlify Functions.
- Test locally.
- Verify API configuration.
- Redeploy.

---

## Cloudinary Failure

Actions

- Verify Upload Preset.
- Verify Cloud Name.
- Check service availability.
- Test uploads.

---

## DNS Issues

Actions

Review:

- A Records
- CNAME Records
- MX Records

Verify using:

- DNS Checker
- MXToolbox

---

# Maintenance Schedule

| Task | Frequency |
|-------|-----------|
| Website Availability | Daily |
| Deployment Review | Daily |
| Form Testing | Weekly |
| Email Testing | Weekly |
| Cloudflare Analytics | Weekly |
| Firewall Review | Weekly |
| SSL Verification | Monthly |
| Security Header Validation | Monthly |
| Dependency Updates | Monthly |
| Documentation Review | Monthly |

---

# Operational Metrics

Target operational objectives:

| Metric | Target |
|---------|---------|
| Website Availability | 99.9%+ |
| Deployment Success | 100% |
| SSL Labs | Grade A |
| SecurityHeaders | Grade A |
| Mozilla Observatory | 75+ |
| Page Load Time | <3 Seconds |
| Email Delivery | 100% |

---

# Operational Best Practices

- Test before every deployment.
- Monitor deployments after release.
- Protect secrets using environment variables.
- Review security logs regularly.
- Keep dependencies updated.
- Document infrastructure changes.
- Validate production after every deployment.
- Backup source code before major updates.
- Monitor external services continuously.

---

# Continuous Improvement

Future operational enhancements may include:

- Centralized logging
- Automated alerting
- Infrastructure as Code
- CI/CD security scanning
- Security Information and Event Management (SIEM)
- Vulnerability management
- Automated dependency updates
- Operational dashboards

---

# Operational Checklist

Daily

- Website online
- Deployment healthy
- Forms operational
- Emails delivered

Weekly

- Review Cloudflare
- Review logs
- Test uploads
- Test forms

Monthly

- Run security tests
- Review dependencies
- Verify SSL
- Review documentation

---

# Conclusion

The EVS Healthcare Solutions platform follows structured operational procedures to maintain security, reliability, and availability after deployment.

Routine monitoring, scheduled maintenance, deployment validation, and incident response processes help ensure the platform remains stable while reducing operational risk.

Following this operations manual provides a repeatable approach to managing production workloads and supporting long-term application health.