import { test, expect } from "../src/fixtures/testFixtures.js";

test.describe("Network Interception & Image Mocking", () => {
  test("aborts image loading to accelerate test execution", async ({ page, loginPage }) => {
    let blockedCount = 0;

    await page.route("**/*.{png,jpg,jpeg,svg}", (route) => {
      blockedCount++;
      route.abort();
    });

    await loginPage.goto();
    expect(blockedCount).toBeGreaterThanOrEqual(1);
  });
});
