import { Given, When, Then, DataTable } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../hooks/world.js";

Given("user logs in as {string} with password {string}", async function (this: CustomWorld, user, pass) {
  await this.page.goto("/");
  await this.page.getByPlaceholder("Username").fill(user);
  await this.page.getByPlaceholder("Password").fill(pass);
  await this.page.getByRole("button", { name: "Login" }).click();
  await expect(this.page).toHaveURL(/.*inventory.html/);
});

When("user adds {string} to the shopping cart", async function (this: CustomWorld, productName) {
  const item = this.page.locator(".inventory_item").filter({ hasText: productName });
  await item.getByRole("button", { name: "Add to cart" }).click();
});

When("user opens the shopping cart", async function (this: CustomWorld) {
  await this.page.locator(".shopping_cart_link").click();
});

When("user proceeds to the checkout step", async function (this: CustomWorld) {
  await this.page.locator("[data-test='checkout']").click();
});

When("user enters shipping information:", async function (this: CustomWorld, dataTable: DataTable) {
  const [row] = dataTable.hashes();
  await this.page.getByPlaceholder("First Name").fill(row.firstName);
  await this.page.getByPlaceholder("Last Name").fill(row.lastName);
  await this.page.getByPlaceholder("Zip/Postal Code").fill(row.postalCode);
  await this.page.getByRole("button", { name: "Continue" }).click();
});

When("user confirms the order", async function (this: CustomWorld) {
  await this.page.getByRole("button", { name: "Finish" }).click();
});

Then("success message {string} should be displayed", async function (this: CustomWorld, message) {
  const completeHeader = this.page.locator(".complete-header");
  await expect(completeHeader).toBeVisible();
  await expect(completeHeader).toContainText(message);
});
