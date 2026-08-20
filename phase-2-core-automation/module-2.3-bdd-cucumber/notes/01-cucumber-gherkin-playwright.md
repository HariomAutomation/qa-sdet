# 📘 Module 2.3 — BDD with Cucumber & Playwright

## Lesson 1: Gherkin Syntax, Step Definitions & Playwright Integration

---

## 1️⃣ Gherkin Syntax Deep Dive

```gherkin
@regression @checkout
Feature: E-Commerce Product Purchasing
  As a registered user
  I want to add items to my shopping cart
  So that I can complete a purchase successfully

  Background:
    Given user is on the login page
    And user logs in with username "standard_user" and password "secret_sauce"

  @smoke @critical
  Scenario: Purchase standard backpack
    When user adds "Sauce Labs Backpack" to the cart
    And user proceeds to checkout
    And user enters shipping details:
      | firstName | lastName | postalCode |
      | Hariom    | Singh    | 110001     |
    And user clicks finish
    Then order confirmation message "Thank you for your order!" should be displayed

  Scenario Outline: Multiple items checkout pricing calculation
    When user adds item "<item>" with quantity <qty>
    Then subtotal should be "<subtotal>"

    Examples:
      | item               | qty | subtotal |
      | Sauce Labs Onesie  | 1   | $7.99    |
      | Sauce Labs Fleece  | 2   | $99.98   |
```

---

## 2️⃣ Step Definitions with Playwright

```typescript
import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";

Given("user is on the login page", async function () {
  await this.page.goto("https://www.saucedemo.com");
});

When("user logs in with username {string} and password {string}", async function (username, password) {
  await this.page.getByPlaceholder("Username").fill(username);
  await this.page.getByPlaceholder("Password").fill(password);
  await this.page.getByRole("button", { name: "Login" }).click();
});

When("user adds {string} to the cart", async function (productName) {
  const item = this.page.locator(".inventory_item").filter({ hasText: productName });
  await item.getByRole("button", { name: "Add to cart" }).click();
});

Then("order confirmation message {string} should be displayed", async function (expectedMsg) {
  await expect(this.page.locator(".complete-header")).toContainText(expectedMsg);
});
```

---

## 3️⃣ Cucumber Hooks & World Context (`hooks.ts`)

```typescript
import { Before, After, Status } from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext, Page } from "playwright";

declare module "@cucumber/cucumber" {
  interface World {
    browser: Browser;
    context: BrowserContext;
    page: Page;
  }
}

Before(async function () {
  this.browser = await chromium.launch({ headless: true });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function ({ result }) {
  if (result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, "image/png");
  }
  await this.page.close();
  await this.context.close();
  await this.browser.close();
});
```
