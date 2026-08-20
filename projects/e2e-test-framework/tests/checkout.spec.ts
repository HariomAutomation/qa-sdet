import { test, expect } from "../src/fixtures/testFixtures.js";
import { PRODUCTS } from "../src/utils/testData.js";

test.describe("Checkout & Order Workflow Scenarios", () => {
  test("complete end-to-end purchasing workflow", async ({
    authenticatedUser,
    cartPage,
    checkoutPage,
  }) => {
    // 1. Select products
    await authenticatedUser.addProductToCart(PRODUCTS.backpack);
    await authenticatedUser.addProductToCart(PRODUCTS.boltTShirt);
    await authenticatedUser.header.openCart();

    // 2. Cart verification
    await cartPage.verifyOnCartPage();
    const items = await cartPage.getCartItemNames();
    expect(items).toContain(PRODUCTS.backpack);
    expect(items).toContain(PRODUCTS.boltTShirt);
    await cartPage.proceedToCheckout();

    // 3. Complete checkout
    await checkoutPage.fillInformation("Hariom", "Singh", "110001");
    await checkoutPage.finishCheckout();

    // 4. Verify order completion
    await checkoutPage.verifyOrderSuccessful();
  });
});
