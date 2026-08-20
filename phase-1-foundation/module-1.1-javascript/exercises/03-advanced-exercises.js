/**
 * ============================================================
 * 📝 Module 1.1 — Exercise 03: ES6+, Arrays, Async, Node.js
 * ============================================================
 * Combined exercises for Lessons 3-6
 * Run: node exercises/03-advanced-exercises.js
 * ============================================================
 */

// ===== SECTION 1: DESTRUCTURING =====

/** Exercise 1.1 — Destructure API Response */
function ex1_1() {
  console.log("\n--- Ex 1.1: Destructure API Response ---");
  const response = {
    status: 200,
    data: {
      user: { id: 1, name: "Hariom", email: "h@test.com" },
      posts: [
        { id: 101, title: "JS Guide", likes: 42 },
        { id: 102, title: "TS Guide", likes: 89 },
      ],
    },
    headers: { "content-type": "application/json" },
  };
  // TODO: Ek line mein destructure karo:
  // - status
  // - user ka name (rename to userName)
  // - pehla post (rename to firstPost)
  // - content-type header (rename to contentType)
  // const { ??? } = response;
  // console.log(userName, firstPost.title, contentType);
}

/** Exercise 1.2 — Function Parameter Destructuring */
function ex1_2() {
  console.log("\n--- Ex 1.2: Function Param Destructuring ---");
  // TODO: Ek function banao createTestConfig({ browser, headless, timeout, retries })
  // - Default values: browser="chromium", headless=true, timeout=30000, retries=2
  // - Return config object

  // function createTestConfig(???) { ??? }

  // console.log(createTestConfig({}));
  // Expected: { browser: "chromium", headless: true, timeout: 30000, retries: 2 }
  // console.log(createTestConfig({ browser: "firefox", timeout: 60000 }));
  // Expected: { browser: "firefox", headless: true, timeout: 60000, retries: 2 }
}

// ===== SECTION 2: ARRAY METHODS =====

/** Exercise 2.1 — Data Transformation Pipeline */
function ex2_1() {
  console.log("\n--- Ex 2.1: Data Pipeline ---");
  const employees = [
    { name: "Hariom", dept: "QA", salary: 80000, experience: 3 },
    { name: "Rahul", dept: "Dev", salary: 120000, experience: 5 },
    { name: "Priya", dept: "QA", salary: 90000, experience: 4 },
    { name: "Amit", dept: "Dev", salary: 95000, experience: 2 },
    { name: "Neha", dept: "QA", salary: 75000, experience: 1 },
    { name: "Karan", dept: "Dev", salary: 150000, experience: 8 },
  ];

  // TODO 1: QA department ka average salary nikaalo (use filter + reduce)
  // Expected: 81666.67 (approx)

  // TODO 2: Har department ka highest paid employee nikaalo
  // Expected: { QA: "Priya", Dev: "Karan" }

  // TODO 3: Employees ko experience ke hisaab se sort karo (descending)
  // aur format karo: ["Karan (8 yrs)", "Rahul (5 yrs)", ...]
}

/** Exercise 2.2 — Implement groupBy */
function ex2_2() {
  console.log("\n--- Ex 2.2: Custom groupBy ---");
  // TODO: groupBy function banao jo array ko kisi key ke basis par group kare

  function groupBy(arr, keyFn) {
    // Hint: reduce use karo
    return {}; // Replace
  }

  const data = [
    { name: "A", status: "active" },
    { name: "B", status: "inactive" },
    { name: "C", status: "active" },
    { name: "D", status: "active" },
    { name: "E", status: "inactive" },
  ];

  console.log(groupBy(data, item => item.status));
  // Expected: { active: [{A}, {C}, {D}], inactive: [{B}, {E}] }
}

// ===== SECTION 3: ASYNC/AWAIT =====

/** Exercise 3.1 — Simulate API Calls */
function ex3_1() {
  console.log("\n--- Ex 3.1: Async API Simulation ---");

  // Helper — simulated API call
  function fakeAPI(endpoint, delay = 500, shouldFail = false) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) reject(new Error(`API ${endpoint} failed`));
        else resolve({ endpoint, data: `Data from ${endpoint}`, timestamp: Date.now() });
      }, delay);
    });
  }

  // TODO 1: Sequential — fetch user → orders → payment (one after another)
  // async function fetchSequential() { ??? }

  // TODO 2: Parallel — fetch user, products, notifications ALL AT ONCE
  // async function fetchParallel() { ??? }

  // TODO 3: Parallel with error handling — some APIs may fail
  // async function fetchWithErrors() {
  //   const results = await Promise.allSettled([
  //     fakeAPI("/users"),
  //     fakeAPI("/broken", 300, true), // Will fail
  //     fakeAPI("/products"),
  //   ]);
  //   // Filter successful and failed results
  // }

  // Uncomment to test:
  // fetchSequential().then(r => console.log("Sequential:", r));
  // fetchParallel().then(r => console.log("Parallel:", r));
  // fetchWithErrors().then(r => console.log("WithErrors:", r));
}

/** Exercise 3.2 — Retry with Backoff */
function ex3_2() {
  console.log("\n--- Ex 3.2: Retry with Backoff ---");

  // TODO: async function retryWithBackoff(fn, maxRetries, initialDelay)
  // - Call fn()
  // - Agar fail ho toh wait karo (initialDelay * 2^attempt) ms
  // - maxRetries tak try karo
  // - Sab fail toh last error throw karo

  // let attempts = 0;
  // const flakyFn = async () => {
  //   attempts++;
  //   if (attempts < 3) throw new Error(`Attempt ${attempts} failed`);
  //   return "Success!";
  // };
  
  // retryWithBackoff(flakyFn, 5, 100).then(console.log);
}

// ===== SECTION 4: EVENT LOOP =====

/** Exercise 4.1 — Predict the Output (INTERVIEW MUST!) */
function ex4_1() {
  console.log("\n--- Ex 4.1: Event Loop Prediction ---");

  // TODO: Output order predict karo BEFORE running

  console.log("A");
  
  setTimeout(() => console.log("B"), 0);
  
  Promise.resolve().then(() => {
    console.log("C");
    setTimeout(() => console.log("D"), 0);
  });
  
  Promise.resolve().then(() => console.log("E"));
  
  setTimeout(() => {
    console.log("F");
    Promise.resolve().then(() => console.log("G"));
  }, 0);
  
  console.log("H");

  // TODO: Order likho: ?, ?, ?, ?, ?, ?, ?, ?
}

// ===== SECTION 5: ERROR HANDLING =====

/** Exercise 5.1 — Custom Error Classes */
function ex5_1() {
  console.log("\n--- Ex 5.1: Custom Errors ---");

  // TODO: Create these custom error classes:
  // 1. TestError (base) — extends Error, adds: testName, timestamp
  // 2. AssertionError extends TestError — adds: expected, actual
  // 3. TimeoutError extends TestError — adds: timeoutMs
  // 4. ElementNotFoundError extends TestError — adds: selector

  // class TestError extends Error { ??? }
  // class AssertionError extends TestError { ??? }
  // class TimeoutError extends TestError { ??? }
  // class ElementNotFoundError extends TestError { ??? }

  // Test:
  // try {
  //   throw new AssertionError("Login test", "Welcome", "Error page");
  // } catch (e) {
  //   console.log(e.name);       // "AssertionError"
  //   console.log(e.testName);   // "Login test"
  //   console.log(e.expected);   // "Welcome"
  //   console.log(e.actual);     // "Error page"
  //   console.log(e.timestamp);  // ISO date string
  // }
}

// ===== SECTION 6: NODE.JS FILE OPERATIONS =====

/** Exercise 6.1 — CSV to JSON Converter */
async function ex6_1() {
  console.log("\n--- Ex 6.1: CSV to JSON ---");
  
  // TODO: Function banao jo CSV string ko JSON array mein convert kare

  function csvToJson(csvString) {
    // Step 1: Lines mein split karo
    // Step 2: Pehli line headers hai
    // Step 3: Baaki lines data hai
    // Step 4: Har line ko object mein convert karo
    return []; // Replace
  }

  const csv = `name,age,city,score
Hariom,25,Delhi,92
Rahul,30,Mumbai,78
Priya,22,Bangalore,95
Amit,28,Delhi,65`;

  const result = csvToJson(csv);
  console.log(result);
  // Expected: [
  //   { name: "Hariom", age: "25", city: "Delhi", score: "92" },
  //   { name: "Rahul", age: "30", city: "Mumbai", score: "78" },
  //   ...
  // ]
}

/** Exercise 6.2 — JSON to CSV Converter */
function ex6_2() {
  console.log("\n--- Ex 6.2: JSON to CSV ---");

  // TODO: Reverse — JSON array ko CSV string mein convert karo
  function jsonToCsv(jsonArray) {
    // Step 1: Pehle object ke keys se headers banao
    // Step 2: Har object ko comma-separated values mein convert karo
    // Step 3: Join with newlines
    return ""; // Replace
  }

  const data = [
    { name: "Hariom", age: 25, city: "Delhi" },
    { name: "Rahul", age: 30, city: "Mumbai" },
  ];

  console.log(jsonToCsv(data));
  // Expected:
  // name,age,city
  // Hariom,25,Delhi
  // Rahul,30,Mumbai
}

// ===== SECTION 7: COMBINED CHALLENGE 🏆 =====

/** Exercise 7.1 — Build a Simple Test Runner */
function ex7_1() {
  console.log("\n--- Ex 7.1: Mini Test Runner 🏆 ---");

  // TODO: Ek mini test runner banao with:
  // - describe(name, fn) — test suite group
  // - it(name, fn) — individual test (can be async)
  // - expect(value) returning { toBe, toEqual, toContain, toThrow }
  // - Stats: total, passed, failed
  // - Pretty output with ✅ / ❌

  // Example usage (after implementing):
  // describe("Math operations", () => {
  //   it("should add correctly", () => {
  //     expect(1 + 1).toBe(2);
  //   });
  //   it("should handle arrays", () => {
  //     expect([1, 2, 3]).toContain(2);
  //   });
  //   it("should fail", () => {
  //     expect(1 + 1).toBe(3); // Should fail
  //   });
  // });
}

// ============================
// 🚀 RUN
// ============================
console.log("╔═══════════════════════════════════════════════╗");
console.log("║  Module 1.1 — Exercise 03: Advanced JS       ║");
console.log("╚═══════════════════════════════════════════════╝");

ex1_1();
ex1_2();
ex2_1();
ex2_2();
ex3_1();
ex4_1();
ex5_1();
ex6_1();
ex6_2();
ex7_1();

setTimeout(() => {
  console.log("\n✅ All exercises loaded!");
  console.log("📁 Solutions: exercises/03-advanced-solutions.js");
}, 300);
