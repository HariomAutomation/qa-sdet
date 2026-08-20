/**
 * ============================================================
 * 📝 Module 2.1 — Playwright Master Class Exercises
 * ============================================================
 */

import { test, expect } from "@playwright/test";

// ===== SECTION 1: LOCATOR CHALLENGES =====

/**
 * Ex 1.1: User-First Locators
 * TODO: Convert old CSS/XPath into modern User-First Playwright Locators
 *
 * Old: page.locator("//button[contains(text(), 'Login')]")
 * New: ???
 *
 * Old: page.locator("input[name='email']")
 * New: ???
 *
 * Old: page.locator(".success-banner h1")
 * New: ???
 */

// ===== SECTION 2: AUTO-WAITING & ASSERTIONS =====

/**
 * Ex 2.1: Fix Flaky Non-Retrying Assertions
 * TODO: Fix the following code to make it 100% stable with Web-First Assertions
 */
test("flaky test exercise", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");

  // TODO: Refactor these two lines into a single web-first assertion
  // const isVisible = await page.getByRole("button", { name: "Login" }).isVisible();
  // expect(isVisible).toBe(true);
});

// ===== SECTION 3: POM & FIXTURE DESIGN =====

/**
 * Ex 3.1: Build a Search Component POM
 * TODO: Create a SearchComponent class with:
 * - searchInput (Locator)
 * - searchButton (Locator)
 * - search(query: string): Promise<void>
 * - verifyResultCount(expectedMin: number): Promise<void>
 */

// ===== SECTION 4: NETWORK MOCKING =====

/**
 * Ex 4.1: Mock an API response
 * TODO: Use page.route to intercept GET /api/v1/user-status and return status: 200 with { isPremium: true }
 */
test("network mock exercise", async ({ page }) => {
  // TODO: Write page.route handler here
});
