import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage.js";
import { HeaderComponent } from "../components/HeaderComponent.js";

export class InventoryPage extends BasePage {
  public readonly header: HeaderComponent;
  private readonly sortDropdown: Locator;
  private readonly inventoryItems: Locator;
  private readonly itemPrices: Locator;
  private readonly itemNames: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.sortDropdown = page.locator("[data-test='product-sort-container']");
    this.inventoryItems = page.locator(".inventory_item");
    this.itemPrices = page.locator(".inventory_item_price");
    this.itemNames = page.locator(".inventory_item_name");
  }

  async verifyInventoryPageLoaded(): Promise<void> {
    await this.verifyUrl(/.*inventory.html/);
    await expect(this.inventoryItems.first()).toBeVisible();
  }

  async getItemCount(): Promise<number> {
    return this.inventoryItems.count();
  }

  async addProductToCart(productName: string): Promise<void> {
    const itemCard = this.inventoryItems.filter({ hasText: productName });
    await itemCard.getByRole("button", { name: "Add to cart" }).click();
  }

  async removeProductFromCart(productName: string): Promise<void> {
    const itemCard = this.inventoryItems.filter({ hasText: productName });
    await itemCard.getByRole("button", { name: "Remove" }).click();
  }

  async sortBy(optionValue: "az" | "za" | "lohi" | "hilo"): Promise<void> {
    await this.sortDropdown.selectOption(optionValue);
  }

  async getAllPrices(): Promise<number[]> {
    const priceTexts = await this.itemPrices.allTextContents();
    return priceTexts.map((txt) => Number(txt.replace("$", "").trim()));
  }

  async getAllProductNames(): Promise<string[]> {
    return this.itemNames.allTextContents();
  }
}
