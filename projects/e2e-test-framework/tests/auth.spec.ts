import { test, expect } from "../src/fixtures/testFixtures.js";
import { TEST_USERS } from "../src/utils/testData.js";

test.describe("Authentication Scenarios", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test("valid user login succeeds and navigates to inventory", async ({ loginPage, inventoryPage }) => {
    await loginPage.login(TEST_USERS.standard.username, TEST_USERS.standard.password);
    await inventoryPage.verifyInventoryPageLoaded();
  });

  test("locked user displays access denied error", async ({ loginPage }) => {
    await loginPage.login(TEST_USERS.locked.username, TEST_USERS.locked.password);
    await loginPage.verifyErrorMessage("Epic sadface: Sorry, this user has been locked out.");
  });

  test("invalid credentials displays mismatch error", async ({ loginPage }) => {
    await loginPage.login(TEST_USERS.invalid.username, TEST_USERS.invalid.password);
    await loginPage.verifyErrorMessage("Epic sadface: Username and password do not match");
  });

  test("user can logout successfully", async ({ loginPage, inventoryPage }) => {
    await loginPage.login(TEST_USERS.standard.username, TEST_USERS.standard.password);
    await inventoryPage.verifyInventoryPageLoaded();
    await inventoryPage.header.logout();
    await loginPage.verifyUrl("https://www.saucedemo.com/");
  });
});
