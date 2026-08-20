# 📘 Module 1.1 — JavaScript Deep Dive

## Lesson 4: Arrays & Objects Deep Dive (map, filter, reduce, find, Object methods)

> **Difficulty:** 🟡 Intermediate  
> **Time:** ~3-4 hours  
> **Goal:** Data transformation master karna — SDET ke liye SABSE important skill

---

## 1️⃣ Array Methods — Transformation

### map() — Transform EVERY element

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8, 10]

// Real-world: API response transform
const apiUsers = [
  { id: 1, first_name: "Hariom", last_name: "Singh", is_active: true },
  { id: 2, first_name: "Rahul", last_name: "Kumar", is_active: false },
];
const formatted = apiUsers.map(user => ({
  id: user.id,
  fullName: `${user.first_name} ${user.last_name}`,
  status: user.is_active ? "Active" : "Inactive",
}));
// [{ id: 1, fullName: "Hariom Singh", status: "Active" }, ...]

// map with index
const indexed = ["a", "b", "c"].map((item, index) => `${index}: ${item}`);
// ["0: a", "1: b", "2: c"]
```

### filter() — Select elements matching condition

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = numbers.filter(n => n % 2 === 0); // [2, 4, 6, 8, 10]

// Real-world: Filter active users
const activeUsers = apiUsers.filter(u => u.is_active);

// filter + map chaining 🔥
const activeNames = apiUsers
  .filter(u => u.is_active)
  .map(u => `${u.first_name} ${u.last_name}`);
// ["Hariom Singh"]
```

### reduce() — Combine into single value (MOST POWERFUL)

```javascript
// Sum
const sum = [1, 2, 3, 4, 5].reduce((acc, curr) => acc + curr, 0); // 15

// Count occurrences
const fruits = ["apple", "banana", "apple", "cherry", "banana", "apple"];
const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
// { apple: 3, banana: 2, cherry: 1 }

// Group by property
const people = [
  { name: "Hariom", city: "Delhi" },
  { name: "Rahul", city: "Mumbai" },
  { name: "Priya", city: "Delhi" },
  { name: "Amit", city: "Mumbai" },
];
const grouped = people.reduce((acc, person) => {
  const key = person.city;
  if (!acc[key]) acc[key] = [];
  acc[key].push(person.name);
  return acc;
}, {});
// { Delhi: ["Hariom", "Priya"], Mumbai: ["Rahul", "Amit"] }

// Flatten array (without .flat())
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = nested.reduce((acc, arr) => [...acc, ...arr], []); // [1,2,3,4,5,6]

// Pipeline — reduce se chain karo
const pipeline = [
  (x) => x * 2,
  (x) => x + 10,
  (x) => x / 3,
];
const result = pipeline.reduce((val, fn) => fn(val), 5);
// 5 → 10 → 20 → 6.666
```

### find() & findIndex()

```javascript
const users = [
  { id: 1, name: "Hariom", role: "sdet" },
  { id: 2, name: "Rahul", role: "dev" },
  { id: 3, name: "Priya", role: "sdet" },
];

// find — pehla matching element return karo
const sdet = users.find(u => u.role === "sdet");
// { id: 1, name: "Hariom", role: "sdet" }

// findIndex — pehla matching index return karo
const index = users.findIndex(u => u.name === "Rahul"); // 1

// find returns undefined if not found, findIndex returns -1
```

### some() & every() — Boolean checks

```javascript
const scores = [85, 92, 78, 95, 60];

const hasTopper = scores.some(s => s >= 90);  // true (koi ek bhi >= 90)
const allPassed = scores.every(s => s >= 60); // true (sab >= 60)
const allToppers = scores.every(s => s >= 90); // false
```

### sort() — TRICKY! ⚠️

```javascript
// ⚠️ sort() MUTATES the original array!
// ⚠️ Default sort STRING comparison karta hai!
const nums = [10, 1, 21, 2];
nums.sort(); // [1, 10, 2, 21] ← WRONG! String comparison hua 😱

// Correct numeric sort:
nums.sort((a, b) => a - b); // [1, 2, 10, 21] ← Ascending ✅
nums.sort((a, b) => b - a); // [21, 10, 2, 1] ← Descending ✅

// Sort objects
const users = [
  { name: "Charlie", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 28 },
];
users.sort((a, b) => a.age - b.age); // Age ascending
users.sort((a, b) => a.name.localeCompare(b.name)); // Name alphabetical

// ✅ Non-mutating sort (ES2023)
const sorted = nums.toSorted((a, b) => a - b); // Original unchanged!
const reversed = nums.toReversed(); // Original unchanged!
```

### Other Useful Methods

```javascript
// includes
[1, 2, 3].includes(2); // true

// flat & flatMap
[1, [2, [3]]].flat(1);    // [1, 2, [3]]
[1, [2, [3]]].flat(Infinity); // [1, 2, 3]

// Array.from — create arrays
Array.from({ length: 5 }, (_, i) => i + 1); // [1, 2, 3, 4, 5]
Array.from("hello"); // ["h", "e", "l", "l", "o"]

// fill
new Array(5).fill(0); // [0, 0, 0, 0, 0]

// splice (mutates!) vs slice (no mutate)
const arr = [1, 2, 3, 4, 5];
arr.slice(1, 3);    // [2, 3] — original unchanged
arr.splice(1, 2);   // removes [2, 3] — original = [1, 4, 5] ⚠️

// toSpliced (ES2023 — non-mutating)
const arr2 = [1, 2, 3, 4, 5];
const newArr = arr2.toSpliced(1, 2); // [1, 4, 5] — original unchanged ✅
```

---

## 2️⃣ Object Methods

```javascript
const config = { host: "localhost", port: 3000, debug: true };

// Keys, Values, Entries
Object.keys(config);    // ["host", "port", "debug"]
Object.values(config);  // ["localhost", 3000, true]
Object.entries(config); // [["host","localhost"], ["port",3000], ["debug",true]]

// fromEntries — entries array ko object mein convert
const entries = [["a", 1], ["b", 2]];
Object.fromEntries(entries); // { a: 1, b: 2 }

// Transform object values
const doubled = Object.fromEntries(
  Object.entries({ a: 1, b: 2, c: 3 }).map(([k, v]) => [k, v * 2])
); // { a: 2, b: 4, c: 6 }

// Freeze — completely immutable
const frozen = Object.freeze({ name: "Hariom", age: 25 });
frozen.name = "Other"; // Silently fails (strict mode mein error)
frozen.city = "Delhi"; // Silently fails

// hasOwn (modern)
Object.hasOwn(config, "host"); // true
Object.hasOwn(config, "missing"); // false
```

---

## 3️⃣ Deep Copy vs Shallow Copy

```javascript
const original = {
  name: "Hariom",
  scores: [90, 85, 95],
  address: { city: "Delhi", pin: "110001" },
};

// Shallow copy — nested objects still shared
const shallow = { ...original };
shallow.name = "Changed"; // ✅ OK
shallow.scores.push(100); // ⚠️ original.scores BHI change hoga!

// Deep copy options:
// 1. structuredClone (BEST ✅)
const deep1 = structuredClone(original);

// 2. JSON trick (functions/undefined/Dates handle nahi karta ⚠️)
const deep2 = JSON.parse(JSON.stringify(original));

deep1.scores.push(100);
console.log(original.scores.length); // 3 (unchanged!) ✅
```

---

## 4️⃣ Chaining — Data Pipeline Pattern 🔥

```javascript
// Real-world data transformation pipeline
const rawData = [
  { name: "Hariom Singh", age: 25, score: 92, department: "Engineering" },
  { name: "Rahul Kumar", age: 30, score: 78, department: "Marketing" },
  { name: "Priya Sharma", age: 22, score: 95, department: "Engineering" },
  { name: "Amit Patel", age: 28, score: 65, department: "Engineering" },
  { name: "Neha Gupta", age: 27, score: 88, department: "Marketing" },
];

// Task: Engineering mein top scorers (score > 80) ka naam aur grade nikaalo
const result = rawData
  .filter(person => person.department === "Engineering")   // Engineer only
  .filter(person => person.score > 80)                      // Score > 80
  .map(person => ({                                         // Transform
    name: person.name,
    grade: person.score >= 90 ? "A" : "B",
  }))
  .sort((a, b) => a.name.localeCompare(b.name));            // Sort by name

console.log(result);
// [{ name: "Hariom Singh", grade: "A" }, { name: "Priya Sharma", grade: "A" }]
```
