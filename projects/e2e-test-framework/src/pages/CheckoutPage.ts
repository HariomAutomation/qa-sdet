import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class CheckoutPage extends BasePage {
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly finishButton: Locator;
  private readonly completeHeader: Locator;
  private readonly itemTotalLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.getByPlaceholder("First Name");
    this.lastNameInput = page.getByPlaceholder("Last Name");
    this.postalCodeInput = page.getByPlaceholder("Zip/Postal Code");
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.finishButton = page.getByRole("button", { name: "Finish" });
    this.completeHeader = page.locator(".complete-header");
    this.itemTotalLabel = page.locator(".summary_subtotal_label");
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
  }

  async verifyOrderSuccessful(): Promise<void> {
    await this.verifyUrl(/.*checkout-complete.html/);
    await expect(this.completeHeader).toBeVisible();
    await expect(this.completeHeader).toHaveText(/thank you for your order/i);
  }
}
