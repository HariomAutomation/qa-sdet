# 📘 Module 2.1 — Playwright Master Class

## Lesson 4: Page Object Model (POM) & Custom Fixtures Architecture

> **SDET Gold Standard:** Tests mein `new LoginPage(page)` likhna obsolete ho chuka hai. Playwright mein **Custom Fixture Dependency Injection** use kiya jaata hai!

---

## 1️⃣ Page Object Model (POM) Structure

```
src/
├── pages/
│   ├── BasePage.ts           ← Common navigation, URL checks, helpers
│   ├── LoginPage.ts          ← Login selectors & actions
│   ├── InventoryPage.ts      ← Product list, sorting, add to cart
│   └── CheckoutPage.ts       ← Checkout forms & order confirmation
├── components/
│   ├── HeaderComponent.ts    ← Cart badge, menu, logout
│   └── FooterComponent.ts    ← Social links, copyright
└── fixtures/
    └── testFixtures.ts       ← Custom fixture dependency injection
```

### Base Page Class
```typescript
import { Page, Locator, expect } from "@playwright/test";

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  async navigateTo(path: string = ""): Promise<void> {
    await this.page.goto(path);
  }

  async waitForPageLoaded(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyUrl(expectedPattern: RegExp | string): Promise<void> {
    await expect(this.page).toHaveURL(expectedPattern);
  }
}
```

### Clean Page Class Example (`LoginPage.ts`)
```typescript
import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByPlaceholder("Username");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.errorMessage = page.locator("[data-test='error']");
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyErrorMessage(expectedText: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedText);
  }
}
```

---

## 2️⃣ Custom Fixtures (Dependency Injection)

Custom fixtures se tests clean ho jaate hain aur har test ko automatically instantiated page objects milte hain:

```typescript
// fixtures/testFixtures.ts
import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CheckoutPage } from "../pages/CheckoutPage";

type MyPages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  checkoutPage: CheckoutPage;
  authenticatedUser: void; // Auto-fixture for pre-logged-in session
};

export const test = baseTest.extend<MyPages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  // Auto fixture that logs in before test and clears after test
  authenticatedUser: [
    async ({ loginPage, inventoryPage }, use) => {
      await loginPage.navigateTo("/");
      await loginPage.login("standard_user", "secret_sauce");
      await inventoryPage.verifyUrl(/.*inventory.html/);
      await use();
    },
    { auto: false }, // Set to true if you want every test to auto-login
  ],
});

export { expect } from "@playwright/test";
```

---

## 3️⃣ Clean Test Case Using Fixtures

```typescript
// tests/checkout.spec.ts
import { test, expect } from "../fixtures/testFixtures";

test.describe("Checkout Workflow", () => {
  test("user can purchase multiple products", async ({
    loginPage,
    inventoryPage,
    checkoutPage,
  }) => {
    // 1. Login
    await loginPage.navigateTo("/");
    await loginPage.login("standard_user", "secret_sauce");

    // 2. Add Products
    await inventoryPage.addProductToCart("Sauce Labs Backpack");
    await inventoryPage.addProductToCart("Sauce Labs Bike Light");
    await inventoryPage.goToCart();

    // 3. Complete Checkout
    await checkoutPage.startCheckout();
    await checkoutPage.fillShippingDetails("Hariom", "Singh", "110001");
    await checkoutPage.finishOrder();

    // 4. Verify
    await checkoutPage.verifyOrderSuccess();
  });
});
```
