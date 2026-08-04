# Troubleshooting Guide

This document provides a reference for diagnosing and resolving common issues encountered during the development, deployment, security hardening, and operation of the EVS Healthcare Solutions platform.

The troubleshooting procedures documented here are based on real production issues encountered during implementation.

---

# Troubleshooting Process

When an issue occurs, I usually follow this workflow:

```

Problem Report

↓

Identify Symptoms

↓

Review Logs

↓

Identify Root Cause

↓

Apply Fix

↓

Retest

↓

Deploy

↓

Monitor

```

---

# 1. Website Does Not Load

## Symptoms

- Website unavailable
- Browser displays timeout
- HTTP 500
- Blank page

## Possible Causes

- Netlify deployment failure
- DNS propagation
- Build failure
- Missing environment variables

## Resolution

1. Open Netlify Dashboard.
2. Check the latest deployment.
3. Review Build Logs.
4. Verify environment variables.
5. Redeploy the latest build.

---

# 2. HTTPS Not Working

## Symptoms

- Browser warns "Not Secure"
- SSL certificate error
- Mixed content warnings

## Possible Causes

- Cloudflare SSL mode incorrect
- Certificate provisioning incomplete
- HTTP resources referenced

## Resolution

- Enable **Full (Strict)** SSL in Cloudflare.
- Enable **Always Use HTTPS**.
- Verify TLS certificate.
- Replace HTTP resources with HTTPS.

---

# 3. Infinite Redirect Loop

## Symptoms

ERR_TOO_MANY_REDIRECTS

## Root Cause

HTTPS redirection configured in multiple locations.

## Resolution

- Remove duplicate redirects.
- Allow Cloudflare to manage redirects.
- Clear browser cache.
- Test again.

---

# 4. Form Submission Fails

## Symptoms

- Submit button does nothing
- HTTP 500
- Validation errors

## Possible Causes

- Netlify Function error
- Missing environment variables
- Invalid request

## Resolution

1. Check Function Logs.
2. Verify environment variables.
3. Validate request payload.
4. Test locally.
5. Redeploy.

---

# 5. Email Not Received

## Symptoms

- Administrator receives nothing
- Applicant confirmation missing

## Possible Causes

- EmailJS configuration
- Missing API keys
- SPF/DKIM issue

## Resolution

- Verify EmailJS Dashboard.
- Confirm Service ID.
- Confirm Template ID.
- Verify Public and Private Keys.
- Check spam folder.
- Test email manually.

---

# 6. Duplicate Emails

## Symptoms

Administrator receives duplicate applications.

## Root Cause

EmailJS Auto Reply plus backend confirmation email.

## Resolution

Disable EmailJS Auto Reply.

Allow backend to send:

- Administrator notification
- Applicant confirmation

---

# 7. Cloudinary Upload Failure

## Symptoms

File upload fails.

## Possible Causes

- Invalid Upload Preset
- Missing Cloud Name
- CSP restrictions

## Resolution

Verify:

- Cloud Name
- Upload Preset
- API configuration

Update CSP if required.

---

# 8. CSP Violations

## Symptoms

Console displays:

```

Refused to load script

```

or

```

Content Security Policy violation

```

## Root Cause

Required domain missing from whitelist.

## Resolution

Update Content Security Policy.

Include required domains.

Redeploy.

Retest.

---

# 9. Build Failure

## Symptoms

Deployment fails.

Example:

```

vite: command not found

```

## Possible Causes

Incorrect dependency configuration.

## Resolution

Move required packages from:

```

devDependencies

```

to

```

dependencies

```

Run:

```

npm install

git push origin main

```

---

# 10. Static Files Return 404

## Symptoms

robots.txt

sitemap.xml

return 404.

## Root Cause

SPA redirect catches every request.

## Resolution

Exclude static assets from redirect rules.

Redeploy.

---

# 11. Mobile Form Does Not Submit

## Symptoms

Works on desktop.

Fails on mobile.

## Root Cause

File input compatibility.

## Resolution

Test on physical devices.

Use supported file types.

Verify input attributes.

---

# 12. WAF Blocking Valid Users

## Symptoms

Users receive:

403 Forbidden

## Root Cause

Aggressive WAF rules.

## Resolution

Review Cloudflare Analytics.

Whitelist trusted services.

Reduce rule sensitivity.

Retest.

---

# 13. DNS Problems

## Symptoms

Website unavailable.

Emails stop working.

## Resolution

Verify:

- A Records
- CNAME Records
- MX Records
- Nameservers

Use:

- MXToolbox
- DNS Checker

---

# 14. Environment Variables Missing

## Symptoms

Application builds successfully.

Production functionality fails.

## Resolution

Verify every variable exists:

```

EMAILJS_SERVICE_ID
EMAILJS_TEMPLATE_ID
EMAILJS_USER_TEMPLATE_ID
EMAILJS_PUBLIC_KEY
EMAILJS_PRIVATE_KEY
CLOUDINARY_CLOUD_NAME
CLOUDINARY_UPLOAD_PRESET
ADMIN_EMAIL

```

Redeploy after changes.

---

# 15. Security Headers Missing

## Symptoms

SecurityHeaders.com score decreases.

## Resolution

Verify:

```

public/_headers

```

Confirm deployment includes:

- CSP
- HSTS
- X-Frame-Options
- Referrer Policy
- Permissions Policy

Redeploy.

---

# 16. SSL Grade Drops

## Symptoms

SSL Labs reports lower grade.

## Resolution

Verify:

- TLS Version
- Cipher Suites
- HSTS
- Certificate Chain

Retest after changes.

---

# 17. GitHub Deployment Not Updating

## Symptoms

Changes pushed.

Production unchanged.

## Resolution

Check:

- Push reached GitHub.
- Netlify auto-deployed.
- Build completed.
- Browser cache cleared.

If necessary:

Deploy latest manually.

---

# Useful Logs

## Netlify

Review:

- Build Logs
- Function Logs

---

## Browser

Developer Tools

- Console
- Network
- Security

---

## Cloudflare

Review:

- Analytics
- Firewall Events
- Rate Limiting
- DNS

---

## EmailJS

Review:

- Email Delivery
- API Errors
- Failed Requests

---

# Diagnostic Checklist

Before requesting support verify:

- Website reachable
- HTTPS working
- DNS propagated
- SSL valid
- Forms submit
- Emails delivered
- Cloudinary upload works
- Security headers present
- Netlify deployment successful
- Cloudflare active

---

# Helpful Testing Tools

| Tool | Purpose |
|------|----------|
| SSL Labs | TLS & HTTPS Validation |
| SecurityHeaders.com | Security Header Testing |
| Mozilla Observatory | Browser Security Analysis |
| OWASP ZAP | Dynamic Security Testing |
| Google Safe Browsing | Reputation Check |
| MXToolbox | Email & DNS Verification |
| DNS Checker | DNS Propagation |

---

# Preventive Best Practices

To reduce production issues:

- Keep dependencies updated.
- Store secrets in environment variables.
- Test locally before deployment.
- Validate DNS changes carefully.
- Verify security headers after deployment.
- Review deployment logs after every release.
- Enable Cloudflare protection.
- Document infrastructure changes.
- Monitor production continuously.

---

# Conclusion

The issues documented in this guide were encountered during the implementation of the EVS Healthcare Solutions platform and were successfully resolved through systematic troubleshooting.

Maintaining detailed documentation of problems, root causes, and resolutions helps reduce future troubleshooting time, improves operational reliability, and provides a reusable reference for future projects.