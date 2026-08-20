# 📘 Module 2.1 — Playwright Master Class

## Lesson 2: Locators & User-First Selectors Deep Dive

> **Rule:** Never use fragile XPath like `//div[2]/span/button[1]`. Always use **User-First / Accessibility Locators**!

---

## 1️⃣ Priority Order for Locators (Official Playwright Recommendation)

```
1. page.getByRole()         ← 🥇 SABSE BEST (Accessibility / ARIA standard)
2. page.getByLabel()        ← 🥈 Form inputs with labels
3. page.getByPlaceholder()  ← 🥉 Search / text inputs
4. page.getByText()         ← Non-interactive static text
5. page.getByAltText()      ← Images & logos
6. page.getByTitle()        ← Tooltips / title attributes
7. page.getByTestId()       ← Dynamic complex UIs (data-testid="...")
8. page.locator("css/xpath")← 🛑 LAST RESORT ONLY
```

---

## 2️⃣ Deep Dive: `page.getByRole()`

Role selector accessibility tree ke hisaab se element dhundhta hai.

```typescript
// Buttons
page.getByRole("button", { name: "Submit" });
page.getByRole("button", { name: /submit/i }); // Case-insensitive Regex

// Inputs & Checkboxes
page.getByRole("textbox", { name: "Email Address" });
page.getByRole("checkbox", { name: "I accept Terms & Conditions" });
page.getByRole("radio", { name: "Male" });

// Headings & Links
page.getByRole("heading", { level: 1, name: "Dashboard" });
page.getByRole("link", { name: "Privacy Policy" });

// Dropdowns / ComboBox
page.getByRole("combobox", { name: "Select Country" });

// Dialogs & Modals
page.getByRole("dialog", { name: "Delete Confirmation" });
```

---

## 3️⃣ Locator Chaining & Advanced Filtering

Jab ek page par multiple similar elements hote hain, tab chaining & filtering use karte hain:

```typescript
// 1. Chaining (Child elements under a parent)
const card = page.locator(".product-card");
const cardTitle = card.getByRole("heading");
const cardButton = card.getByRole("button", { name: "Add to Cart" });

// 2. Filter by text (hasText)
const sauceBackpackCard = page
  .locator(".inventory_item")
  .filter({ hasText: "Sauce Labs Backpack" });

await sauceBackpackCard.getByRole("button", { name: "Add to cart" }).click();

// 3. Filter by inner child element (has)
const premiumUserRow = page
  .getByRole("row")
  .filter({ has: page.getByRole("badge", { name: "Premium" }) });

await premiumUserRow.getByRole("button", { name: "Edit" }).click();

// 4. Locating by index (Avoid if possible, but available)
page.locator(".product-item").first();
page.locator(".product-item").last();
page.locator(".product-item").nth(2); // 0-indexed
```

---

## 4️⃣ Advanced Interactions & Actions

Playwright actions perform karne se pehle **Auto-Waiting** karta hai (Visibility, Stability, Enabled, Editable).

```typescript
// 1. Mouse Clicks
await page.getByRole("button").click();
await page.getByRole("button").dblclick();
await page.getByRole("button").click({ button: "right" });
await page.getByRole("button").click({ modifiers: ["Shift"] });

// 2. Text Input
await page.getByPlaceholder("Enter Email").fill("test@example.com"); // Instantly clears and fills
await page.getByPlaceholder("Search").pressSequentially("Playwright", { delay: 100 }); // Types like real human

// 3. Checkboxes & Radio buttons
await page.getByRole("checkbox").check();
await page.getByRole("checkbox").uncheck();
const isChecked = await page.getByRole("checkbox").isChecked();

// 4. Dropdowns (Select Elements)
await page.getByRole("combobox").selectOption("lohi"); // by value
await page.getByRole("combobox").selectOption({ label: "Price (low to high)" }); // by visible text

// 5. File Uploads
await page.getByLabel("Upload Resume").setInputFiles("./test-data/resume.pdf");
// Multiple files
await page.locator("input[type=file]").setInputFiles(["./file1.png", "./file2.png"]);
// Clear file input
await page.locator("input[type=file]").setInputFiles([]);

// 6. Drag and Drop
await page.locator("#source-item").dragTo(page.locator("#target-dropzone"));

// 7. Keyboard actions
await page.keyboard.press("Enter");
await page.keyboard.press("Control+A");
await page.keyboard.press("Backspace");
```
