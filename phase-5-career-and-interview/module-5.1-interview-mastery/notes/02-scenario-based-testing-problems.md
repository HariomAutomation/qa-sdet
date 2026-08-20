# 📘 Module 5.1 — SDET Interview Mastery

## Lesson 2: Scenario-Based System & Edge-Case Testing Problems

---

## 🎯 Problem 1: Flash Sale E-Commerce Testing (Concurrency & Race Conditions)
**Question:** *"How would you test an e-commerce flash sale where 50,000 users attempt to buy only 100 units of an iPhone at exactly 12:00:00 PM?"*

### Senior SDET Structured Answer:
1. **Concurrency & Race Condition Tests (Backend / API)**:
   - Run a k6 / JMeter script with 500 VUs simultaneously sending `POST /api/v1/orders` at the exact same millisecond timestamp.
   - Assert database row-level locking: Verify exactly 100 orders succeed (HTTP 201) and remaining 49,900 receive clean HTTP 409 Conflict / Out of Stock.
   - Verify zero negative inventory balance in database.
2. **Rate Limiting & DDoS Protection**:
   - Verify API Gateway rejects bursts beyond SLA with HTTP 429 (Too Many Requests).
3. **Frontend UI State Resilience**:
   - Playwright test: When inventory reaches 0, button must immediately change to disabled "Out of Stock" without requiring manual page refresh (WebSocket event check).

---

## 🎯 Problem 2: Asynchronous 3rd-Party Payment Webhooks
**Question:** *"How do you test a checkout system where payment confirmation arrives asynchronously 5 to 30 seconds later via a Stripe/Razorpay Webhook?"*

### Senior SDET Structured Answer:
1. **Mocking & Contract Tests (Fast Unit/Integration)**:
   - Use MSW / Nock to mock the webhook receiver endpoint with sample signed payloads (valid signature, invalid signature, duplicate event ID).
2. **Idempotency Verification**:
   - Send the exact same webhook payload 3 times.
   - Assert that the user's order is fulfilled exactly ONCE and not billed/credited thrice.
3. **End-to-End Playwright Async Polling**:
   - Instead of static `page.waitForTimeout()`, use `await expect.poll(async () => orderStatusLocator.textContent()).toBe("PAID")`.

---

## 🎯 Problem 3: Eliminating a 10% Flaky Test Suite
**Question:** *"You joined a team where 10% of CI automated tests fail intermittently. What is your 4-step remediation plan?"*

### Senior SDET Structured Answer:
1. **Quarantine & Telemetry**:
   - Move flaky tests to a `@quarantine` suite so they don't block the deployment pipeline.
   - Enable Playwright Trace Viewer (`trace: "on-first-retry"`) and video capture.
2. **Root Cause Analysis (Categorize Failures)**:
   - *Category A: Hardcoded Sleeps / Timing issues* -> Replace with Playwright Web-First auto-retrying assertions.
   - *Category B: Shared Test State Pollution* -> Wrap test fixtures with isolated `BrowserContext` and database transaction rollbacks.
   - *Category C: Fragile Selectors* -> Migrate from XPath to `getByRole` / `getByTestId`.
3. **Fix, Stress Run & Un-quarantine**:
   - Run the fixed test 50 times in a loop (`--repeat-each=50`) locally and in CI. If 50/50 pass, merge back to main regression suite.
