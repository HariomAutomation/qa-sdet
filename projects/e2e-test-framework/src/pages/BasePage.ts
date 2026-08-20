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

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }
}
