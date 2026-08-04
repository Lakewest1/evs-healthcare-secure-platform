# Monitoring & Operations Guide

This document describes the monitoring strategy, operational procedures, incident response process, and maintenance activities for the EVS Healthcare Solutions platform.

Continuous monitoring is essential for maintaining application availability, security, performance, and reliability after production deployment.

---

# Monitoring Objectives

The monitoring strategy focuses on:

- Website availability
- Deployment health
- Security events
- Performance
- Email delivery
- File uploads
- DNS health
- SSL certificate validity
- Cloud infrastructure

---

# Monitoring Architecture

```
                    Users
                      │
                      ▼
             Cloudflare Edge Network
                      │
     ┌────────────────┼────────────────┐
     ▼                ▼                ▼
 Firewall Logs   Analytics      Rate Limiting
                      │
                      ▼
                Netlify Hosting
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
     Build Logs            Function Logs
          │                       │
          ▼                       ▼
      Application         Serverless Backend
          │
          ▼
   EmailJS + Cloudinary
          │
          ▼
   Monitoring Dashboards
          │
          ▼
      Administrator
```

---

# Monitoring Components

| Component | Purpose |
|------------|----------|
| Cloudflare | Security & Traffic Monitoring |
| Netlify | Deployment & Application Logs |
| EmailJS | Email Delivery Monitoring |
| Cloudinary | File Upload Monitoring |
| UptimeRobot | Website Availability |
| Browser Developer Tools | Client-side Debugging |

---

# Website Availability Monitoring

## Tool

UptimeRobot

Purpose

Monitor production availability.

Configuration

- Check Interval: Every 5 minutes
- HTTPS Monitoring
- Automatic downtime alerts

Monitored URL

```
https://www.evshealthcare.co.uk
```

Expected Availability

```
99.9%+
```

---

# Deployment Monitoring

## Platform

Netlify

Monitor

- Deployment status
- Build success
- Build failures
- Build duration
- Function execution
- Environment variables

Location

```
Netlify Dashboard

→ Deploys

→ Functions

→ Build Logs
```

Recommended Review

- Every deployment
- Daily

---

# Cloudflare Monitoring

Cloudflare provides edge security monitoring.

Review:

- Firewall Events
- Security Analytics
- Traffic Analytics
- Cache Performance
- Rate Limiting
- Bot Detection

Purpose

Identify malicious traffic before it reaches the application.

Recommended Frequency

Weekly

---

# Security Monitoring

Security monitoring includes:

- Blocked requests
- WAF events
- Bot traffic
- DDoS activity
- Rate limiting events

Review Cloudflare Security Dashboard for unusual activity.

---

# SSL Monitoring

Regularly verify:

- Certificate validity
- HTTPS availability
- TLS configuration

Recommended Tools

- SSL Labs
- Browser Security Tab

Target

```
SSL Labs Grade A
```

---

# DNS Monitoring

Verify DNS after changes.

Review

- A Records
- CNAME Records
- MX Records
- Nameservers

Useful Tools

- DNS Checker
- MXToolbox

---

# Email Monitoring

Platform

EmailJS

Monitor

- Failed deliveries
- API errors
- Delivery success
- Usage limits

Recommended Review

Weekly

---

# Cloudinary Monitoring

Monitor

- Upload success
- Storage usage
- File availability

Verify

- CV uploads complete successfully
- Files remain accessible

---

# Performance Monitoring

Monitor:

- Page load time
- Static asset delivery
- CDN performance
- Mobile performance

Target

```
< 3 seconds
```

---

# Browser Monitoring

Use Browser Developer Tools to inspect:

- JavaScript errors
- Network requests
- Console warnings
- CSP violations

Recommended Browsers

- Chrome
- Edge
- Firefox

---

# Routine Maintenance

## Daily

- Verify website is online.
- Review deployment status.
- Check for build failures.

---

## Weekly

- Review Cloudflare Analytics.
- Review firewall events.
- Test application form.
- Verify email delivery.
- Check uptime statistics.

---

## Monthly

- Review security headers.
- Run SSL Labs test.
- Run SecurityHeaders.com scan.
- Verify Mozilla Observatory score.
- Check Cloudinary storage.
- Review dependencies for updates.

---

# Incident Response

## Website Down

Actions

1. Check UptimeRobot alert.
2. Review Netlify deployment.
3. Review Cloudflare status.
4. Redeploy if required.

Expected Recovery

```
< 30 minutes
```

---

## Email Failure

Actions

- Review EmailJS dashboard.
- Verify API credentials.
- Test email manually.
- Check DNS records.

---

## Form Submission Failure

Actions

- Review Netlify Function Logs.
- Verify environment variables.
- Test API locally.
- Redeploy if necessary.

---

## DNS Issues

Actions

- Verify DNS propagation.
- Confirm Cloudflare records.
- Validate MX records.

---

## Security Incident

Actions

- Review Cloudflare Firewall Events.
- Investigate blocked requests.
- Confirm WAF rules.
- Tune rate limiting if necessary.

---

# Key Performance Indicators (KPIs)

| Metric | Target |
|---------|---------|
| Website Availability | 99.9%+ |
| SSL Rating | Grade A |
| Security Headers | Grade A |
| Mozilla Observatory | 75+ |
| OWASP ZAP | 0 High/Medium |
| Page Load Time | <3 Seconds |
| Email Delivery | 100% |
| Build Success Rate | 100% |

---

# Monitoring Dashboard Checklist

Review the following dashboards regularly:

## Cloudflare

- Traffic
- Firewall Events
- DNS
- SSL
- Analytics

---

## Netlify

- Deployments
- Functions
- Logs
- Build History

---

## EmailJS

- Delivery Status
- Errors
- API Usage

---

## Cloudinary

- Uploaded Files
- Storage Usage
- Upload Activity

---

## UptimeRobot

- Uptime Percentage
- Downtime Alerts
- Response Time

---

# Operational Best Practices

To maintain production stability:

- Monitor deployments after every release.
- Keep dependencies updated.
- Review firewall logs regularly.
- Validate SSL certificates periodically.
- Rotate secrets when necessary.
- Store credentials only in environment variables.
- Backup source code before major changes.
- Document infrastructure changes.
- Test critical functionality after deployments.

---

# Continuous Improvement

Future monitoring enhancements may include:

- Security Information and Event Management (SIEM)
- Centralized logging
- Automated alerting
- Infrastructure monitoring
- Vulnerability scanning
- Performance dashboards
- Audit logging
- Cloud monitoring integration

---

# Conclusion

The EVS Healthcare Solutions platform uses continuous monitoring to maintain security, availability, and operational reliability after deployment.

Monitoring combines Cloudflare, Netlify, EmailJS, Cloudinary, and UptimeRobot to provide visibility into application health, deployment status, infrastructure security, and user-facing performance.

A structured monitoring process enables rapid detection of issues, supports incident response, and helps maintain a secure and reliable production environment.