# 📘 Module 4.2 — Accessibility (a11y) Testing

## Lesson 1: WCAG Guidelines & Automated a11y with `@axe-core/playwright`

> **Accessibility (a11y):** Ensuring web applications are usable for everyone, including people with visual, auditory, motor, or cognitive disabilities (mandatory for US/EU compliance under ADA & EAA).

---

## 1️⃣ WCAG 2.1 / 2.2 Core Principles (POUR)
- **Perceivable**: Text alternatives for images (`alt="Logo"`), color contrast ratio minimum 4.5:1 for normal text.
- **Operable**: Full keyboard accessibility (Tab, Enter, Space, Escape), visible focus rings, no keyboard traps.
- **Understandable**: Clear labels, intuitive error messages, predictable navigation.
- **Robust**: Valid semantic HTML (`<button>`, `<nav>`, `<main>`), proper ARIA roles and attributes.

---

## 2️⃣ Automated a11y Testing with `@axe-core/playwright`

```bash
npm install -D @axe-core/playwright
```

### Writing Automated a11y Tests in Playwright
```typescript
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility Compliance (WCAG 2.1 AA)", () => {
  test("homepage should pass WCAG 2.1 AA standards without violations", async ({ page }) => {
    await page.goto("https://www.saucedemo.com");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    // Zero accessibility violations assertion
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("scan specific component while excluding third-party widgets", async ({ page }) => {
    await page.goto("/checkout");

    const results = await new AxeBuilder({ page })
      .include("#checkout-form")
      .exclude(".third-party-chat-widget")
      .analyze();

    expect(results.violations).toEqual([]);
  });
});
```
