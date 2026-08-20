# 📘 Module 1.1 — JavaScript Deep Dive

## Lesson 2: Functions & Scope (Declarations, Expressions, Arrow, Closures, Hoisting, IIFE)

> **Difficulty:** 🟡 Intermediate  
> **Time:** ~3-4 hours  
> **Goal:** Functions ke har type samajhna, scope chain, closures, hoisting — yeh sab interview mein 100% pucha jaata hai

---

## 1️⃣ Function Declaration vs Expression vs Arrow

### Function Declaration

```javascript
// ✅ Hoisted — puri function upar uth jaati hai (call before define works!)
sayHello(); // ✅ "Hello!" — error nahi aata!

function sayHello() {
  console.log("Hello!");
}

// Key points:
// - `function` keyword se shuru hota hai
// - Hoisted hota hai (file mein upar call kar sakte ho define se pehle)
// - Has its own `this`
// - Has `arguments` object
```

### Function Expression

```javascript
// ❌ NOT hoisted — pehle define karo, phir call karo
// greet(); // ❌ ReferenceError: Cannot access 'greet' before initialization

const greet = function (name) {
  console.log(`Hello, ${name}!`);
};

greet("Hariom"); // ✅ "Hello, Hariom!"

// Named function expression (debugging mein helpful)
const factorial = function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1); // Andar apne naam se call kar sakta hai
};
console.log(factorial(5)); // 120
// fact(5); // ❌ ReferenceError — bahar accessible nahi hai
```

### Arrow Functions (ES6+) — SABSE IMPORTANT ⭐

```javascript
// Basic arrow function
const add = (a, b) => {
  return a + b;
};

// Short syntax — agar ek expression return karna hai toh curly braces aur return hatao
const addShort = (a, b) => a + b;

// Ek parameter ho toh parentheses bhi optional
const double = (n) => n * 2;
// ya: const double = n => n * 2; // dono chalenge

// Zero parameters — parentheses ZAROORI
const getRandom = () => Math.random();

// Object return karna hai toh parentheses mein wrap karo ⚠️
const createUser = (name, age) => ({ name, age }); // ✅
// const createUser = (name, age) => { name, age }; // ❌ Yeh block samjhega, object nahi

console.log(createUser("Hariom", 25)); // { name: "Hariom", age: 25 }
```

### Arrow vs Regular — KEY DIFFERENCES 🔑

```javascript
// DIFFERENCE 1: `this` binding
const person = {
  name: "Hariom",

  // Regular function — `this` = object jisne call kiya
  greetRegular: function () {
    console.log(`Regular: Hello, ${this.name}`);
  },

  // Arrow function — `this` = surrounding scope ka `this` (lexical this)
  greetArrow: () => {
    console.log(`Arrow: Hello, ${this.name}`); // ⚠️ `this` yahan parent scope ka hai
  },

  // Real problem — setTimeout mein
  delayedGreetProblem: function () {
    setTimeout(function () {
      console.log(`Problem: ${this.name}`); // ❌ undefined — `this` lost ho gaya
    }, 100);
  },

  delayedGreetSolution: function () {
    setTimeout(() => {
      console.log(`Solution: ${this.name}`); // ✅ "Hariom" — arrow function ne `this` inherit kiya
    }, 100);
  },
};

person.greetRegular(); // "Regular: Hello, Hariom" ✅
person.greetArrow(); // "Arrow: Hello, undefined" ❌ (arrow mein `this` window/global hai)
person.delayedGreetProblem(); // "Problem: undefined" ❌
person.delayedGreetSolution(); // "Solution: Hariom" ✅

// DIFFERENCE 2: Arrow functions mein `arguments` object nahi hota
function regularFn() {
  console.log(arguments); // ✅ [1, 2, 3] — works
}
regularFn(1, 2, 3);

const arrowFn = () => {
  // console.log(arguments); // ❌ ReferenceError
};

// Arrow mein rest parameters use karo instead:
const arrowWithRest = (...args) => {
  console.log(args); // ✅ [1, 2, 3]
};
arrowWithRest(1, 2, 3);

// DIFFERENCE 3: Arrow function constructor nahi ban sakta
// const Foo = () => {};
// new Foo(); // ❌ TypeError: Foo is not a constructor
```

### 🏆 Kab Kya Use Karo?

| Situation | Use This |
|-----------|----------|
| Object methods | Regular function (`this` chahiye) |
| Callbacks (map, filter, setTimeout) | Arrow function ✅ |
| Event handlers | Depends (DOM `this` chahiye toh regular) |
| Constructors | Regular function / class |
| Short one-liners | Arrow function ✅ |
| Test framework steps | Arrow function ✅ |

---

## 2️⃣ Parameters — Default, Rest, Spread

### Default Parameters

```javascript
// Old way (ES5) — avoid
function greetOld(name) {
  name = name || "Guest"; // ⚠️ Problem: "" ya 0 pass karo toh bhi "Guest" aa jaayega
  console.log(`Hello, ${name}`);
}

// Modern way (ES6+) — use this ✅
function greetNew(name = "Guest") {
  console.log(`Hello, ${name}`);
}

greetNew(); // "Hello, Guest"
greetNew("Hariom"); // "Hello, Hariom"
greetNew(""); // "Hello, " — empty string pass hua, default nahi laga ✅

// Default parameters expressions bhi ho sakti hain
function createId(prefix = "USER", id = Date.now()) {
  return `${prefix}_${id}`;
}
```

### Rest Parameters (...rest)

```javascript
// Baaki ke saare arguments ek array mein collect karo
function sum(first, second, ...rest) {
  console.log("first:", first); // 1
  console.log("second:", second); // 2
  console.log("rest:", rest); // [3, 4, 5]

  let total = first + second;
  for (const num of rest) {
    total += num;
  }
  return total;
}

console.log(sum(1, 2, 3, 4, 5)); // 15

// ⚠️ Rest parameter HAMESHA last mein hona chahiye
// function bad(a, ...rest, b) {} // ❌ SyntaxError
```

### Spread Operator (...spread)

```javascript
// Arrays ko "spread" (failana) karta hai
const nums1 = [1, 2, 3];
const nums2 = [4, 5, 6];

// Array merge
const merged = [...nums1, ...nums2]; // [1, 2, 3, 4, 5, 6]

// Array copy (shallow)
const copy = [...nums1]; // [1, 2, 3] — independent copy

// Function call mein
console.log(Math.max(...nums1)); // 3 (Math.max(1, 2, 3))

// Objects mein spread
const defaults = { theme: "dark", lang: "en", fontSize: 14 };
const userPrefs = { lang: "hi", fontSize: 16 };
const config = { ...defaults, ...userPrefs };
// { theme: "dark", lang: "hi", fontSize: 16 }
// Baad wala overwrite karta hai! (right to left)

// Object copy (shallow)
const original = { a: 1, b: { c: 2 } };
const shallowCopy = { ...original };
shallowCopy.a = 10; // original.a still 1 ✅
shallowCopy.b.c = 20; // ⚠️ original.b.c ALSO becomes 20! (shallow copy)
```

### Rest vs Spread — Confuse Mat Hona!

```javascript
// SPREAD — values ko FAILATA hai (function call / array/object literal mein)
const arr = [1, 2, 3];
console.log(...arr); // 1 2 3 (spread)
const newArr = [...arr, 4]; // [1, 2, 3, 4] (spread in array)

// REST — values ko IKATTHA karta hai (function parameters / destructuring mein)
function test(...args) {
  // args = [1, 2, 3] (rest — collect)
}
test(1, 2, 3);

const [first, ...remaining] = [1, 2, 3, 4];
// first = 1, remaining = [2, 3, 4] (rest in destructuring)
```

---

## 3️⃣ Scope — Lexical Scope Chain

### 3 Types of Scope

```javascript
// 1. GLOBAL SCOPE — file level (sabse bahar)
const globalVar = "I'm global"; // Har jagah accessible

function outerFunction() {
  // 2. FUNCTION SCOPE — function ke andar
  const functionVar = "I'm in outerFunction";

  if (true) {
    // 3. BLOCK SCOPE — { } ke andar (sirf let/const ke liye)
    const blockVar = "I'm in block";
    let alsoBlock = "Me too";
    var notBlock = "I'm NOT block-scoped!"; // var block scope follow nahi karta ⚠️

    console.log(globalVar); // ✅ accessible
    console.log(functionVar); // ✅ accessible
    console.log(blockVar); // ✅ accessible
  }

  console.log(globalVar); // ✅ accessible
  console.log(functionVar); // ✅ accessible
  // console.log(blockVar); // ❌ ReferenceError
  console.log(notBlock); // ✅ var block se bahar bhi accessible! 😱
}
```

### Scope Chain — Kaise Value Dhundhta Hai JS

```javascript
const x = "global";

function outer() {
  const x = "outer";

  function middle() {
    const x = "middle";

    function inner() {
      // const x = "inner"; // Agar yeh uncomment karo toh "inner" print hoga
      console.log(x);
      // JS pehle current scope check karta hai
      // Nahi mila → parent scope (middle) → "middle" mil gaya! ✅
      // Agar middle mein bhi nahi hota → outer → global → error
    }

    inner();
  }

  middle();
}

outer(); // "middle"
```

---

## 4️⃣ Hoisting — JS Ka Magic Trick 🪄

Hoisting matlab JS declarations ko code execute hone se PEHLE upar le jaata hai.

### Variable Hoisting

```javascript
// 🔴 var — hoisted with value `undefined`
console.log(a); // undefined (error NAHI — hoisted!)
var a = 10;
console.log(a); // 10

// JS internally aise dekhta hai:
// var a;              ← declaration upar gayi
// console.log(a);     ← undefined
// a = 10;             ← assignment apni jagah rahi
// console.log(a);     ← 10

// 🟢 let/const — hoisted but in "Temporal Dead Zone" (TDZ)
// console.log(b); // ❌ ReferenceError: Cannot access 'b' before initialization
let b = 20;
console.log(b); // 20

// TDZ = zone between hoisting and actual declaration
// let b;          ← hoisted (but TDZ starts)
// ... TDZ zone ...
// let b = 20;     ← TDZ ends, value assigned
```

### Function Hoisting

```javascript
// 🟢 Function DECLARATIONS are fully hoisted (function + body dono)
sayHi(); // ✅ "Hi!" — works before declaration!

function sayHi() {
  console.log("Hi!");
}

// 🔴 Function EXPRESSIONS are NOT hoisted (sirf variable hoist hota hai)
// sayBye(); // ❌ TypeError: sayBye is not a function (var hota) ya ReferenceError (let/const hota)

const sayBye = function () {
  console.log("Bye!");
};

sayBye(); // ✅ "Bye!" — yahan chalega

// 🔴 Arrow functions bhi NOT hoisted (expression hai)
// greet(); // ❌ ReferenceError
const greet = () => console.log("Hello!");
```

### Hoisting Quiz — Predict the Output 🧠

```javascript
// Quiz 1
var x = 1;
function foo() {
  console.log(x); // Kya aayega? 🤔
  var x = 2;
  console.log(x); // Kya aayega?
}
foo();
// Answer: undefined, 2
// Kyunki: var x function scope mein hoist hua → undefined

// Quiz 2
function bar() {
  a = 10; // var/let/const nahi lagaya → GLOBAL variable ban gaya! ⚠️
}
bar();
console.log(a); // 10 (global pollution — VERY BAD practice!)

// Quiz 3
console.log(typeof undeclaredVar); // "undefined" (error nahi aata typeof ke saath!)
// console.log(undeclaredVar); // ❌ ReferenceError
```

---

## 5️⃣ Closures — INTERVIEW KA FAVOURITE ⭐⭐⭐

Closure = function + uska surrounding scope (lexical environment)

Jab ek function return hota hai ya pass hota hai, woh apne parent scope ki variables ko yaad rakhta hai, even after parent function execute ho chuka ho.

### Basic Closure

```javascript
function createGreeter(greeting) {
  // `greeting` yahan closure mein capture ho gaya
  return function (name) {
    console.log(`${greeting}, ${name}!`);
    // `greeting` parent function ka hai — but yeh function ise yaad rakhta hai
  };
}

const sayHello = createGreeter("Hello");
const sayNamaste = createGreeter("Namaste");

sayHello("Hariom"); // "Hello, Hariom!"
sayNamaste("Hariom"); // "Namaste, Hariom!"
// createGreeter already execute ho chuka hai — but greeting variable abhi bhi accessible hai!
// THIS IS CLOSURE 🎯
```

### Counter — Classic Closure Example

```javascript
function createCounter() {
  let count = 0; // Private variable — bahar se access nahi ho sakta

  return {
    increment: function () {
      count++;
      return count;
    },
    decrement: function () {
      count--;
      return count;
    },
    getCount: function () {
      return count;
    },
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.increment()); // 3
console.log(counter.decrement()); // 2
console.log(counter.getCount()); // 2

// count variable ko directly access nahi kar sakte
// console.log(counter.count); // undefined — private hai!

// Har createCounter() call se NAYA independent counter banta hai
const counter2 = createCounter();
console.log(counter2.getCount()); // 0 (independent hai counter se)
```

### Closure + Loop — THE CLASSIC INTERVIEW TRAP 🪤

```javascript
// ❌ PROBLEM with var
function buggyTimers() {
  for (var i = 0; i < 3; i++) {
    setTimeout(function () {
      console.log(i); // 3, 3, 3 ← WTF?!
    }, 100);
  }
  // Kyun? Kyunki var function-scoped hai.
  // Jab setTimeout callback execute hota hai, loop khatam ho chuka hai aur i = 3
  // Teeno callbacks SAME `i` ko reference karte hain (closure!)
}

// ✅ FIX 1: let use karo (har iteration ka apna i hota hai)
function fixedWithLet() {
  for (let i = 0; i < 3; i++) {
    setTimeout(function () {
      console.log(i); // 0, 1, 2 ✅
    }, 100);
  }
}

// ✅ FIX 2: IIFE se closure banao (ES5 way — interview ke liye jaano)
function fixedWithIIFE() {
  for (var i = 0; i < 3; i++) {
    (function (j) {
      // j har iteration mein naya copy hai
      setTimeout(function () {
        console.log(j); // 0, 1, 2 ✅
      }, 100);
    })(i); // i ko j mein pass kar diya
  }
}
```

### Real-World Closure Uses

```javascript
// 1. MEMOIZATION — expensive calculations cache karo
function memoize(fn) {
  const cache = {}; // Closure mein cache stored hai

  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key] !== undefined) {
      console.log("📦 Cache hit!");
      return cache[key];
    }
    console.log("🔄 Computing...");
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const expensiveAdd = memoize((a, b) => a + b);
console.log(expensiveAdd(1, 2)); // 🔄 Computing... 3
console.log(expensiveAdd(1, 2)); // 📦 Cache hit! 3
console.log(expensiveAdd(3, 4)); // 🔄 Computing... 7

// 2. PRIVATE VARIABLES — data hide karo
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private!
  const transactions = []; // Private!

  return {
    deposit(amount) {
      if (amount <= 0) throw new Error("Invalid amount");
      balance += amount;
      transactions.push({ type: "deposit", amount, date: new Date() });
      return balance;
    },
    withdraw(amount) {
      if (amount <= 0) throw new Error("Invalid amount");
      if (amount > balance) throw new Error("Insufficient funds");
      balance -= amount;
      transactions.push({ type: "withdraw", amount, date: new Date() });
      return balance;
    },
    getBalance() {
      return balance;
    },
    getTransactions() {
      return [...transactions]; // Copy return karo, original nahi
    },
  };
}

const account = createBankAccount(1000);
account.deposit(500); // 1500
account.withdraw(200); // 1300
console.log(account.getBalance()); // 1300
// account.balance → undefined (private hai!)

// 3. FUNCTION FACTORIES — customized functions banana
function createMultiplier(multiplier) {
  return (number) => number * multiplier;
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const tenX = createMultiplier(10);

console.log(double(5)); // 10
console.log(triple(5)); // 15
console.log(tenX(5)); // 50
```

---

## 6️⃣ IIFE — Immediately Invoked Function Expression

Function declare karo aur TURANT execute karo.

```javascript
// Basic IIFE
(function () {
  console.log("I run immediately!");
})();

// Arrow function IIFE
(() => {
  console.log("Arrow IIFE!");
})();

// With parameters
(function (name) {
  console.log(`Hello, ${name}!`);
})("Hariom");

// IIFE with return value
const result = (function () {
  const secret = 42;
  return secret * 2;
})();
console.log(result); // 84

// IIFE ka USE CASE: Module pattern (ES Modules se pehle ka tarika)
const myModule = (function () {
  // Private variables
  let privateVar = "I'm private";
  let count = 0;

  // Private function
  function privateMethod() {
    return `Secret: ${privateVar}`;
  }

  // Public API return karo
  return {
    publicMethod() {
      count++;
      return `${privateMethod()} (called ${count} times)`;
    },
    getCount() {
      return count;
    },
  };
})();

console.log(myModule.publicMethod()); // "Secret: I'm private (called 1 times)"
console.log(myModule.publicMethod()); // "Secret: I'm private (called 2 times)"
// myModule.privateVar → undefined
// myModule.privateMethod → undefined
```

---

## 7️⃣ Higher-Order Functions (HOF)

Higher-Order Function = ek function jo:
- Dusre function ko **argument** ke roop mein leta hai, YA
- Ek function **return** karta hai

```javascript
// 1. Function as argument (callbacks)
function processArray(arr, callback) {
  const results = [];
  for (const item of arr) {
    results.push(callback(item));
  }
  return results;
}

const numbers = [1, 2, 3, 4, 5];
const doubled = processArray(numbers, (n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const stringified = processArray(numbers, (n) => `Number: ${n}`);
console.log(stringified); // ["Number: 1", "Number: 2", ...]

// 2. Function as return value
function createValidator(minLength) {
  return function (str) {
    return str.length >= minLength;
  };
}

const isLongEnough = createValidator(5);
console.log(isLongEnough("Hi")); // false
console.log(isLongEnough("Hello World")); // true

// 3. Real-world HOF: Retry function
function withRetry(fn, maxRetries = 3) {
  return function (...args) {
    let lastError;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return fn(...args);
      } catch (error) {
        lastError = error;
        console.log(`Attempt ${attempt} failed: ${error.message}`);
      }
    }
    throw new Error(`All ${maxRetries} attempts failed. Last error: ${lastError.message}`);
  };
}

// Usage:
let callCount = 0;
const unreliableFunction = () => {
  callCount++;
  if (callCount < 3) throw new Error("Not ready yet!");
  return "Success!";
};

const reliableFunction = withRetry(unreliableFunction, 5);
console.log(reliableFunction()); // Attempt 1 failed, Attempt 2 failed, "Success!"
```

---

## 8️⃣ `this` Keyword — Deep Understanding

```javascript
// Rule 1: Global context mein
console.log(this); // Browser: window, Node: {} (module scope)

// Rule 2: Regular function mein — WHO CALLED IT? (dynamic binding)
function showThis() {
  console.log(this);
}
showThis(); // Global/undefined (strict mode)

const obj = { name: "Hariom", show: showThis };
obj.show(); // { name: "Hariom", show: f } ← obj ne call kiya toh this = obj

// Rule 3: Arrow function mein — SURROUNDING SCOPE ka this (lexical binding)
const obj2 = {
  name: "Hariom",
  regular: function () {
    console.log("Regular:", this.name); // "Hariom"
  },
  arrow: () => {
    console.log("Arrow:", this.name); // undefined (parent scope ka this)
  },
  nested: function () {
    // Problem
    setTimeout(function () {
      console.log("setTimeout regular:", this.name); // undefined ❌
    }, 100);
    // Solution
    setTimeout(() => {
      console.log("setTimeout arrow:", this.name); // "Hariom" ✅
    }, 100);
  },
};

// Rule 4: Explicit binding — call, apply, bind
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const user = { name: "Hariom" };

greet.call(user, "Hello", "!"); // "Hello, Hariom!" — call: args comma-separated
greet.apply(user, ["Hello", "!"]); // "Hello, Hariom!" — apply: args array mein
const boundGreet = greet.bind(user, "Hello"); // bind: naya function return karta hai
boundGreet("!"); // "Hello, Hariom!"
```

---

## 🧠 Key Takeaways

| Concept | Remember This |
|---------|--------------|
| Declaration vs Expression | Declaration hoisted, Expression nahi |
| Arrow function `this` | Surrounding scope ka `this` inherit karta hai |
| Arrow mein no `arguments` | `...rest` use karo instead |
| Closure | Function + its lexical scope = closure |
| `var` in loop + setTimeout | 3,3,3 problem — `let` se fix hota hai |
| IIFE | `(function(){})()` — immediate execution + scope isolation |
| HOF | Function as argument ya return value |
| `this` rules | Regular: caller decides. Arrow: parent scope decides |

---

## 📝 Next Step
Ab `exercises/02-functions-exercises.js` solve karo! Closures aur hoisting ke exercises bahut important hain.
