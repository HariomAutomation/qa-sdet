# 🎭 Enterprise Playwright E2E Test Framework

Production-ready End-to-End Test Automation Framework built with **Playwright & TypeScript**, featuring:
- **Page Object Model (POM)** Architecture
- **Custom Fixture-Based Dependency Injection**
- **Multi-Browser Testing Matrix** (Chromium, Firefox, WebKit)
- **Web-First Auto-Retrying Assertions**
- **Network Interception & Request Mocking**
- **HTML & Trace Viewer Reporting**

## 📂 Project Structure

```
projects/e2e-test-framework/
├── playwright.config.ts      ← Multi-browser & CI configuration
├── src/
│   ├── pages/                ← Page Object Classes (BasePage, LoginPage, InventoryPage, etc.)
│   ├── components/           ← Reusable UI Components (Header, Cart)
│   ├── fixtures/             ← Custom Playwright Fixtures (testFixtures.ts)
│   └── utils/                ← Test Data & Constants (testData.ts)
└── tests/
    ├── auth.spec.ts          ← Authentication & Session Tests
    ├── inventory.spec.ts     ← Products, Sorting & Cart Badges
    ├── checkout.spec.ts      ← Full E2E Purchase Flow
    └── mocking.spec.ts       ← Network Routing & Resource Abort
```

## 🚀 Running Tests

```bash
# Run all tests headlessly across Chromium, Firefox, WebKit
npx playwright test

# Run tests in interactive UI mode
npm run test:ui

# Run tests with visible browser
npm run test:headed

# Open HTML Report
npm run report
```
