# 📋 Playwright Master Class — Quick Cheatsheet

## Locators Priority
```typescript
page.getByRole("button", { name: "Submit" });
page.getByLabel("Email Address");
page.getByPlaceholder("Search...");
page.getByText("Welcome User");
page.getByTestId("checkout-btn");
```

## Chaining & Filtering
```typescript
page.locator(".card").filter({ hasText: "Pro Plan" }).getByRole("button").click();
page.getByRole("row").filter({ has: page.getByRole("checkbox") });
```

## Actions
```typescript
await page.getByRole("button").click();
await page.getByPlaceholder("Name").fill("Hariom");
await page.getByRole("combobox").selectOption("delhi");
await page.getByLabel("Terms").check();
await page.getByLabel("Upload").setInputFiles("./resume.pdf");
await page.locator("#drag").dragTo(page.locator("#drop"));
```

## Web-First Assertions
```typescript
await expect(page.getByRole("button")).toBeVisible();
await expect(page.getByRole("heading")).toHaveText("Dashboard");
await expect(page.getByPlaceholder("Age")).toHaveValue("25");
await expect(page).toHaveURL(/.*dashboard/);
await expect(page.locator(".item")).toHaveCount(5);
await expect.soft(page.getByTestId("status")).toHaveText("Active");
```

## Network Mocking
```typescript
await page.route("**/api/users", route => {
  route.fulfill({
    status: 200,
    body: JSON.stringify([{ id: 1, name: "Mocked User" }]),
  });
});
```

## Useful CLI Commands
```bash
npx playwright test                      # Run all tests
npx playwright test --ui                 # Interactive UI mode
npx playwright test --headed             # Run in visible browser
npx playwright test --debug              # Step-by-step inspector
npx playwright codegen https://url.com   # Record test interactions
npx playwright show-trace trace.zip      # View complete trace
```
