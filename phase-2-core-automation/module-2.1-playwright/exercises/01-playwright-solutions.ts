/**
 * ============================================================
 * ✅ Module 2.1 — Playwright Master Class Solutions
 * ============================================================
 */

import { test, expect, Page, Locator } from "@playwright/test";

// ===== SECTION 1: LOCATOR CHALLENGES =====

// Ex 1.1: User-First Locators
// Old: page.locator("//button[contains(text(), 'Login')]")
// New: page.getByRole("button", { name: /login/i });

// Old: page.locator("input[name='email']")
// New: page.getByLabel("Email") OR page.getByPlaceholder("Email");

// Old: page.locator(".success-banner h1")
// New: page.getByRole("heading", { level: 1, name: "Success" });

// ===== SECTION 2: AUTO-WAITING & ASSERTIONS =====

test("stable web-first assertion", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  // Web-First Auto-Retrying Assertion:
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});

// ===== SECTION 3: POM & FIXTURE DESIGN =====

export class SearchComponent {
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly resultItems: Locator;

  constructor(private readonly page: Page) {
    this.searchInput = page.getByPlaceholder("Search...");
    this.searchButton = page.getByRole("button", { name: "Search" });
    this.resultItems = page.locator(".search-result-item");
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  async verifyResultCount(expectedMin: number): Promise<void> {
    await expect(this.resultItems.first()).toBeVisible();
    const count = await this.resultItems.count();
    expect(count).toBeGreaterThanOrEqual(expectedMin);
  }
}

// ===== SECTION 4: NETWORK MOCKING =====

test("mock user status API", async ({ page }) => {
  await page.route("**/api/v1/user-status", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ isPremium: true, role: "VIP" }),
    });
  });
});
