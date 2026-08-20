# 📘 Module 2.1 — Playwright Master Class

## Lesson 1: Playwright Architecture & Setup

> **Goal:** Playwright ke internal architecture ko samajhna — Selenium/Cypress vs Playwright, Browser Contexts, CDP, aur production setup.

---

## 1️⃣ Why Playwright? (Architecture Breakdown)

```
┌────────────────────────────────────────────────────────┐
│                   Playwright Test Runner               │
│                  (Node.js Single Process)              │
└───────────────────────────┬────────────────────────────┘
                            │ WebSockets (CDP / BiDi)
                            │ ⚡ Fast, Single Connection
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│ Chromium /    │   │ Firefox /     │   │ WebKit /      │
│ Chrome        │   │ Gecko         │   │ Safari        │
└───────┬───────┘   └───────┬───────┘   └───────┬───────┘
        │                   │                   │
  BrowserContext      BrowserContext      BrowserContext
  (Isolated Session)  (Isolated Session)  (Isolated Session)
   ├── Page 1          ├── Page 1          ├── Page 1
   └── Page 2          └── Page 2          └── Page 2
```

### Key Differences vs Selenium vs Cypress
| Feature | Selenium WebDriver | Cypress | Playwright |
|---|---|---|---|
| **Protocol** | HTTP JSON Wire / W3C (Slow roundtrips) | In-browser JS Execution (Iframe issues) | **Chrome DevTools Protocol (CDP) via WebSocket** |
| **Speed** | 🟡 Slower | 🟢 Fast (single tab) | ⚡ **Blazing Fast** |
| **Multi-tab / Multi-window** | 🟡 Complex window handles | ❌ Not supported | ✅ **Native Multi-page / Context support** |
| **Iframe Support** | 🟡 `switchTo().frame()` | ❌ Cumbersome | ✅ **Native `page.frameLocator()`** |
| **Browser Isolation** | New browser process required (Slow) | Clears state per test | ⚡ **Microsecond `BrowserContext` isolation (Incognito-like)** |
| **Language Support** | Java, Python, C#, JS | JS/TS only | **TypeScript, JavaScript, Python, Java, C#** |

---

## 2️⃣ Core Concepts: Browser → BrowserContext → Page

1. **Browser**: Ek single browser instance (e.g. `chromium.launch()`). Yeh heavy process hota hai, isliye Playwright ek worker mein ek hi Browser launch karta hai.
2. **BrowserContext**: Ek isolated incognito profile. Iska apna separate storage (cookies, localStorage, session storage, cache) hota hai. Context create karne mein sirf ~2-5ms lagte hain!
3. **Page**: Context ke andar ek tab ya popup window.

```typescript
import { chromium } from "playwright";

async function run() {
  // 1. Launch Browser
  const browser = await chromium.launch({ headless: false, slowMo: 50 });

  // 2. Create Isolated Context (like clean Incognito)
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: { dir: "./videos" },
  });

  // 3. Create Page
  const page = await context.newPage();
  await page.goto("https://saucedemo.com");

  // Teardown
  await context.close();
  await browser.close();
}
```

---

## 3️⃣ Production-Ready `playwright.config.ts`

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,                // Har test file & test case parallel run hoga
  forbidOnly: !!process.env.CI,       // CI mein test.only commit hone par fail karega
  retries: process.env.CI ? 2 : 0,    // Flaky tests ke liye auto-retry
  workers: process.env.CI ? 4 : undefined, // CPU cores ke hisaab se auto workers
  reporter: [
    ["html", { open: "never" }],
    ["list"],
    ["json", { outputFile: "test-results/results.json" }],
  ],

  use: {
    baseURL: process.env.BASE_URL || "https://www.saucedemo.com",
    trace: "on-first-retry",          // Pehli baar fail hone par trace record karega
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 10000,
    navigationTimeout: 15000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"] },
    },
  ],
});
```

---

## 4️⃣ Writing Your First Test

```typescript
import { test, expect } from "@playwright/test";

test.describe("Authentication Flows", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should login successfully with valid credentials", async ({ page }) => {
    // 1. Locate elements using User-First locators
    const usernameInput = page.getByPlaceholder("Username");
    const passwordInput = page.getByPlaceholder("Password");
    const loginButton = page.getByRole("button", { name: "Login" });

    // 2. Perform actions (Auto-waits for element to be visible & enabled!)
    await usernameInput.fill("standard_user");
    await passwordInput.fill("secret_sauce");
    await loginButton.click();

    // 3. Web-First Assertions
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(page.getByText("Products")).toBeVisible();
  });
});
```
