# 📘 Module 2.1 — Playwright Master Class

## Lesson 6: Parallelism, Sharding, Debugging & Enterprise Reporting

---

## 1️⃣ Parallelism & Test Isolation

Playwright by default har test file ko parallel workers mein execute karta hai.

```typescript
// Ek hi file ke andar tests parallel run karne ke liye
test.describe.configure({ mode: "parallel" });

test.describe("Parallel Tests", () => {
  test("test 1", async ({ page }) => { /* ... */ });
  test("test 2", async ({ page }) => { /* ... */ });
});

// Dependent sequential tests (e.g. multistep transactional flow)
test.describe.configure({ mode: "serial" });
test.describe("Serial Suite", () => {
  test("step 1: create resource", async ({ page }) => { /* ... */ });
  test("step 2: update resource", async ({ page }) => { /* ... */ });
});
```

---

## 2️⃣ Test Sharding in CI (Distribute tests across multiple CI machines)

Agar aapke paas 500 tests hain aur execution time 30 mins hai, toh sharding se usse 4 machines mein divide karke **~7 mins** mein run kar sakte hain!

```bash
# Machine 1:
npx playwright test --shard=1/4
# Machine 2:
npx playwright test --shard=2/4
# Machine 3:
npx playwright test --shard=3/4
# Machine 4:
npx playwright test --shard=4/4
```

---

## 3️⃣ Debugging Arsenal 🛠️

### 1. Trace Viewer (Best Debugger in the Industry)
Trace viewer har action ka DOM snapshot, console logs, network requests, timings, aur visual screencast record karta hai.
```bash
# Run with trace enabled
npx playwright test --trace on

# View trace file
npx playwright show-trace test-results/trace.zip
```

### 2. Playwright UI Mode
```bash
npx playwright test --ui
```

### 3. Interactive Debugging & Codegen
```bash
# Debug specific test step-by-step
npx playwright test tests/login.spec.ts --debug

# Auto-generate test code while clicking in browser
npx playwright codegen https://www.saucedemo.com
```

---

## 4️⃣ Allure Reporting Integration

```bash
npm install -D allure-playwright allure-commandline
```

`playwright.config.ts` configuration:
```typescript
reporter: [
  ["list"],
  ["allure-playwright", { outputFolder: "allure-results" }],
],
```

Generate and open report:
```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```
