import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../hooks/world.js";

Given("user navigates to the login portal", async function (this: CustomWorld) {
  await this.page.goto("/");
});

When("user inputs username {string} and password {string}", async function (this: CustomWorld, username, password) {
  await this.page.getByPlaceholder("Username").fill(username);
  await this.page.getByPlaceholder("Password").fill(password);
});

When("user clicks the login button", async function (this: CustomWorld) {
  await this.page.getByRole("button", { name: "Login" }).click();
});

Then("user should be redirected to the inventory catalog page", async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(/.*inventory.html/);
});

Then("error banner should display {string}", async function (this: CustomWorld, expectedMsg) {
  const errorLocator = this.page.locator("[data-test='error']");
  await expect(errorLocator).toBeVisible();
  await expect(errorLocator).toContainText(expectedMsg);
});
