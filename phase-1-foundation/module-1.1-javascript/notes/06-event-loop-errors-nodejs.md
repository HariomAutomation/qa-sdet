# 📘 Module 1.1 — JavaScript Deep Dive

## Lesson 6: Event Loop + Lesson 7: Error Handling + Lesson 8: Node.js Basics

> **Time:** ~4-5 hours  
> **Goal:** JS runtime samajhna, robust error handling, Node.js fundamentals

---

# Part A: Event Loop 🔄

## How JavaScript Executes Code

```
┌─────────────────────────────┐
│       CALL STACK             │  ← Functions execute here (LIFO)
│  (one thing at a time)       │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│     WEB APIs / Node APIs     │  ← setTimeout, fetch, DOM events
│  (run in background)         │
└─────────────┬───────────────┘
              │ callback ready
              ▼
┌─────────────────────────────┐
│    MICROTASK QUEUE           │  ← Promises (.then), queueMicrotask
│  (HIGH PRIORITY)             │     Process FIRST before macrotasks
└─────────────────────────────┘
┌─────────────────────────────┐
│    MACROTASK QUEUE           │  ← setTimeout, setInterval, I/O
│  (LOWER PRIORITY)            │
└─────────────────────────────┘
              │
              ▼
         EVENT LOOP: "Call stack khaali hai? 
                      Microtask queue check karo.
                      Khaali? Macrotask queue se ek lo."
```

## Priority Order: Microtasks > Macrotasks

```javascript
console.log("1: Script start");      // 🔵 Synchronous

setTimeout(() => {
  console.log("2: setTimeout");       // 🟡 Macrotask queue
}, 0);

Promise.resolve().then(() => {
  console.log("3: Promise.then");     // 🔴 Microtask queue (PRIORITY!)
});

queueMicrotask(() => {
  console.log("4: queueMicrotask");   // 🔴 Microtask queue
});

console.log("5: Script end");         // 🔵 Synchronous

// OUTPUT ORDER:
// 1: Script start      ← sync
// 5: Script end         ← sync
// 3: Promise.then       ← microtask (pehle)
// 4: queueMicrotask     ← microtask
// 2: setTimeout         ← macrotask (baad mein)
```

## Classic Interview Question

```javascript
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve()
  .then(() => {
    console.log("3");
    setTimeout(() => console.log("4"), 0);
  })
  .then(() => console.log("5"));

setTimeout(() => {
  console.log("6");
  Promise.resolve().then(() => console.log("7"));
}, 0);

console.log("8");

// OUTPUT: 1, 8, 3, 5, 2, 6, 7, 4
// Explanation:
// Sync: 1, 8
// Microtasks: 3, 5 (promise chain)
// Macrotask 1: 2 (first setTimeout)
// Macrotask 2: 6 → then microtask 7
// Macrotask 3: 4 (setTimeout from inside promise)
```

---

# Part B: Error Handling 🛡️

## try/catch/finally

```javascript
try {
  const data = JSON.parse("invalid json");
} catch (error) {
  console.error("Type:", error.name);       // "SyntaxError"
  console.error("Message:", error.message); // "Unexpected token i..."
  console.error("Stack:", error.stack);     // Full stack trace
} finally {
  console.log("Cleanup — always runs"); // Success ya fail, dono mein chalega
}

// finally ka special case — return ke baad bhi chalega!
function test() {
  try {
    return "try";
  } finally {
    console.log("finally runs!"); // Yeh chalega!
  }
}
```

## Custom Error Classes ⭐

```javascript
// Base custom error
class AppError extends Error {
  constructor(message, statusCode, errorCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.timestamp = new Date().toISOString();
    Error.captureStackTrace(this, this.constructor);
  }
}

// Specific errors
class ValidationError extends AppError {
  constructor(message, field) {
    super(message, 400, "VALIDATION_ERROR");
    this.field = field;
  }
}

class NotFoundError extends AppError {
  constructor(resource, id) {
    super(`${resource} with id ${id} not found`, 404, "NOT_FOUND");
    this.resource = resource;
    this.resourceId = id;
  }
}

class APIError extends AppError {
  constructor(message, statusCode = 500, response = null) {
    super(message, statusCode, "API_ERROR");
    this.response = response;
  }
}

// Usage
function findUser(id) {
  if (!id) throw new ValidationError("ID is required", "id");
  if (id < 0) throw new ValidationError("ID must be positive", "id");
  // ... user nahi mila
  throw new NotFoundError("User", id);
}

try {
  findUser(-1);
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`Validation failed on field: ${error.field}`);
  } else if (error instanceof NotFoundError) {
    console.log(`${error.resource} not found: ${error.resourceId}`);
  } else {
    console.log("Unexpected error:", error.message);
  }
}
```

## Async Error Handling

```javascript
// ❌ try/catch DOESN'T catch async errors without await
try {
  Promise.reject("oops"); // Unhandled rejection!
} catch (e) {
  console.log("Won't catch"); // Yeh execute NAHI hoga
}

// ✅ async/await + try/catch
async function safeFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new APIError(`HTTP ${response.status}`, response.status);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof APIError) throw error;
    throw new APIError("Network error: " + error.message);
  }
}

// Global unhandled rejection handler (Node.js)
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});
```

---

# Part C: Node.js Basics 📦

## CommonJS vs ES Modules

```javascript
// ===== CommonJS (older, default in Node.js) =====
// math.js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
module.exports = { add, subtract };
// OR: exports.add = add;

// app.js
const { add, subtract } = require("./math");
console.log(add(1, 2)); // 3

// ===== ES Modules (modern, use this ✅) =====
// math.mjs (ya package.json mein "type": "module")
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export default function multiply(a, b) { return a * b; }

// app.mjs
import multiply, { add, subtract } from "./math.mjs";
console.log(add(1, 2)); // 3
```

## File System (fs module)

```javascript
const fs = require("fs");
const path = require("path");

// ❌ Synchronous (blocks!)
const data = fs.readFileSync("file.txt", "utf-8");

// ✅ Async with promises (PREFER)
const fsPromises = require("fs").promises;

async function fileOperations() {
  // Read file
  const content = await fsPromises.readFile("input.txt", "utf-8");
  
  // Write file
  await fsPromises.writeFile("output.txt", "Hello World");
  
  // Append to file
  await fsPromises.appendFile("log.txt", "New log entry\n");
  
  // Check if file exists
  try {
    await fsPromises.access("file.txt");
    console.log("File exists");
  } catch {
    console.log("File doesn't exist");
  }
  
  // Read directory
  const files = await fsPromises.readdir("./src");
  
  // Create directory
  await fsPromises.mkdir("./output", { recursive: true });
  
  // Delete file
  await fsPromises.unlink("temp.txt");
  
  // File info
  const stats = await fsPromises.stat("file.txt");
  console.log("Size:", stats.size, "bytes");
  console.log("Is file:", stats.isFile());
  console.log("Modified:", stats.mtime);
}

// path module — cross-platform paths
const filePath = path.join(__dirname, "data", "config.json");
path.basename("/path/to/file.txt");  // "file.txt"
path.extname("file.txt");            // ".txt"
path.dirname("/path/to/file.txt");   // "/path/to"
path.resolve("./data", "config.json"); // Absolute path
```

## process & Environment Variables

```javascript
// Command line arguments
console.log(process.argv); // [node_path, script_path, ...args]
const args = process.argv.slice(2); // User arguments only

// Environment variables
console.log(process.env.NODE_ENV);     // "development" / "production"
console.log(process.env.HOME);         // User home directory
const PORT = process.env.PORT || 3000;

// Exit
process.exit(0); // Success
process.exit(1); // Error

// Current directory
console.log(process.cwd()); // Working directory
```

## npm & package.json

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node src/index.js",
    "dev": "node --watch src/index.js",
    "test": "node --test",
    "lint": "eslint src/",
    "format": "prettier --write ."
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

```bash
# npm commands
npm init -y                  # Initialize project
npm install express          # Install dependency (--save by default)
npm install -D eslint        # Install dev dependency
npm install                  # Install all from package.json
npm run test                 # Run script
npm outdated                 # Check for updates
npm update                   # Update packages
```

---

## 🧠 Key Takeaways

| Topic | Remember |
|-------|----------|
| Event Loop | Microtasks (Promises) > Macrotasks (setTimeout) |
| Custom Errors | Extend Error class, add name/code/statusCode |
| Async errors | ALWAYS use try/catch with await |
| fs module | Use `fs.promises` (async), not sync versions |
| path module | Use `path.join()` for cross-platform paths |
| ES Modules | Add `"type": "module"` in package.json |
