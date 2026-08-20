# 📘 Module 1.1 — JavaScript Deep Dive

## Lesson 3: ES6+ Features (Destructuring, Spread/Rest, Template Literals, Modern Syntax)

> **Difficulty:** 🟡 Intermediate  
> **Time:** ~2-3 hours  
> **Goal:** Modern JavaScript syntax master karna — yeh har jagah use hota hai

---

## 1️⃣ Destructuring — Arrays

```javascript
// Basic array destructuring
const colors = ["red", "green", "blue", "yellow"];
const [first, second] = colors;
console.log(first, second); // "red" "green"

// Skip elements
const [, , third] = colors;
console.log(third); // "blue"

// Rest with destructuring
const [primary, ...others] = colors;
console.log(primary); // "red"
console.log(others);  // ["green", "blue", "yellow"]

// Default values
const [a = 10, b = 20, c = 30] = [1, 2];
console.log(a, b, c); // 1, 2, 30 (c ka default use hua)

// Swap variables — no temp needed! 🔥
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2, 1

// Nested destructuring
const matrix = [[1, 2], [3, 4]];
const [[a1, a2], [b1, b2]] = matrix;
console.log(a1, b2); // 1, 4

// Function return value destructure
function getMinMax(arr) {
  return [Math.min(...arr), Math.max(...arr)];
}
const [min, max] = getMinMax([3, 1, 4, 1, 5]);
console.log(min, max); // 1, 5
```

## 2️⃣ Destructuring — Objects

```javascript
// Basic object destructuring
const user = { name: "Hariom", age: 25, city: "Delhi", role: "SDET" };
const { name, age } = user;
console.log(name, age); // "Hariom" 25

// Rename (alias)
const { name: userName, age: userAge } = user;
console.log(userName); // "Hariom"

// Default values
const { name: n, salary = 50000 } = user;
console.log(salary); // 50000 (user mein salary nahi hai, default laga)

// Nested destructuring
const company = {
  name: "TechCorp",
  address: { city: "Mumbai", state: "MH", pin: "400001" },
  employees: [{ id: 1, name: "Rahul" }],
};
const { address: { city, pin }, employees: [firstEmployee] } = company;
console.log(city, pin); // "Mumbai" "400001"
console.log(firstEmployee.name); // "Rahul"

// Rest with objects
const { name: companyName, ...rest } = company;
console.log(rest); // { address: {...}, employees: [...] }

// Function parameters mein destructuring — BAHUT COMMON ⭐
function createUser({ name, age, role = "user" }) {
  console.log(`${name} (${age}) - ${role}`);
}
createUser({ name: "Hariom", age: 25 }); // "Hariom (25) - user"
createUser({ name: "Admin", age: 30, role: "admin" }); // "Admin (30) - admin"

// Computed property names mein destructuring
const key = "name";
const { [key]: value } = user;
console.log(value); // "Hariom"
```

## 3️⃣ Enhanced Object Literals

```javascript
// Shorthand properties — variable name = key name
const name = "Hariom";
const age = 25;

// Old way
const userOld = { name: name, age: age };
// New way ✅
const userNew = { name, age };

// Shorthand methods
const calculator = {
  // Old way
  addOld: function(a, b) { return a + b; },
  // New way ✅
  add(a, b) { return a + b; },
};

// Computed property names
const field = "email";
const obj = {
  [field]: "hariom@test.com",        // email: "hariom@test.com"
  [`${field}Verified`]: true,         // emailVerified: true
  [`get${field[0].toUpperCase() + field.slice(1)}`]() {
    return this[field];               // getEmail() method
  },
};
console.log(obj.email); // "hariom@test.com"
console.log(obj.emailVerified); // true
```

## 4️⃣ Template Literals — Advanced

```javascript
// Multi-line strings
const html = `
  <div class="card">
    <h2>${user.name}</h2>
    <p>Age: ${user.age}</p>
  </div>
`;

// Expressions inside ${}
const price = 100;
const tax = 0.18;
console.log(`Total: ₹${(price * (1 + tax)).toFixed(2)}`); // "Total: ₹118.00"

// Conditional inside template
const status = score >= 60 ? "Pass" : "Fail";
console.log(`Result: ${score >= 60 ? "✅ Pass" : "❌ Fail"}`);

// Tagged templates (advanced — used in libraries like styled-components)
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? `**${values[i]}**` : "");
  }, "");
}
const item = "JavaScript";
const level = "Advanced";
console.log(highlight`Learning ${item} at ${level} level`);
// "Learning **JavaScript** at **Advanced** level"
```

## 5️⃣ Optional Chaining & Nullish Coalescing — Deep Dive

```javascript
// Optional chaining (?.) — safe property access
const response = {
  data: {
    users: [{ name: "Hariom", address: { city: "Delhi" } }],
  },
};

// Without optional chaining
const city1 = response && response.data && response.data.users
  && response.data.users[0] && response.data.users[0].address
  && response.data.users[0].address.city; // 😫 Kitna lamba!

// With optional chaining ✅
const city2 = response?.data?.users?.[0]?.address?.city; // "Delhi" 🎉

// Method call
const result = response?.data?.getUsers?.(); // undefined (no error)

// Nullish coalescing (??) — default for null/undefined ONLY
const config = {
  timeout: 0,         // valid value!
  retries: null,      // needs default
  verbose: undefined, // needs default
  name: "",           // valid value!
};

// || treats 0, "" as falsy — WRONG for config!
console.log(config.timeout || 3000);  // 3000 😱 (0 ko falsy samjha)
console.log(config.name || "default"); // "default" 😱 ("" ko falsy samjha)

// ?? treats ONLY null/undefined — CORRECT ✅
console.log(config.timeout ?? 3000);  // 0 ✅
console.log(config.retries ?? 3);     // 3 ✅
console.log(config.verbose ?? true);  // true ✅
console.log(config.name ?? "default"); // "" ✅

// ??= (Nullish assignment — assign only if null/undefined)
let a = null;
a ??= 10;
console.log(a); // 10

let b = 0;
b ??= 10;
console.log(b); // 0 (0 null nahi hai, toh assign nahi hua)

// ||= (Logical OR assignment — assign if falsy)
let c = 0;
c ||= 10;
console.log(c); // 10 (0 falsy hai)

// &&= (Logical AND assignment — assign if truthy)
let d = 1;
d &&= 2;
console.log(d); // 2 (1 truthy hai)
```

## 6️⃣ for...of, Iterables, and New Data Structures

```javascript
// Set — unique values only
const set = new Set([1, 2, 3, 2, 1, 4]);
console.log(set); // Set {1, 2, 3, 4}
set.add(5);
set.has(3);     // true
set.delete(2);
set.size;       // 4

// Array se duplicates hatao
const arr = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(arr)]; // [1, 2, 3, 4] 🔥

// Map — any key type (objects bhi key ho sakte hain)
const map = new Map();
map.set("name", "Hariom");
map.set(42, "answer");
map.set(true, "yes");
const objKey = { id: 1 };
map.set(objKey, "object as key!");

console.log(map.get("name")); // "Hariom"
console.log(map.get(objKey)); // "object as key!"
console.log(map.size);        // 4

// Map iterate
for (const [key, value] of map) {
  console.log(`${key} → ${value}`);
}

// Object.entries / Object.fromEntries
const obj = { a: 1, b: 2, c: 3 };
const entries = Object.entries(obj); // [["a",1], ["b",2], ["c",3]]
const backToObj = Object.fromEntries(entries); // { a: 1, b: 2, c: 3 }

// WeakMap / WeakSet — garbage collection friendly (advanced)
```

## 7️⃣ Useful Modern Methods

```javascript
// Array.from — iterable/array-like ko array mein convert karo
Array.from("hello");        // ["h", "e", "l", "l", "o"]
Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]
Array.from(new Set([1,1,2])); // [1, 2]

// Object.assign — merge objects (shallow)
const target = { a: 1 };
Object.assign(target, { b: 2 }, { c: 3 }); // { a: 1, b: 2, c: 3 }

// Object.keys / values / entries
const person = { name: "Hariom", age: 25 };
Object.keys(person);    // ["name", "age"]
Object.values(person);  // ["Hariom", 25]
Object.entries(person); // [["name","Hariom"], ["age",25]]

// structuredClone — DEEP copy (modern way!) ✅
const original = { a: 1, b: { c: 2 }, d: [3, 4] };
const deep = structuredClone(original);
deep.b.c = 99;
console.log(original.b.c); // 2 (unchanged!) ✅

// String methods
"hello world".at(0);      // "h"
"hello world".at(-1);     // "d" (last character)
"abc".replaceAll("a", "x"); // "xbc"

// Array methods
[1, 2, 3, 4].at(-1);     // 4 (last element)
[1, [2, [3, [4]]]].flat(Infinity); // [1, 2, 3, 4]
[[1,2], [3,4]].flatMap(x => x); // [1, 2, 3, 4]
const arr = [1, 2, 3];
arr.findLast(n => n < 3);      // 2
arr.findLastIndex(n => n < 3); // 1

// Object.hasOwn (replacement for hasOwnProperty)
Object.hasOwn({ a: 1 }, "a"); // true ✅
```

---

## 🧠 Key Takeaways

| Feature | Use Case |
|---------|----------|
| Destructuring | API responses parse, function params |
| `...spread` | Array/object copy, merge |
| `...rest` | Function params collect |
| `?.` | Safe nested property access |
| `??` | Default values (null/undefined only) |
| Template literals | String formatting, multi-line |
| Set | Unique values, duplicates remove |
| Map | Key-value pairs (any key type) |
| `structuredClone` | Deep copy objects |
