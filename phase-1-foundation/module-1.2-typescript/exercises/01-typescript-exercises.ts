/**
 * ============================================================
 * 📝 Module 1.2 — TypeScript Exercises
 * ============================================================
 * Run: npx tsx exercises/01-typescript-exercises.ts
 * (ya tsc compile karke run karo)
 * ============================================================
 */

// ===== 1: BASIC TYPES =====

/** Ex 1.1 — Type a Config Object */
// TODO: Ek interface banao TestConfig with:
// - browser: "chromium" | "firefox" | "webkit"
// - headless: boolean
// - timeout: number
// - baseURL: string
// - viewport?: { width: number; height: number } (optional)
// - retries?: number (optional, default 0)

// interface TestConfig { ??? }

// const config: TestConfig = {
//   browser: "chromium",
//   headless: true,
//   timeout: 30000,
//   baseURL: "https://example.com",
// };

/** Ex 1.2 — Discriminated Union for Test Results */
// TODO: TestResult type banao with discriminated union:
// - { status: "passed"; duration: number }
// - { status: "failed"; duration: number; error: string; screenshot?: string }
// - { status: "skipped"; reason: string }

// type TestResult = ???;

// function printResult(result: TestResult): string {
//   switch (result.status) {
//     case "passed": return `✅ Passed in ${result.duration}ms`;
//     case "failed": return `❌ Failed: ${result.error}`;
//     case "skipped": return `⏭️ Skipped: ${result.reason}`;
//   }
// }

// ===== 2: GENERICS =====

/** Ex 2.1 — Generic API Response Handler */
// TODO: Generic types banao:
// type ApiResponse<T> = { status: number; data: T; timestamp: Date }
// type PaginatedResponse<T> = ApiResponse<T[]> & { page: number; totalPages: number }
//
// function handleResponse<T>(response: ApiResponse<T>): T {
//   if (response.status >= 400) throw new Error(`API Error: ${response.status}`);
//   return response.data;
// }

/** Ex 2.2 — Generic Repository Pattern */
// TODO: Generic Repository class banao:
// - items array (private)
// - add(item): void
// - findById(id): T | undefined
// - findAll(): T[]
// - update(id, partial): T | undefined
// - delete(id): boolean
// - count(): number

// interface HasId { id: string | number; }
// class Repository<T extends HasId> { ??? }

// ===== 3: UTILITY TYPES =====

/** Ex 3.1 — Utility Types Practice */
// Given:
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

// TODO: Create these types using utility types:
// type ProductPreview = ???          // Only: id, name, price
// type ProductUpdate = ???           // All fields optional EXCEPT id (required)
// type NewProduct = ???              // All fields EXCEPT id, createdAt, updatedAt
// type ProductCatalog = ???          // Record<category string, Product[]>

/** Ex 3.2 — Type-safe Event Emitter */
// TODO: Generic EventEmitter banao jo type-safe ho

// interface EventMap {
//   login: { userId: string; timestamp: Date };
//   logout: { userId: string };
//   error: { code: number; message: string };
//   pageView: { url: string; referrer?: string };
// }
//
// class TypedEventEmitter<T extends Record<string, any>> {
//   // on<K extends keyof T>(event: K, callback: (data: T[K]) => void): void
//   // emit<K extends keyof T>(event: K, data: T[K]): void
// }
//
// const emitter = new TypedEventEmitter<EventMap>();
// emitter.on("login", (data) => { /* data is { userId: string; timestamp: Date } */ });
// emitter.emit("login", { userId: "123", timestamp: new Date() }); // ✅
// emitter.emit("login", { wrong: "field" }); // ❌ Compile error!

// ===== 4: TYPE GUARDS =====

/** Ex 4.1 — Custom Type Guards */
// TODO: Type guard functions banao:

// function isString(value: unknown): value is string { ??? }
// function isNonEmpty<T>(arr: T[] | null | undefined): arr is T[] { ??? }
// function hasProperty<T extends object, K extends string>(
//   obj: T, prop: K
// ): obj is T & Record<K, unknown> { ??? }

// ===== 5: COMBINED CHALLENGE =====

/** Ex 5.1 — Build a Type-Safe Test Data Factory 🏆 */
// TODO: Ek factory banao jo type-safe test data generate kare
//
// Usage should look like:
// const factory = createFactory<User>({
//   id: () => Math.floor(Math.random() * 1000),
//   name: () => "Test User",
//   email: () => `user${Date.now()}@test.com`,
//   role: () => "user",
// });
//
// const user = factory.build();                    // Full user with defaults
// const admin = factory.build({ role: "admin" });  // Override specific fields
// const users = factory.buildMany(5);              // Array of 5 users

console.log("╔══════════════════════════════════════════╗");
console.log("║  Module 1.2 — TypeScript Exercises       ║");
console.log("╚══════════════════════════════════════════╝");
console.log("\nOpen this file and implement the TODOs!");
console.log("Run with: npx tsx exercises/01-typescript-exercises.ts");
