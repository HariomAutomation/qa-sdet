# 📘 Module 1.1 — JavaScript Deep Dive

## Lesson 1: JS Basics Refresh (Variables, Data Types, Operators, Conditionals, Loops)

> **Difficulty:** 🟢 Beginner → Intermediate  
> **Time:** ~2-3 hours  
> **Goal:** Basics ka revision + wo nuances samajhna jo interviews mein puche jaate hain

---

## 1️⃣ Variables — `var` vs `let` vs `const`

Tujhe pata hai variables kaise declare karte hain. Ab samajh **kyun** `let`/`const` use karte hain aur `var` kyun avoid karte hain.

### `var` — The Old Way (AVOID ❌)

```javascript
// Problem 1: var function-scoped hai, block-scoped NAHI
if (true) {
  var x = 10;
}
console.log(x); // 10 ✅ — Yeh kaam karta hai! But yeh PROBLEM hai
// x if block ke bahar bhi accessible hai — yeh unexpected behavior hai

// Problem 2: var hoisting — declaration upar uth jaati hai, value nahi
console.log(name); // undefined (error nahi aata! 😱)
var name = "Hariom";

// Problem 3: var re-declare ho sakta hai — bugs ka raasta
var age = 25;
var age = 30; // Koi error nahi! Silently overwrite ho gaya
```

### `let` — Block Scoped (USE ✅)

```javascript
// let block-scoped hai — sirf { } ke andar accessible
if (true) {
  let y = 20;
  console.log(y); // 20 ✅
}
// console.log(y); // ❌ ReferenceError: y is not defined

// let hoisting hota hai but "Temporal Dead Zone" mein rehta hai
// console.log(score); // ❌ ReferenceError (TDZ mein hai)
let score = 100;

// let re-declare NAHI ho sakta same scope mein
let city = "Delhi";
// let city = "Mumbai"; // ❌ SyntaxError: Identifier 'city' has already been declared

// But RE-ASSIGN ho sakta hai
city = "Mumbai"; // ✅ Yeh chalega
```

### `const` — Block Scoped + Immutable Binding (PREFER 🌟)

```javascript
// const ki VALUE reassign nahi ho sakti
const PI = 3.14159;
// PI = 3.14; // ❌ TypeError: Assignment to constant variable

// ⚠️ IMPORTANT: const ka matlab "value change nahi hogi" NAHI hai
// const ka matlab hai "BINDING change nahi hogi" (reference same rahega)
const user = { name: "Hariom", age: 25 };
user.name = "Hari"; // ✅ Yeh chalega! Object ki property change ho sakti hai
user.city = "Delhi"; // ✅ Nayi property add bhi ho sakti hai
// user = { name: "Other" }; // ❌ Naya object assign nahi ho sakta

const numbers = [1, 2, 3];
numbers.push(4); // ✅ Array modify ho sakta hai
// numbers = [5, 6]; // ❌ Naya array assign nahi ho sakta
```

### 🏆 Rule of Thumb
```
const > let > var (never)
- Pehle const use karo
- Agar value change karni hai toh let use karo
- var KABHI mat use karo
```

---

## 2️⃣ Data Types — Primitive vs Reference

JavaScript mein **8 data types** hain. Yeh samajhna BAHUT important hai.

### Primitive Types (7) — Value by copy

```javascript
// 1. string
let greeting = "Hello";
let name = 'Hariom';
let template = `Hi ${name}`; // Template literal — backtick use karo

// 2. number (integer + float dono ek hi type hai JS mein)
let age = 25;
let price = 99.99;
let infinity = Infinity;
let notANumber = NaN; // typeof NaN === "number" 😱 (interview question!)

// 3. boolean
let isActive = true;
let isDeleted = false;

// 4. undefined — variable declare kiya but value nahi di
let x;
console.log(x); // undefined
console.log(typeof x); // "undefined"

// 5. null — intentionally "koi value nahi" set kiya
let user = null;
console.log(typeof null); // "object" 😱 (JS ka famous bug — interview mein pucha jaata hai!)

// 6. bigint — bahut bade numbers ke liye
let bigNumber = 9007199254740991n; // 'n' lagana padta hai end mein
let another = BigInt("123456789012345678901234567890");

// 7. symbol — unique identifier banana
let id1 = Symbol("id");
let id2 = Symbol("id");
console.log(id1 === id2); // false — har Symbol unique hota hai
```

### Reference Type (1) — Value by reference

```javascript
// object (arrays, functions, dates — sab objects hain internally)
let obj1 = { name: "Hariom" };
let obj2 = obj1; // Reference COPY hua, object nahi
obj2.name = "Hari";
console.log(obj1.name); // "Hari" 😱 — Dono same object point karte hain!

// Same with arrays
let arr1 = [1, 2, 3];
let arr2 = arr1;
arr2.push(4);
console.log(arr1); // [1, 2, 3, 4] — arr1 bhi change ho gaya!
```

### typeof Operator — Type check karna

```javascript
console.log(typeof "hello");     // "string"
console.log(typeof 42);          // "number"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" ⚠️ (bug!)
console.log(typeof {});          // "object"
console.log(typeof []);          // "object" ⚠️ (array bhi object hai)
console.log(typeof function(){}); // "function"
console.log(typeof Symbol());    // "symbol"
console.log(typeof 10n);         // "bigint"

// Array check karne ka sahi tarika
console.log(Array.isArray([]));  // true ✅
console.log(Array.isArray({}));  // false ✅

// null check karne ka sahi tarika
let value = null;
console.log(value === null);     // true ✅
```

---

## 3️⃣ Type Coercion — JS ki Sabse Tricky Cheez

JavaScript **implicit type conversion** karta hai jo bahut confusing ho sakta hai.

### Implicit Coercion (Automatic — DANGEROUS ⚠️)

```javascript
// String + Number = String (concatenation)
console.log("5" + 3);      // "53" (number string ban gaya)
console.log("5" + true);   // "5true"
console.log("5" + null);   // "5null"

// Other operators ke saath String → Number conversion hota hai
console.log("5" - 3);      // 2 (string number ban gaya)
console.log("5" * 2);      // 10
console.log("5" / 2);      // 2.5
console.log("hello" - 1);  // NaN

// Boolean coercion
console.log(true + 1);     // 2 (true = 1)
console.log(false + 1);    // 1 (false = 0)

// 🤯 Interview Trick Questions
console.log([] + []);       // "" (empty string)
console.log([] + {});       // "[object Object]"
console.log({} + []);       // 0 ya "[object Object]" (context dependent)
console.log(true + true);   // 2
console.log(null + 1);      // 1 (null = 0)
console.log(undefined + 1); // NaN
```

### Explicit Coercion (Manual — PREFER ✅)

```javascript
// String to Number
let str = "42";
let num1 = Number(str);        // 42
let num2 = parseInt(str);      // 42 (integer)
let num3 = parseFloat("3.14"); // 3.14
let num4 = +"42";              // 42 (unary + operator — shorthand)

// Number to String
let n = 42;
let s1 = String(n);    // "42"
let s2 = n.toString();  // "42"
let s3 = `${n}`;        // "42" (template literal)

// To Boolean
// Falsy values: false, 0, -0, "", null, undefined, NaN
// Baaki SAB truthy hai (including "0", "false", [], {})
console.log(Boolean(0));         // false
console.log(Boolean(""));        // false
console.log(Boolean(null));      // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));       // false

console.log(Boolean("0"));      // true ⚠️ (non-empty string)
console.log(Boolean("false"));  // true ⚠️
console.log(Boolean([]));       // true ⚠️ (empty array bhi truthy!)
console.log(Boolean({}));       // true ⚠️ (empty object bhi truthy!)
```

---

## 4️⃣ Operators — `==` vs `===` (Critical!)

### Equality Operators

```javascript
// == (loose equality) — type coercion KARTA hai (AVOID ❌)
console.log(5 == "5");       // true 😱
console.log(0 == false);     // true
console.log(null == undefined); // true
console.log("" == false);   // true

// === (strict equality) — type coercion NAHI karta (USE ✅)
console.log(5 === "5");       // false ✅
console.log(0 === false);     // false ✅
console.log(null === undefined); // false ✅

// 🏆 RULE: Hamesha === use karo. Kabhi == mat use karo.
// Exception: null check — (value == null) checks both null AND undefined
let val = null;
console.log(val == null);       // true
console.log(val == undefined);  // true (yeh useful hai)
```

### Logical Operators — Short Circuit Evaluation

```javascript
// && (AND) — Pehla falsy value return karta hai, ya last value
console.log("hello" && "world");  // "world" (dono truthy, last return)
console.log(0 && "hello");       // 0 (pehla falsy return)
console.log("" && "hello");     // "" (pehla falsy return)

// || (OR) — Pehla truthy value return karta hai, ya last value
console.log("" || "default");    // "default" (pehla truthy)
console.log(null || "fallback"); // "fallback"
console.log("hello" || "world"); // "hello" (pehla truthy)

// ?? (Nullish Coalescing) — Sirf null/undefined ke liye fallback (ES2020)
console.log(0 ?? "default");         // 0 ✅ (0 null/undefined nahi hai)
console.log("" ?? "default");        // "" ✅ (empty string null nahi hai)
console.log(null ?? "default");      // "default" ✅
console.log(undefined ?? "default"); // "default" ✅

// || vs ?? ka difference samjho
let count = 0;
console.log(count || 10);  // 10 😱 (0 falsy hai, toh 10 aa gaya)
console.log(count ?? 10);  // 0 ✅ (0 null/undefined nahi hai, toh 0 hi rahega)
```

### Optional Chaining — `?.`

```javascript
// Bina optional chaining ke
let user = { address: { city: "Delhi" } };
// let zip = user.address.zipcode.code; // ❌ TypeError: Cannot read properties of undefined

// Optional chaining ke saath
let zip = user?.address?.zipcode?.code; // undefined ✅ (error nahi aata)

// Methods ke saath
let result = user.getName?.(); // undefined agar getName exist nahi karta

// Arrays ke saath
let arr = [1, 2, 3];
let val = arr?.[5]; // undefined
```

---

## 5️⃣ Conditionals — Beyond Basic if/else

### Ternary Operator

```javascript
// Basic ternary
let age = 20;
let status = age >= 18 ? "Adult" : "Minor";

// Nested ternary (AVOID — readability kharab hoti hai)
let grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";
// Better: if/else ya switch use karo nested cases mein
```

### Switch Statement

```javascript
// Switch strict equality (===) use karta hai
let role = "admin";

switch (role) {
  case "admin":
    console.log("Full access");
    break; // break bhoolna mat! ⚠️
  case "editor":
    console.log("Edit access");
    break;
  case "viewer":
    console.log("View only");
    break;
  default:
    console.log("Unknown role");
}

// Fall-through pattern (intentional — no break)
let day = "Monday";
switch (day) {
  case "Monday":
  case "Tuesday":
  case "Wednesday":
  case "Thursday":
  case "Friday":
    console.log("Weekday");
    break;
  case "Saturday":
  case "Sunday":
    console.log("Weekend");
    break;
}
```

---

## 6️⃣ Loops — Har Type Samjho

### Traditional Loops

```javascript
// for loop — jab iterations ka count pata ho
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// while — jab condition-based loop chahiye
let count = 0;
while (count < 5) {
  console.log(count);
  count++;
}

// do...while — kam se kam ek baar execute hoga
let num = 10;
do {
  console.log(num); // 10 (ek baar chalega even though condition false hai)
  num++;
} while (num < 5);
```

### Modern Loops

```javascript
const fruits = ["apple", "banana", "cherry"];

// for...of — Arrays aur Iterables ke liye (USE ✅)
for (const fruit of fruits) {
  console.log(fruit); // "apple", "banana", "cherry"
}

// for...in — Objects ke keys iterate karne ke liye
const person = { name: "Hariom", age: 25, city: "Delhi" };
for (const key in person) {
  console.log(`${key}: ${person[key]}`);
  // "name: Hariom", "age: 25", "city: Delhi"
}

// ⚠️ for...in arrays par MAT use karo — for...of use karo
// for...in prototype chain ke properties bhi iterate karta hai
```

### Loop Control

```javascript
// break — loop se bahar nikalna
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  console.log(i); // 0, 1, 2, 3, 4
}

// continue — current iteration skip karna
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) continue; // even numbers skip
  console.log(i); // 1, 3, 5, 7, 9
}

// Labeled loops — nested loops mein useful
outer: for (let i = 0; i < 3; i++) {
  inner: for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) break outer; // outer loop se bahar
    console.log(`${i}-${j}`);
  }
}
// Output: 0-0, 0-1, 0-2, 1-0
```

---

## 7️⃣ String Methods — Important Ones

```javascript
let str = "  Hello, World!  ";

// Basics
str.length;                  // 17 (spaces bhi count honge)
str.trim();                  // "Hello, World!" (dono taraf se spaces hatao)
str.trimStart();             // "Hello, World!  "
str.trimEnd();               // "  Hello, World!"

// Case
str.toUpperCase();           // "  HELLO, WORLD!  "
str.toLowerCase();           // "  hello, world!  "

// Search
str.includes("World");       // true
str.startsWith("  Hello");   // true
str.endsWith("!  ");         // true
str.indexOf("World");        // 9 (index return karta hai, -1 agar nahi mila)

// Extract
str.slice(2, 7);             // "Hello" (start, end — end included nahi)
str.substring(2, 7);         // "Hello" (similar to slice)

// Replace
str.replace("World", "JS");     // "  Hello, JS!  " (pehla match)
str.replaceAll("l", "L");       // "  HeLLo, WorLd!  " (sab replace)

// Split
"a,b,c".split(",");          // ["a", "b", "c"]
"hello".split("");           // ["h", "e", "l", "l", "o"]

// Repeat & Pad
"ha".repeat(3);              // "hahaha"
"5".padStart(3, "0");        // "005" (useful for formatting)
"5".padEnd(3, "0");          // "500"

// Template Literals (BAHUT important — interviews mein use karo)
let name = "Hariom";
let age = 25;
let message = `My name is ${name} and I am ${age} years old.
This is a multi-line string.
I can do math: ${2 + 3} = 5`;
```

---

## 🧠 Key Takeaways (Yaad Rakhna!)

| Concept | Remember This |
|---------|--------------|
| `var` vs `let` vs `const` | `const` > `let` > `var` (never) |
| `typeof null` | `"object"` — JS bug |
| `typeof NaN` | `"number"` — counterintuitive |
| `==` vs `===` | Hamesha `===` use karo |
| `\|\|` vs `??` | `??` sirf null/undefined check karta hai |
| Falsy values | `false`, `0`, `""`, `null`, `undefined`, `NaN` |
| `[]` truthy hai? | YES! Empty array truthy hai |
| `for...of` vs `for...in` | `of` = values (arrays), `in` = keys (objects) |

---

## 📝 Next Step
Ab `exercises/01-basics-exercises.js` file open karo aur exercises solve karo! Solutions `exercises/01-basics-solutions.js` mein hain — but pehle KHUD try karo!
