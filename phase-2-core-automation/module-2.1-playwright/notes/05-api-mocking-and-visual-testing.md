# 📘 Module 2.1 — Playwright Master Class

## Lesson 5: Network Interception, Mocking & Visual Regression Testing

---

## 1️⃣ Network Interception & API Mocking (`page.route`)

Network mocking se frontend UI ko isolated backend states (slow network, 500 internal errors, custom mock data) ke saath test kiya ja sakta hai.

```typescript
// 1. Mock API response with custom JSON
test("mock product list with custom discount price", async ({ page }) => {
  await page.route("**/api/v1/products", async (route) => {
    const mockProducts = [
      { id: 101, name: "VIP Test Item", price: 9.99, inStock: true },
    ];
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockProducts),
    });
  });

  await page.goto("/inventory");
  await expect(page.getByText("VIP Test Item")).toBeVisible();
});

// 2. Simulate 500 Server Error to test error boundary UI
test("handle 500 error gracefully", async ({ page }) => {
  await page.route("**/api/v1/checkout", (route) => {
    route.fulfill({
      status: 500,
      body: JSON.stringify({ error: "Payment Gateway Down" }),
    });
  });

  await page.goto("/checkout");
  await page.getByRole("button", { name: "Pay" }).click();
  await expect(page.getByText("Payment Gateway Down")).toBeVisible();
});

// 3. Abort network calls (e.g. block image/analytics tracking)
test("block tracking scripts for faster execution", async ({ page }) => {
  await page.route("**/*.{png,jpg,jpeg,svg}", (route) => route.abort());
  await page.goto("/dashboard");
});
```

---

## 2️⃣ Visual Regression Testing (`toHaveScreenshot`)

Playwright pixel-by-pixel comparison karta hai baseline screenshot se.

```typescript
test("homepage visual regression snapshot", async ({ page }) => {
  await page.goto("/");

  // Full page screenshot comparison
  await expect(page).toHaveScreenshot("homepage-baseline.png", {
    fullPage: true,
    maxDiffPixelRatio: 0.02, // 2% tolerance for minor anti-aliasing
    animations: "disabled",  // CSS animations freeze karo
    mask: [page.locator(".dynamic-timestamp")], // Dynamic fields mask karo
  });

  // Specific component visual test
  const checkoutCard = page.locator("#checkout-summary");
  await expect(checkoutCard).toHaveScreenshot("checkout-card.png");
});
```

> **CLI Command to update baseline snapshots:**
> `npx playwright test --update-snapshots`

---

## 3️⃣ Combined API + UI Hybrid Testing

Playwright ka built-in `request` fixture direct HTTP requests execute kar sakta hai without browser overhead.

```typescript
test("create product via API and verify in UI", async ({ request, page }) => {
  // 1. Fast API setup
  const apiRes = await request.post("/api/products", {
    data: { name: "Playwright SDET Course", price: 499 },
    headers: { Authorization: "Bearer test_token" },
  });
  expect(apiRes.status()).toBe(201);
  const created = await apiRes.json();

  // 2. Fast UI verification
  await page.goto(`/products/${created.id}`);
  await expect(page.getByRole("heading", { name: "Playwright SDET Course" })).toBeVisible();
});
```
