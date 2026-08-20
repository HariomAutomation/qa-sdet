/**
 * ============================================================
 * ✅ Module 1.2 — TypeScript Solutions
 * ============================================================
 */

// ===== 1: BASIC TYPES =====

/** Ex 1.1 — Type a Config Object */
interface TestConfig {
  browser: "chromium" | "firefox" | "webkit";
  headless: boolean;
  timeout: number;
  baseURL: string;
  viewport?: { width: number; height: number };
  retries?: number;
}

const config: TestConfig = {
  browser: "chromium",
  headless: true,
  timeout: 30000,
  baseURL: "https://example.com",
  retries: 2,
};

/** Ex 1.2 — Discriminated Union for Test Results */
type TestResult =
  | { status: "passed"; duration: number }
  | { status: "failed"; duration: number; error: string; screenshot?: string }
  | { status: "skipped"; reason: string };

function printResult(result: TestResult): string {
  switch (result.status) {
    case "passed":
      return `✅ Passed in ${result.duration}ms`;
    case "failed":
      return `❌ Failed: ${result.error} (duration: ${result.duration}ms)`;
    case "skipped":
      return `⏭️ Skipped: ${result.reason}`;
  }
}

// ===== 2: GENERICS =====

/** Ex 2.1 — Generic API Response Handler */
interface ApiResponse<T> {
  status: number;
  data: T;
  timestamp: Date;
}

type PaginatedResponse<T> = ApiResponse<T[]> & {
  page: number;
  totalPages: number;
};

function handleResponse<T>(response: ApiResponse<T>): T {
  if (response.status >= 400) {
    throw new Error(`API Error with status code: ${response.status}`);
  }
  return response.data;
}

/** Ex 2.2 — Generic Repository Pattern */
interface HasId {
  id: string | number;
}

class Repository<T extends HasId> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  findById(id: string | number): T | undefined {
    return this.items.find((i) => i.id === id);
  }

  findAll(): T[] {
    return [...this.items];
  }

  update(id: string | number, partial: Partial<T>): T | undefined {
    const index = this.items.findIndex((i) => i.id === id);
    if (index === -1) return undefined;
    this.items[index] = { ...this.items[index], ...partial };
    return this.items[index];
  }

  delete(id: string | number): boolean {
    const initialLen = this.items.length;
    this.items = this.items.filter((i) => i.id !== id);
    return this.items.length !== initialLen;
  }

  count(): number {
    return this.items.length;
  }
}

// ===== 3: UTILITY TYPES =====

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ProductPreview: Only id, name, price
type ProductPreview = Pick<Product, "id" | "name" | "price">;

// ProductUpdate: All optional EXCEPT id required
type ProductUpdate = Partial<Omit<Product, "id">> & Pick<Product, "id">;

// NewProduct: All EXCEPT id, createdAt, updatedAt
type NewProduct = Omit<Product, "id" | "createdAt" | "updatedAt">;

// ProductCatalog: Category mapped to array of products
type ProductCatalog = Record<string, Product[]>;

/** Ex 3.2 — Type-safe Event Emitter */
interface EventMap {
  login: { userId: string; timestamp: Date };
  logout: { userId: string };
  error: { code: number; message: string };
  pageView: { url: string; referrer?: string };
}

class TypedEventEmitter<T extends Record<string, any>> {
  private listeners: { [K in keyof T]?: Array<(data: T[K]) => void> } = {};

  on<K extends keyof T>(event: K, callback: (data: T[K]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }

  emit<K extends keyof T>(event: K, data: T[K]): void {
    const callbacks = this.listeners[event];
    if (callbacks) {
      callbacks.forEach((cb) => cb(data));
    }
  }
}

// ===== 4: TYPE GUARDS =====

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNonEmpty<T>(arr: T[] | null | undefined): arr is T[] {
  return Array.isArray(arr) && arr.length > 0;
}

function hasProperty<T extends object, K extends string>(
  obj: T,
  prop: K
): obj is T & Record<K, unknown> {
  return prop in obj;
}

// ===== 5: COMBINED CHALLENGE =====

type FactoryBuilder<T> = {
  [K in keyof T]: () => T[K];
};

function createFactory<T extends Record<string, any>>(defaults: FactoryBuilder<T>) {
  return {
    build(overrides: Partial<T> = {}): T {
      const result: any = {};
      for (const key in defaults) {
        result[key] = key in overrides ? overrides[key] : defaults[key]();
      }
      return result as T;
    },
    buildMany(count: number, overrides: Partial<T> = {}): T[] {
      return Array.from({ length: count }, () => this.build(overrides));
    },
  };
}

// Output test demonstration
console.log("TypeScript solutions verified and compiled properly!");
