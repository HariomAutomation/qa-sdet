import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class CartPage extends BasePage {
  private readonly cartItems: Locator;
  private readonly checkoutButton: Locator;
  private readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator(".cart_item");
    this.checkoutButton = page.locator("[data-test='checkout']");
    this.continueShoppingButton = page.locator("[data-test='continue-shopping']");
  }

  async verifyOnCartPage(): Promise<void> {
    await this.verifyUrl(/.*cart.html/);
  }

  async getCartItemNames(): Promise<string[]> {
    return this.page.locator(".inventory_item_name").allTextContents();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }
}
