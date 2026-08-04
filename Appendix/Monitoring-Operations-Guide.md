# EVS Healthcare Solutions

# Monitoring, Operations & Incident Response Guide

**Version:** 1.0  
**Project:** EVS Healthcare Solutions  
**Author:** Musa Olalekan  
**Role:** Cloud Security Engineer | DevSecOps Engineer  
**Environment:** Production

---

# Table of Contents

1. Purpose
2. Monitoring Architecture
3. Monitoring Objectives
4. Monitoring Tools
5. Daily Operations
6. Weekly Maintenance
7. Monthly Maintenance
8. Performance Monitoring
9. Security Monitoring
10. Deployment Monitoring
11. Email Monitoring
12. Incident Response Procedures
13. Common Operational Issues
14. Disaster Recovery
15. Backup Strategy
16. Scaling Strategy
17. Cost Monitoring
18. Operational Checklist

---

# 1. Purpose

This document provides the operational procedures used to monitor,
maintain and secure the EVS Healthcare production environment after deployment.

It acts as the primary operations runbook for production support.

Objectives

• Maintain 99.9% availability

• Detect failures early

• Maintain security posture

• Ensure successful deployments

• Provide repeatable incident response procedures

---

# 2. Monitoring Architecture

                    Internet Users
                           │
                           ▼
                 Cloudflare CDN + WAF
                           │
                           ▼
                     Netlify Hosting
                           │
                           ▼
                  React Frontend (Vite)
                           │
                           ▼
                Netlify Serverless Functions
                           │
           ┌───────────────┴───────────────┐
           ▼                               ▼
      Cloudinary                     EmailJS

Monitoring Sources

• Cloudflare Analytics

• Netlify Logs

• GitHub Security

• Browser Console

• EmailJS Dashboard

---

# 3. Monitoring Objectives

Availability

Target

99.9%

Performance

Page Load

<3 seconds

Security

SSL Labs

Grade A

Security Headers

Grade A

OWASP

0 High

0 Medium

Email Authentication

SPF PASS

DKIM PASS

DMARC PASS

---

# 4. Monitoring Tools

## Cloudflare

Purpose

• WAF Events

• DDoS Protection

• Firewall Events

• Bot Protection

• TLS Monitoring

---

## Netlify

Purpose

• Deployment Status

• Build Logs

• Function Logs

• Performance

---

## GitHub

Purpose

• Dependency Monitoring

• Secret Scanning

• Version Control

• Backup Repository

---

## EmailJS

Purpose

• Delivery Status

• Failed Emails

• Authentication

---

## Browser DevTools

Purpose

• JavaScript Errors

• Network Requests

• Performance

---

# 5. Daily Operations

Perform every business day.

✔ Verify website availability

✔ Verify HTTPS certificate

✔ Review Cloudflare Analytics

✔ Review blocked requests

✔ Review deployment status

✔ Verify forms are working

✔ Verify email delivery

✔ Check browser console

✔ Review serverless function logs

---

# 6. Weekly Maintenance

Perform every week.

✔ Review WAF Events

✔ Review Build History

✔ Update Dependencies

✔ Review GitHub Security Alerts

✔ Verify SSL Grade

✔ Review Performance

✔ Test Contact Form

✔ Test Job Application Form

✔ Verify Cloudinary Uploads

✔ Archive Logs

---

# 7. Monthly Maintenance

• Dependency Updates

• Security Review

• Performance Review

• Documentation Update

• Backup Verification

• Cost Review

• Infrastructure Review

• SSL Verification

• Recovery Test

---

# 8. Performance Monitoring

Monitor

• Page Load Time

• Largest Contentful Paint

• First Contentful Paint

• Response Time

• JavaScript Bundle Size

• Network Requests

• Cache Hit Ratio

Optimization Techniques

• Lazy Loading

• Image Compression

• Code Splitting

• HTTP Compression

• Cloudflare CDN

• Browser Caching

---

# 9. Security Monitoring

Monitor

• WAF Blocks

• Bot Traffic

• Failed Requests

• CSP Violations

• Security Headers

• SSL Status

• Firewall Events

• Rate Limiting

Verify

SSL Labs

Mozilla Observatory

SecurityHeaders.com

OWASP ZAP

Google Safe Browsing

---

# 10. Deployment Monitoring

Deployment Process

Developer

↓

GitHub

↓

Netlify Build

↓

Production

↓

Cloudflare Cache

↓

Users

After Every Deployment

✔ Build Successful

✔ No Console Errors

✔ Forms Tested

✔ HTTPS Working

✔ CSP Valid

✔ WAF Active

✔ Email Working

✔ Mobile Tested

---

# 11. Email Monitoring

Verify

• Admin Email

• Applicant Confirmation

• SPF

• DKIM

• DMARC

Review

• Failed Messages

• Bounce Rate

• Spam Reports

• Delivery Success

---

# 12. Incident Response Procedures

## Website Down

Actions

1. Verify Netlify deployment

2. Verify Cloudflare

3. Review Build Logs

4. Review Function Logs

5. Test Website

6. Redeploy if required

---

## Forms Not Working

Actions

• Review Browser Console

• Review Netlify Function Logs

• Verify Environment Variables

• Test API Endpoint

• Verify Cloudinary

---

## Email Failure

Actions

• Verify EmailJS

• Verify DNS Records

• Verify SPF

• Verify DKIM

• Verify DMARC

---

## SSL Problems

Actions

• Review Cloudflare SSL

• Verify HTTPS

• Verify HSTS

• Verify TLS Version

---

## WAF Blocking Users

Actions

• Review Firewall Events

• Review Rule Trigger

• Adjust Rule

• Retest

---

# 13. Common Operational Issues

| Issue | Resolution |
|--------|------------|
| DNS Propagation | Wait and verify records |
| Build Failure | Review Netlify Logs |
| Missing Environment Variable | Update Netlify Variables |
| CSP Errors | Update CSP Policy |
| Email Failure | Verify EmailJS |
| Upload Failure | Verify Cloudinary |
| Redirect Loop | Review Cloudflare Rules |
| SSL Error | Verify Full (Strict) Mode |

---

# 14. Disaster Recovery

Recovery Objectives

RTO

30 Minutes

RPO

Minimal Configuration Loss

Recovery Steps

1. Restore GitHub Repository

2. Redeploy Netlify

3. Restore Environment Variables

4. Verify Cloudflare

5. Test Website

6. Test Email

7. Verify Security

---

# 15. Backup Strategy

Source Code

GitHub Private Repository

Client Backup Repository

GitHub Backup

Documentation

GitHub

Local Copy

Cloud Storage

Environment Variables

Secure Password Manager

Cloudflare

Export Configuration

Netlify

Export Settings

---

# 16. Scaling Strategy

Current

React

↓

Netlify

↓

Cloudflare

Future

React

↓

API Gateway

↓

Serverless Functions

↓

Database

↓

Authentication

↓

Monitoring Dashboard

↓

SIEM Integration

---

# 17. Cost Monitoring

| Service | Monthly Cost |
|----------|--------------|
| Domain | £10/year |
| GitHub | Free |
| Netlify | Free |
| Cloudflare | Free |
| EmailJS | Free |
| Cloudinary | Free Tier |

Review monthly usage to ensure free-tier limits are not exceeded.

---

# 18. Operational Checklist

Daily

☐ Website Online

☐ HTTPS Working

☐ Forms Working

☐ Emails Working

☐ WAF Active

☐ Build Successful

Weekly

☐ Security Review

☐ Dependency Updates

☐ Backup Verification

☐ Performance Review

☐ Documentation Review

Monthly

☐ Disaster Recovery Review

☐ Cost Review

☐ Security Testing

☐ SSL Verification

☐ Infrastructure Review

☐ Documentation Update

---

# Conclusion

The EVS Healthcare production environment is monitored using a layered operational approach that combines infrastructure monitoring, application monitoring, security monitoring, deployment verification, and incident response procedures.

This guide provides a repeatable operational framework for maintaining availability, performance, and security while supporting future enhancements and production growth.