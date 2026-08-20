# 📘 Module 1.2 — TypeScript Mastery

## Part 1: Basics to Intermediate (Types, Interfaces, Generics)

> **Time:** ~6-8 hours total  
> **Goal:** TypeScript confident use karna — SDET frameworks mein TS mandatory hai

---

## 1️⃣ Basic Types

```typescript
// Primitive types
let name: string = "Hariom";
let age: number = 25;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;

// Arrays
let scores: number[] = [90, 85, 95];
let names: Array<string> = ["Hariom", "Rahul"]; // Generic syntax

// Tuple — fixed length, fixed types
let pair: [string, number] = ["Hariom", 25];
let rgb: [number, number, number] = [255, 128, 0];

// Enum
enum Direction { Up, Down, Left, Right } // 0, 1, 2, 3
enum Status { Active = "ACTIVE", Inactive = "INACTIVE" }
let dir: Direction = Direction.Up;

// const enum — compile time inline (better performance)
const enum HttpStatus { OK = 200, NotFound = 404, ServerError = 500 }

// any vs unknown vs never
let anything: any = "hello";    // ❌ AVOID — type safety khatam
anything.foo.bar;               // No error — DANGEROUS!

let safe: unknown = "hello";    // ✅ PREFER over any
// safe.foo;                    // ❌ Error — pehle type check karo
if (typeof safe === "string") {
  console.log(safe.toUpperCase()); // ✅ Ab safe hai
}

// never — function jo kabhi return nahi karta
function throwError(msg: string): never {
  throw new Error(msg);
}
function infiniteLoop(): never {
  while (true) {}
}

// void — function jo kuch return nahi karta (but terminate hota hai)
function logMessage(msg: string): void {
  console.log(msg);
}

// Type assertions (casting)
let someValue: unknown = "hello world";
let strLength: number = (someValue as string).length; // Preferred
let strLength2: number = (<string>someValue).length;  // JSX mein nahi chalega
```

## 2️⃣ Interfaces & Type Aliases

```typescript
// Interface — object ka shape define karo
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;          // Optional property (? lagao)
  readonly createdAt: Date; // Read-only — modify nahi ho sakta
}

const user: User = {
  id: 1,
  name: "Hariom",
  email: "h@test.com",
  createdAt: new Date(),
};
// user.createdAt = new Date(); // ❌ Error — readonly

// Interface extending
interface Employee extends User {
  department: string;
  salary: number;
}

// Multiple interface extend
interface Manager extends Employee {
  team: Employee[];
  level: "junior" | "senior" | "director";
}

// Type Alias — kisi bhi type ka naam do
type ID = string | number;
type Point = { x: number; y: number };
type Callback = (data: string) => void;

// Type vs Interface — KEY DIFFERENCES
// Interface: extend ho sakta hai, declaration merging
// Type: unions, intersections, mapped types, primitives

// Interface declaration merging (auto-merge)
interface Config { host: string; }
interface Config { port: number; } // Merge ho jaayega!
// Config = { host: string; port: number } ✅

// Type unions (interface mein nahi ho sakta)
type Status = "active" | "inactive" | "pending"; // Union of literals
type Result = string | number; // Union of types
type StringOrArray = string | string[];
```

## 3️⃣ Union & Intersection Types

```typescript
// Union — ya toh yeh ya woh
type ID = string | number;

function printId(id: ID) {
  // Type narrowing chahiye
  if (typeof id === "string") {
    console.log(id.toUpperCase()); // String methods ✅
  } else {
    console.log(id.toFixed(2)); // Number methods ✅
  }
}

// Discriminated Union — BAHUT POWERFUL ⭐
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return 0.5 * shape.base * shape.height;
  }
}

// Intersection — dono types ka combination
type HasName = { name: string };
type HasAge = { age: number };
type Person = HasName & HasAge; // { name: string; age: number }

// Literal Types
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type StatusCode = 200 | 201 | 400 | 404 | 500;

function request(method: HttpMethod, url: string): void {
  console.log(`${method} ${url}`);
}
request("GET", "/api/users"); // ✅
// request("PATCH", "/api");  // ❌ Error
```

## 4️⃣ Generics — MOST IMPORTANT FOR FRAMEWORKS ⭐⭐⭐

```typescript
// Generic function — type ko parameter ki tarah use karo
function identity<T>(value: T): T {
  return value;
}
identity<string>("hello"); // T = string
identity(42);              // T = number (auto-inferred)

// Generic with constraints
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}
getLength("hello");      // ✅ string has length
getLength([1, 2, 3]);    // ✅ array has length
// getLength(123);        // ❌ number has no length

// Generic interface
interface ApiResponse<T> {
  status: number;
  data: T;
  message: string;
  timestamp: Date;
}

// Usage with different types
type UserResponse = ApiResponse<User>;
type UsersResponse = ApiResponse<User[]>;
type CountResponse = ApiResponse<{ count: number }>;

// Generic class
class Repository<T extends { id: number }> {
  private items: T[] = [];

  add(item: T): void { this.items.push(item); }
  findById(id: number): T | undefined { return this.items.find(i => i.id === id); }
  getAll(): T[] { return [...this.items]; }
  remove(id: number): boolean {
    const index = this.items.findIndex(i => i.id === id);
    if (index === -1) return false;
    this.items.splice(index, 1);
    return true;
  }
}

const userRepo = new Repository<User>();
userRepo.add({ id: 1, name: "Hariom", email: "h@test.com", createdAt: new Date() });

// Multiple generic params
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

// Generic with default
interface PaginatedResponse<T, M = { page: number; total: number }> {
  data: T[];
  meta: M;
}
```

## 5️⃣ Utility Types — BUILT-IN HELPERS

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

// Partial<T> — sab properties optional
type UpdateUser = Partial<User>;
// { id?: number; name?: string; email?: string; ... }

// Required<T> — sab properties required
type StrictUser = Required<User>;

// Pick<T, K> — specific properties choose karo
type UserPreview = Pick<User, "id" | "name">;
// { id: number; name: string }

// Omit<T, K> — specific properties hatao
type UserWithoutPassword = Omit<User, "password">;
// { id: number; name: string; email: string; role: ... }

// Record<K, V> — key-value mapping
type UserRoles = Record<string, User[]>;
// { [key: string]: User[] }
const roleMap: Record<"admin" | "user", number> = { admin: 5, user: 100 };

// Readonly<T> — sab properties readonly
type FrozenUser = Readonly<User>;

// ReturnType<T> — function ka return type
function createUser() { return { id: 1, name: "Hariom" }; }
type NewUser = ReturnType<typeof createUser>; // { id: number; name: string }

// Parameters<T> — function ke parameters ka type
type CreateUserParams = Parameters<typeof createUser>; // []

// Extract & Exclude
type T1 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
type T2 = Exclude<"a" | "b" | "c", "a">;        // "b" | "c"

// NonNullable
type T3 = NonNullable<string | null | undefined>; // string
```

## 6️⃣ Type Narrowing & Guards

```typescript
// typeof guard
function process(value: string | number) {
  if (typeof value === "string") return value.toUpperCase();
  return value.toFixed(2);
}

// instanceof guard
class Dog { bark() { return "Woof!"; } }
class Cat { meow() { return "Meow!"; } }

function speak(animal: Dog | Cat): string {
  if (animal instanceof Dog) return animal.bark();
  return animal.meow();
}

// "in" operator guard
interface Fish { swim: () => void; }
interface Bird { fly: () => void; }

function move(animal: Fish | Bird) {
  if ("swim" in animal) animal.swim();
  else animal.fly();
}

// Custom type guard (is keyword) ⭐
interface ApiError { code: number; message: string; }
interface ApiSuccess<T> { data: T; }
type ApiResult<T> = ApiError | ApiSuccess<T>;

function isError(result: ApiResult<unknown>): result is ApiError {
  return "code" in result;
}

function handleResult(result: ApiResult<User>) {
  if (isError(result)) {
    console.error(`Error ${result.code}: ${result.message}`);
  } else {
    console.log(`User: ${result.data.name}`); // TS knows it's ApiSuccess
  }
}
```

## 7️⃣ tsconfig.json — Production Setup

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "paths": {
      "@/*": ["./src/*"],
      "@utils/*": ["./src/utils/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

---

## 🧠 Key Takeaways

| Concept | Remember |
|---------|----------|
| `any` vs `unknown` | `unknown` use karo — safe hai |
| `interface` vs `type` | Interface for objects, Type for unions/intersections |
| Generics | `<T>` — flexible, reusable types |
| Utility Types | `Partial`, `Pick`, `Omit`, `Record` — daily use |
| Type guards | `typeof`, `instanceof`, `in`, custom `is` |
| `strict: true` | HAMESHA enable rakho tsconfig mein |
