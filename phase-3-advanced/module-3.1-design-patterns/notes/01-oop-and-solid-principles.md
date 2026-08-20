# 📘 Module 3.1 — Programming Concepts & Design Patterns

## Lesson 1: OOP & SOLID Principles in Test Automation

> **Senior SDET Differentiator:** Senior engineers sirf tests nahi likhte — wo scalable, maintainable aur decoupled test architectures design karte hain.

---

## 1️⃣ OOP Principles in TypeScript

```typescript
// 1. ABSTRACTION — Expose clean interface, hide complex driver interactions
export interface ElementActions {
  click(): Promise<void>;
  type(text: string): Promise<void>;
  getText(): Promise<string>;
}

// 2. ENCAPSULATION — Keep internal driver locators private
export class Button implements ElementActions {
  constructor(private readonly locator: any) {}

  async click(): Promise<void> {
    console.log("Clicking button...");
    await this.locator.click();
  }

  async type(text: string): Promise<void> {
    throw new Error("Cannot type into a standard button");
  }

  async getText(): Promise<string> {
    return this.locator.textContent();
  }
}

// 3. INHERITANCE — Base Page providing shared lifecycle & telemetry
export abstract class BaseComponent {
  constructor(protected readonly rootSelector: string) {}

  abstract render(): Promise<void>;
}

// 4. POLYMORPHISM — Multiple browser driver implementations sharing single interface
export interface IBrowserDriver {
  launch(): Promise<void>;
  close(): Promise<void>;
}

export class ChromiumDriver implements IBrowserDriver {
  async launch(): Promise<void> { console.log("Launching Chromium via CDP"); }
  async close(): Promise<void> { console.log("Closing Chromium"); }
}

export class FirefoxDriver implements IBrowserDriver {
  async launch(): Promise<void> { console.log("Launching Firefox via Marionette"); }
  async close(): Promise<void> { console.log("Closing Firefox"); }
}
```

---

## 2️⃣ SOLID Principles Applied to Test Frameworks

### 1. S — Single Responsibility Principle (SRP)
*Har class ka sirf ek hi reason to change hona chahiye.*
- ❌ **Anti-pattern:** `LoginPage` jo login bhi kare, database mein user verify bhi kare, aur Slack par notification bhi bheje.
- ✅ **Pattern:** `LoginPage` sirf UI actions handle kare, `UserDbService` database handle kare, `SlackNotifier` alerts handle kare.

### 2. O — Open/Closed Principle (OCP)
*Classes open for extension honi chahiye, closed for modification.*
```typescript
// Test Reporter interface
export interface ITestReporter {
  report(testName: string, status: "PASSED" | "FAILED", durationMs: number): void;
}

// Naya reporter add karne ke liye existing code ko modify karne ki zaroorat nahi!
export class HtmlReporter implements ITestReporter {
  report(name: string, status: string, duration: number): void {
    console.log(`[HTML Report] ${name} -> ${status}`);
  }
}

export class SlackReporter implements ITestReporter {
  report(name: string, status: string, duration: number): void {
    console.log(`[Slack Webhook] Alert: ${name} -> ${status}`);
  }
}
```

### 3. L — Liskov Substitution Principle (LSP)
*Derived classes apne base class ki jagah seamlessly replace ho sakni chahiye without breaking behavior.*

### 4. I — Interface Segregation Principle (ISP)
*Bade bloated interfaces banane ke bajaye chhote, focused interfaces banao.*
```typescript
// ❌ Bloated
interface BadElement {
  click(): void;
  type(val: string): void;
  selectDropdown(val: string): void;
  uploadFile(path: string): void;
}

// ✅ Segregated
interface Clickable { click(): Promise<void>; }
interface TextInput { type(val: string): Promise<void>; }
interface Selectable { selectOption(val: string): Promise<void>; }
```

### 5. D — Dependency Inversion Principle (DIP)
*High-level modules should depend on abstractions (interfaces), not concrete implementations.*
```typescript
export class TestRunner {
  // Depends on abstraction ITestReporter, not concrete SlackReporter or HtmlReporter!
  constructor(private readonly reporters: ITestReporter[]) {}

  notify(testName: string, status: "PASSED" | "FAILED", duration: number) {
    this.reporters.forEach(r => r.report(testName, status, duration));
  }
}
```
