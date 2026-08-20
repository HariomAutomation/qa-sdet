# 📘 Module 2.1 — Playwright Master Class

## Lesson 3: Assertions, Soft Assertions & Asynchronous Handling

> **Web-First Assertions:** Playwright ke assertions tab tak auto-retry karte hain jab tak condition meet na ho ya timeout na ho jaye. Manual `sleep()` ya `waitForTimeout()` kabhi mat use karo!

---

## 1️⃣ Web-First Assertions vs Generic Assertions

```typescript
// ❌ WRONG (Generic assertion — NO auto-retry, causes flakiness)
const isVisible = await page.getByRole("button").isVisible();
expect(isVisible).toBe(true); // If DOM takes 200ms to render, this fails immediately!

// ✅ RIGHT (Web-First assertion — AUTO-RETRIES until timeout)
await expect(page.getByRole("button")).toBeVisible();
```

---

## 2️⃣ Essential Web-First Assertions

```typescript
// Visibility & State
await expect(page.getByText("Welcome")).toBeVisible();
await expect(page.getByRole("dialog")).toBeHidden();
await expect(page.getByRole("button", { name: "Submit" })).toBeEnabled();
await expect(page.getByRole("button", { name: "Submit" })).toBeDisabled();
await expect(page.getByRole("checkbox")).toBeChecked();

// Text & Value
await expect(page.getByRole("heading")).toHaveText("Dashboard");
await expect(page.getByRole("heading")).toContainText("Dash");
await expect(page.getByPlaceholder("Username")).toHaveValue("standard_user");

// URL & Title
await expect(page).toHaveURL("https://example.com/checkout");
await expect(page).toHaveURL(/.*checkout/); // Regex match
await expect(page).toHaveTitle("Swag Labs");

// Count & Attributes
await expect(page.locator(".inventory_item")).toHaveCount(6);
await expect(page.getByRole("link")).toHaveAttribute("href", "/about");
await expect(page.locator("#banner")).toHaveClass(/active-banner/);
```

---

## 3️⃣ Soft Assertions (`expect.soft`)

Soft assertions use karne se agar assertion fail bhi ho, toh test turant terminate nahi hota — baki test execute hota hai aur end mein failures report hote hain.

```typescript
test("verify user profile details", async ({ page }) => {
  await page.goto("/profile");

  // Soft assertions — teeno run honge even if one fails
  await expect.soft(page.getByTestId("user-name")).toHaveText("Hariom Singh");
  await expect.soft(page.getByTestId("user-role")).toHaveText("Senior SDET");
  await expect.soft(page.getByTestId("user-email")).toHaveText("hariom@corp.com");

  // Test ke end mein Playwright saare failed soft assertions summarize karega
});
```

---

## 4️⃣ Handling Dialogs, Iframes & Popups

### Dialogs (Alert, Confirm, Prompt)
```typescript
// Listener pehle register karo, action baad mein
page.on("dialog", async (dialog) => {
  console.log("Dialog message:", dialog.message());
  await dialog.accept("Optional prompt input"); // ya: await dialog.dismiss();
});

await page.getByRole("button", { name: "Trigger Alert" }).click();
```

### Iframes (`frameLocator`)
```typescript
// Playwright automatically frame ke andar elements locate karta hai
const iframe = page.frameLocator("#payment-frame");
await iframe.getByPlaceholder("Card Number").fill("4242424242424242");
await iframe.getByRole("button", { name: "Pay Now" }).click();
```

### Multi-Tabs & Popups
```typescript
// Popup open hone ka wait karo
const [newPage] = await Promise.all([
  context.waitForEvent("page"),
  page.getByRole("link", { name: "Open Terms in new tab" }).click(),
]);

await newPage.waitForLoadState();
await expect(newPage).toHaveTitle("Terms and Conditions");
await newPage.close();
```
