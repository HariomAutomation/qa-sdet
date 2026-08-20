# 📘 Module 3.1 — Programming Concepts & Design Patterns

## Lesson 2: Design Patterns in Test Automation Frameworks

---

## 1️⃣ Creational Design Patterns

### 🏭 1. Factory Pattern (Browser & Driver Factory)
```typescript
export type BrowserType = "chromium" | "firefox" | "webkit";

export class BrowserFactory {
  static async createBrowser(type: BrowserType, options = { headless: true }) {
    switch (type) {
      case "chromium":
        return import("playwright").then(p => p.chromium.launch(options));
      case "firefox":
        return import("playwright").then(p => p.firefox.launch(options));
      case "webkit":
        return import("playwright").then(p => p.webkit.launch(options));
      default:
        throw new Error(`Unsupported browser type: ${type}`);
    }
  }
}
```

### 🔨 2. Builder Pattern (Test Scenario / Data Builder)
```typescript
export interface UserPayload {
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
  age: number;
}

export class UserBuilder {
  private user: UserPayload = {
    name: "Default User",
    email: `user_${Date.now()}@test.com`,
    role: "standard",
    isVerified: true,
    age: 25,
  };

  withName(name: string): this {
    this.user.name = name;
    return this;
  }

  asAdmin(): this {
    this.user.role = "admin";
    return this;
  }

  unverified(): this {
    this.user.isVerified = false;
    return this;
  }

  withAge(age: number): this {
    this.user.age = age;
    return this;
  }

  build(): UserPayload {
    return { ...this.user };
  }
}

// Fluent Usage:
const adminUser = new UserBuilder().withName("Hariom").asAdmin().withAge(30).build();
```

### 🔒 3. Singleton Pattern (Global Configuration Manager)
```typescript
export class ConfigManager {
  private static instance: ConfigManager;
  private readonly config: Record<string, any>;

  private constructor() {
    this.config = {
      baseUrl: process.env.BASE_URL || "https://saucedemo.com",
      timeout: Number(process.env.TIMEOUT || 30000),
      env: process.env.NODE_ENV || "test",
    };
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  public get(key: string): any {
    return this.config[key];
  }
}
```

---

## 2️⃣ Structural Design Patterns

### 🏛️ 1. Facade Pattern (High-Level Business Flow)
```typescript
export class PurchaseFlowFacade {
  constructor(
    private loginPage: any,
    private inventoryPage: any,
    private cartPage: any,
    private checkoutPage: any
  ) {}

  async buyProductsAsUser(user: { name: string; pass: string }, products: string[]) {
    await this.loginPage.goto();
    await this.loginPage.login(user.name, user.pass);
    for (const prod of products) {
      await this.inventoryPage.addProductToCart(prod);
    }
    await this.inventoryPage.header.openCart();
    await this.cartPage.proceedToCheckout();
    await this.checkoutPage.fillInformation("Hariom", "Singh", "110001");
    await this.checkoutPage.finishCheckout();
    await this.checkoutPage.verifyOrderSuccessful();
  }
}
```

---

## 3️⃣ Behavioral Design Patterns

### 🎯 1. Strategy Pattern (Pluggable Reporting / Auth)
```typescript
export interface ReportStrategy {
  sendReport(data: { suite: string; passed: number; failed: number }): Promise<void>;
}

export class SlackReportStrategy implements ReportStrategy {
  async sendReport(data: any): Promise<void> {
    console.log("Posting summary to #qa-automation Slack channel:", data);
  }
}

export class EmailReportStrategy implements ReportStrategy {
  async sendReport(data: any): Promise<void> {
    console.log("Sending HTML email report to stakeholders:", data);
  }
}
```

### 👁️ 2. Observer Pattern (Test Lifecycle Event Listener)
```typescript
type TestEvent = "test_start" | "test_pass" | "test_fail";
type Listener = (testName: string, event: TestEvent) => void;

export class TestLifecycleObserver {
  private listeners: Listener[] = [];

  subscribe(listener: Listener) {
    this.listeners.push(listener);
  }

  emit(testName: string, event: TestEvent) {
    this.listeners.forEach(l => l(testName, event));
  }
}
```
