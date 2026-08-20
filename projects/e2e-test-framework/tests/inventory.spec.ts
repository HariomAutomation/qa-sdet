import { test, expect } from "../src/fixtures/testFixtures.js";
import { PRODUCTS } from "../src/utils/testData.js";

test.describe("Inventory & Catalog Scenarios", () => {
  test("displays 6 products by default", async ({ authenticatedUser }) => {
    const count = await authenticatedUser.getItemCount();
    expect(count).toBe(6);
  });

  test("sorts products by price low to high correctly", async ({ authenticatedUser }) => {
    await authenticatedUser.sortBy("lohi");
    const prices = await authenticatedUser.getAllPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test("sorts products by name A to Z correctly", async ({ authenticatedUser }) => {
    await authenticatedUser.sortBy("az");
    const names = await authenticatedUser.getAllProductNames();
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sorted);
  });

  test("updates cart badge dynamically on product addition and removal", async ({ authenticatedUser }) => {
    await authenticatedUser.header.verifyCartCount(0);

    // Add first item
    await authenticatedUser.addProductToCart(PRODUCTS.backpack);
    await authenticatedUser.header.verifyCartCount(1);

    // Add second item
    await authenticatedUser.addProductToCart(PRODUCTS.bikeLight);
    await authenticatedUser.header.verifyCartCount(2);

    // Remove one item
    await authenticatedUser.removeProductFromCart(PRODUCTS.backpack);
    await authenticatedUser.header.verifyCartCount(1);
  });
});
