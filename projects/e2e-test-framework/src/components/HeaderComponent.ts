import { Page, Locator, expect } from "@playwright/test";

export class HeaderComponent {
  private readonly cartIcon: Locator;
  private readonly cartBadge: Locator;
  private readonly menuButton: Locator;
  private readonly logoutLink: Locator;

  constructor(private readonly page: Page) {
    this.cartIcon = page.locator(".shopping_cart_link");
    this.cartBadge = page.locator(".shopping_cart_badge");
    this.menuButton = page.getByRole("button", { name: "Open Menu" });
    this.logoutLink = page.locator("#logout_sidebar_link");
  }

  async openCart(): Promise<void> {
    await this.cartIcon.click();
  }

  async getCartCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      const text = await this.cartBadge.textContent();
      return Number(text?.trim() || 0);
    }
    return 0;
  }

  async verifyCartCount(expectedCount: number): Promise<void> {
    if (expectedCount === 0) {
      await expect(this.cartBadge).toBeHidden();
    } else {
      await expect(this.cartBadge).toBeVisible();
      await expect(this.cartBadge).toHaveText(String(expectedCount));
    }
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
