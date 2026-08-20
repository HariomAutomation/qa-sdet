# 📋 TypeScript Mastery — Quick Cheatsheet

## Basic Types
```typescript
let s: string = "hello";
let n: number = 42;
let b: boolean = true;
let arr: number[] = [1, 2, 3];
let tuple: [string, number] = ["id", 101];
let u: unknown = "safe type"; // better than 'any'
let unreach: never;          // function that throws or infinite loops
```

## Interfaces & Types
```typescript
interface User {
  id: number;
  name: string;
  age?: number;               // optional
  readonly token: string;     // immutable
}

type ID = string | number;     // Union
type Person = { name: string } & { age: number }; // Intersection
type Status = "idle" | "running" | "passed" | "failed"; // Literals
```

## Generics
```typescript
// Generic Function
function wrap<T>(value: T): { data: T } { return { data: value }; }

// Generic Interface
interface ApiResponse<T> { status: number; data: T; }

// Generic Constraints
function getLen<T extends { length: number }>(item: T): number { return item.length; }
```

## Built-in Utility Types
```typescript
Partial<T>      // All fields optional
Required<T>     // All fields required
Readonly<T>     // All fields readonly
Pick<T, K>      // Choose subset of keys
Omit<T, K>      // Exclude subset of keys
Record<K, V>    // Key-value map type
ReturnType<T>   // Return type of a function
Parameters<T>   // Parameter types as tuple
```

## Type Narrowing & Guards
```typescript
if (typeof val === "string") { val.toUpperCase(); }
if (item instanceof Date) { item.toISOString(); }
if ("action" in event) { /* ... */ }

// Custom Type Guard
function isError(res: any): res is { error: string } {
  return typeof res?.error === "string";
}
```
