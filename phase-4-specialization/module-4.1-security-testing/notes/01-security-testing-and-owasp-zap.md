# 📘 Module 4.1 — Security Testing Basics for SDETs

## Lesson 1: OWASP Top 10, DAST with OWASP ZAP & SAST Pipelines

---

## 1️⃣ OWASP Top 10 Web & API Vulnerabilities

| Vulnerability | What It Is | How SDETs Test It |
|---|---|---|
| **Broken Access Control** | User accessing unauthorized resources (e.g. `/api/admin/users` as normal user) | Automated IDOR (Insecure Direct Object Reference) API tests |
| **Cryptographic Failures** | Sensitive data transmitted in plaintext or weak hashing | Verifying HTTPS enforcement, TLS 1.3, sensitive header masking |
| **Injection (SQLi / XSS)** | Malicious SQL/JS injected via input fields or query params | Fuzzing search inputs with `' OR '1'='1` and `<script>alert(1)</script>` |
| **Insecure Design** | Flawed business logic (e.g. negative quantity in cart) | Boundary value API tests with `-1` quantities or unauthorized coupons |
| **Security Misconfiguration** | Default passwords, verbose error stack traces exposed | Automated status code checks ensuring 500 errors don't expose stack traces |
| **Vulnerable Components** | Outdated third-party npm packages | Automated `npm audit` / Snyk scans in CI/CD pipeline |

---

## 2️⃣ Dynamic Application Security Testing (DAST) with OWASP ZAP in CI/CD

OWASP ZAP (Zed Attack Proxy) ko headless container mode mein CI/CD pipeline ke andar deploy karke baseline DAST scan run kiya jata hai:

```bash
# Docker-based automated baseline scan against staging URL
docker run --rm -v $(pwd)/zap-reports:/zap/wrk:rw \
  ghcr.io/zaproxy/zaproxy:stable zap-baseline.py \
  -t https://staging.example.com \
  -r zap-baseline-report.html
```

---

## 3️⃣ Static Application Security Testing (SAST) & Dependency Audits

```bash
# 1. npm audit in CI (Fail build if high/critical vulnerabilities exist)
npm audit --audit-level=high

# 2. Automated Snyk Security Scan
npx snyk test --severity-threshold=high
```
