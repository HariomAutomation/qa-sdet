/**
 * ✅ Module 1.1 — Solutions: Exercise 03 - Advanced JS
 * ⚠️ PEHLE KHUD TRY KARO!
 */

function sol1_1() {
  console.log("\n--- Sol 1.1: Destructure API Response ---");
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

  const {
    status,
    data: { user: { name: userName }, posts: [firstPost] },
    headers: { "content-type": contentType },
  } = response;

  console.log(status, userName, firstPost.title, contentType);
  // 200 "Hariom" "JS Guide" "application/json"
}

function sol1_2() {
  console.log("\n--- Sol 1.2: Function Param Destructuring ---");
  function createTestConfig({
    browser = "chromium",
    headless = true,
    timeout = 30000,
    retries = 2,
  } = {}) {
    return { browser, headless, timeout, retries };
  }

  console.log(createTestConfig({}));
  console.log(createTestConfig({ browser: "firefox", timeout: 60000 }));
}

function sol2_1() {
  console.log("\n--- Sol 2.1: Data Pipeline ---");
  const employees = [
    { name: "Hariom", dept: "QA", salary: 80000, experience: 3 },
    { name: "Rahul", dept: "Dev", salary: 120000, experience: 5 },
    { name: "Priya", dept: "QA", salary: 90000, experience: 4 },
    { name: "Amit", dept: "Dev", salary: 95000, experience: 2 },
    { name: "Neha", dept: "QA", salary: 75000, experience: 1 },
    { name: "Karan", dept: "Dev", salary: 150000, experience: 8 },
  ];

  // 1: QA average salary
  const qaEmployees = employees.filter(e => e.dept === "QA");
  const qaAvgSalary = qaEmployees.reduce((sum, e) => sum + e.salary, 0) / qaEmployees.length;
  console.log("QA avg salary:", Math.round(qaAvgSalary * 100) / 100);

  // 2: Highest paid per dept
  const highestPaid = employees.reduce((acc, emp) => {
    if (!acc[emp.dept] || emp.salary > acc[emp.dept].salary) {
      acc[emp.dept] = emp;
    }
    return acc;
  }, {});
  const result = Object.fromEntries(
    Object.entries(highestPaid).map(([dept, emp]) => [dept, emp.name])
  );
  console.log("Highest paid:", result);

  // 3: Sort by experience desc
  const sorted = [...employees]
    .sort((a, b) => b.experience - a.experience)
    .map(e => `${e.name} (${e.experience} yrs)`);
  console.log("By experience:", sorted);
}

function sol2_2() {
  console.log("\n--- Sol 2.2: Custom groupBy ---");
  function groupBy(arr, keyFn) {
    return arr.reduce((groups, item) => {
      const key = keyFn(item);
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
      return groups;
    }, {});
  }

  const data = [
    { name: "A", status: "active" },
    { name: "B", status: "inactive" },
    { name: "C", status: "active" },
    { name: "D", status: "active" },
    { name: "E", status: "inactive" },
  ];
  console.log(JSON.stringify(groupBy(data, item => item.status), null, 2));
}

async function sol3_1() {
  console.log("\n--- Sol 3.1: Async API Simulation ---");
  function fakeAPI(endpoint, delay = 500, shouldFail = false) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) reject(new Error(`API ${endpoint} failed`));
        else resolve({ endpoint, data: `Data from ${endpoint}` });
      }, delay);
    });
  }

  // Sequential
  async function fetchSequential() {
    const user = await fakeAPI("/users", 100);
    const orders = await fakeAPI("/orders", 100);
    const payment = await fakeAPI("/payment", 100);
    return { user, orders, payment };
  }

  // Parallel
  async function fetchParallel() {
    const [user, products, notifications] = await Promise.all([
      fakeAPI("/users", 100),
      fakeAPI("/products", 100),
      fakeAPI("/notifications", 100),
    ]);
    return { user, products, notifications };
  }

  // With error handling
  async function fetchWithErrors() {
    const results = await Promise.allSettled([
      fakeAPI("/users", 100),
      fakeAPI("/broken", 100, true),
      fakeAPI("/products", 100),
    ]);
    return {
      success: results.filter(r => r.status === "fulfilled").map(r => r.value),
      failed: results.filter(r => r.status === "rejected").map(r => r.reason.message),
    };
  }

  console.log("Sequential:", await fetchSequential());
  console.log("Parallel:", await fetchParallel());
  console.log("WithErrors:", await fetchWithErrors());
}

function sol4_1() {
  console.log("\n--- Sol 4.1: Event Loop Order ---");
  // Answer: A, H, C, E, B, F, G, D
  console.log("Order: A, H, C, E, B, F, G, D");
  console.log("Sync first (A, H), then microtasks (C, E), then macrotasks (B, F→G, D)");
}

function sol5_1() {
  console.log("\n--- Sol 5.1: Custom Errors ---");
  class TestError extends Error {
    constructor(message, testName) {
      super(message);
      this.name = this.constructor.name;
      this.testName = testName;
      this.timestamp = new Date().toISOString();
    }
  }

  class AssertionError extends TestError {
    constructor(testName, expected, actual) {
      super(`Expected ${expected} but got ${actual}`, testName);
      this.expected = expected;
      this.actual = actual;
    }
  }

  class TimeoutError extends TestError {
    constructor(testName, timeoutMs) {
      super(`Test timed out after ${timeoutMs}ms`, testName);
      this.timeoutMs = timeoutMs;
    }
  }

  class ElementNotFoundError extends TestError {
    constructor(testName, selector) {
      super(`Element not found: ${selector}`, testName);
      this.selector = selector;
    }
  }

  try {
    throw new AssertionError("Login test", "Welcome", "Error page");
  } catch (e) {
    console.log(`${e.name}: ${e.message}`);
    console.log(`Test: ${e.testName}, Expected: ${e.expected}, Actual: ${e.actual}`);
  }

  try {
    throw new ElementNotFoundError("Click test", "#submit-btn");
  } catch (e) {
    console.log(`${e.name}: ${e.message}, Selector: ${e.selector}`);
  }
}

function sol6_1() {
  console.log("\n--- Sol 6.1: CSV to JSON ---");
  function csvToJson(csvString) {
    const lines = csvString.trim().split("\n");
    const headers = lines[0].split(",");
    return lines.slice(1).map(line => {
      const values = line.split(",");
      return headers.reduce((obj, header, i) => {
        obj[header.trim()] = values[i].trim();
        return obj;
      }, {});
    });
  }

  const csv = `name,age,city,score
Hariom,25,Delhi,92
Rahul,30,Mumbai,78
Priya,22,Bangalore,95`;

  console.log(csvToJson(csv));
}

function sol6_2() {
  console.log("\n--- Sol 6.2: JSON to CSV ---");
  function jsonToCsv(jsonArray) {
    if (jsonArray.length === 0) return "";
    const headers = Object.keys(jsonArray[0]);
    const rows = jsonArray.map(obj => headers.map(h => obj[h]).join(","));
    return [headers.join(","), ...rows].join("\n");
  }

  const data = [
    { name: "Hariom", age: 25, city: "Delhi" },
    { name: "Rahul", age: 30, city: "Mumbai" },
  ];
  console.log(jsonToCsv(data));
}

function sol7_1() {
  console.log("\n--- Sol 7.1: Mini Test Runner 🏆 ---");
  let stats = { total: 0, passed: 0, failed: 0 };

  function expect(actual) {
    return {
      toBe(expected) {
        if (actual !== expected) throw new Error(`Expected ${expected}, got ${actual}`);
      },
      toEqual(expected) {
        if (JSON.stringify(actual) !== JSON.stringify(expected))
          throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
      },
      toContain(item) {
        if (!actual.includes(item)) throw new Error(`Expected [${actual}] to contain ${item}`);
      },
    };
  }

  function it(name, fn) {
    stats.total++;
    try {
      fn();
      stats.passed++;
      console.log(`  ✅ ${name}`);
    } catch (e) {
      stats.failed++;
      console.log(`  ❌ ${name} — ${e.message}`);
    }
  }

  function describe(name, fn) {
    console.log(`\n📦 ${name}`);
    fn();
  }

  // Demo
  describe("Math operations", () => {
    it("should add correctly", () => { expect(1 + 1).toBe(2); });
    it("should multiply", () => { expect(3 * 4).toBe(12); });
    it("should fail intentionally", () => { expect(1 + 1).toBe(3); });
  });

  describe("Arrays", () => {
    it("should contain item", () => { expect([1, 2, 3]).toContain(2); });
    it("should deep equal", () => { expect({ a: 1 }).toEqual({ a: 1 }); });
  });

  console.log(`\n📊 Results: ${stats.passed}/${stats.total} passed, ${stats.failed} failed`);
}

// RUN
console.log("╔══════════════════════════════════════════╗");
console.log("║  Solutions: Advanced JS                  ║");
console.log("╚══════════════════════════════════════════╝");
sol1_1(); sol1_2(); sol2_1(); sol2_2();
sol3_1().then(() => { sol4_1(); sol5_1(); sol6_1(); sol6_2(); sol7_1(); });
