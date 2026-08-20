/**
 * ============================================================
 * 📝 Module 1.1 — Exercise 02: Functions & Scope
 * ============================================================
 *
 * Instructions:
 * - Har exercise mein TODO hai — wahan apna code likho
 * - Run: node exercises/02-functions-exercises.js
 * - Pehle PREDICT karo, phir run karo
 * - Solutions: exercises/02-functions-solutions.js
 *
 * ============================================================
 */

// ====================================
// SECTION 1: Function Types
// ====================================

/**
 * Exercise 1.1 — Convert to Arrow Functions
 *
 * Niche regular functions hain. Inhe arrow functions mein convert karo.
 * Jahan possible ho, shortest syntax use karo.
 */
function exercise1_1() {
  console.log("\n--- Exercise 1.1: Convert to Arrow Functions ---");

  // Convert these to arrow functions:

  // A. Simple function
  function square(n) {
    return n * n;
  }
  // TODO: const squareArrow = ???

  // B. Function with multiple params
  function fullName(first, last) {
    return `${first} ${last}`;
  }
  // TODO: const fullNameArrow = ???

  // C. Function that returns an object
  function createUser(name, age) {
    return { name: name, age: age };
  }
  // TODO: const createUserArrow = ???

  // D. Function with no params
  function getTimestamp() {
    return Date.now();
  }
  // TODO: const getTimestampArrow = ???

  // E. Function with a body (multiple statements)
  function processScore(score) {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    return "F";
  }
  // TODO: const processScoreArrow = ???

  // Test your conversions:
  console.log("square(5):", square(5)); // 25
  // console.log("squareArrow(5):", squareArrow(5)); // 25

  console.log("fullName('Hari', 'Om'):", fullName("Hari", "Om"));
  // console.log("fullNameArrow('Hari', 'Om'):", fullNameArrow("Hari", "Om"));

  console.log("createUser('Hariom', 25):", createUser("Hariom", 25));
  // console.log("createUserArrow('Hariom', 25):", createUserArrow("Hariom", 25));
}

/**
 * Exercise 1.2 — Default & Rest Parameters
 *
 * Functions likho jo default aur rest parameters use kare.
 */
function exercise1_2() {
  console.log("\n--- Exercise 1.2: Default & Rest Parameters ---");

  // TODO 1: Ek function likho `greet(name, greeting)` jahan:
  //   - default greeting = "Hello"
  //   - return kare: "{greeting}, {name}!"
  // function greet(???) { ??? }

  // console.log(greet("Hariom"));            // "Hello, Hariom!"
  // console.log(greet("Hariom", "Namaste")); // "Namaste, Hariom!"

  // TODO 2: Ek function likho `sum(...numbers)` jo saare numbers ka sum return kare
  // Rest parameters use karo
  // function sum(???) { ??? }

  // console.log(sum(1, 2, 3));       // 6
  // console.log(sum(10, 20, 30, 40)); // 100
  // console.log(sum());               // 0

  // TODO 3: Ek function likho `mergeObjects(...objects)` jo saare objects merge kare
  // Spread aur rest dono use karo
  // function mergeObjects(???) { ??? }

  // console.log(mergeObjects({a: 1}, {b: 2}, {c: 3})); // {a: 1, b: 2, c: 3}
  // console.log(mergeObjects({x: 1, y: 2}, {y: 3, z: 4})); // {x: 1, y: 3, z: 4}
}

// ====================================
// SECTION 2: Scope
// ====================================

/**
 * Exercise 2.1 — Scope Chain Prediction
 *
 * Har console.log ka output predict karo WITHOUT running.
 * Niche apni predictions comments mein likho, phir verify karo.
 */
function exercise2_1() {
  console.log("\n--- Exercise 2.1: Scope Chain ---");

  const x = "global";

  function outer() {
    const x = "outer";

    function inner() {
      console.log("A:", x); // Predict: ?
    }

    inner();
    console.log("B:", x); // Predict: ?
  }

  outer();
  console.log("C:", x); // Predict: ?

  // TODO: Apni predictions likho:
  // A: ?
  // B: ?
  // C: ?
}

/**
 * Exercise 2.2 — Tricky Scope Quiz
 *
 * Har snippet ka output predict karo.
 */
function exercise2_2() {
  console.log("\n--- Exercise 2.2: Tricky Scope ---");

  // Quiz 1:
  let a = 1;
  function change() {
    a = 2;
    let b = 3;
  }
  change();
  console.log("Quiz 1 — a:", a); // Predict: ?
  // console.log("Quiz 1 — b:", b); // Predict: ? (uncomment karke dekho)

  // Quiz 2:
  let count = 0;
  function increment() {
    let count = 10; // Yeh naya count hai ya same?
    count++;
    console.log("Quiz 2 — inner count:", count); // Predict: ?
  }
  increment();
  console.log("Quiz 2 — outer count:", count); // Predict: ?

  // Quiz 3:
  for (let i = 0; i < 3; i++) {
    // i yahan accessible hai
  }
  // console.log("Quiz 3 — i:", i); // Predict: ? (uncomment karke dekho)
}

// ====================================
// SECTION 3: Hoisting
// ====================================

/**
 * Exercise 3.1 — Hoisting Prediction Challenge
 *
 * SABSE IMPORTANT exercise — interviews mein 100% pucha jaata hai!
 * Har snippet ka output predict karo WITHOUT running.
 */
function exercise3_1() {
  console.log("\n--- Exercise 3.1: Hoisting Challenge ---");

  // Quiz 1:
  console.log("Q1:", typeof myFunc);
  function myFunc() {
    return "hello";
  }
  // Predict: ?

  // Quiz 2:
  console.log("Q2:", typeof myArrow);
  var myArrow = () => "hello";
  // Predict: ?

  // Quiz 3:
  var x = 1;
  function foo() {
    console.log("Q3a:", x);
    var x = 2;
    console.log("Q3b:", x);
  }
  foo();
  // Predict Q3a: ?
  // Predict Q3b: ?

  // Quiz 4:
  function bar() {
    console.log("Q4a:", a);
    console.log("Q4b:", b);
    var a = 1;
    let b = 2; // Yeh line par kya hoga?
  }
  // bar(); // ← Uncomment karke dekho kya hota hai
  // Predict: ?
}

// ====================================
// SECTION 4: Closures ⭐⭐⭐
// ====================================

/**
 * Exercise 4.1 — Build a Counter with Closures
 *
 * Ek counter factory function banao jo:
 * - increment() — count +1 kare aur naya count return kare
 * - decrement() — count -1 kare aur naya count return kare
 * - reset() — count ko initial value par reset kare
 * - getCount() — current count return kare
 */
function exercise4_1() {
  console.log("\n--- Exercise 4.1: Counter Factory ---");

  // TODO: createCounter function implement karo
  function createCounter(initialValue = 0) {
    // Apna code yahan likho
    return {
      increment() {},
      decrement() {},
      reset() {},
      getCount() {},
    };
  }

  // Tests:
  const counter = createCounter(10);
  console.log(counter.getCount()); // Expected: 10
  console.log(counter.increment()); // Expected: 11
  console.log(counter.increment()); // Expected: 12
  console.log(counter.decrement()); // Expected: 11
  counter.reset();
  console.log(counter.getCount()); // Expected: 10

  // Independent counter
  const counter2 = createCounter();
  console.log(counter2.getCount()); // Expected: 0
  console.log(counter2.increment()); // Expected: 1
}

/**
 * Exercise 4.2 — Rate Limiter with Closures
 *
 * Ek function banao `createRateLimiter(maxCalls, timeWindowMs)` jo:
 * - Ek function return kare jo given time window mein sirf maxCalls baar call ho sake
 * - Agar limit exceed ho toh "Rate limit exceeded" return kare
 * - Agar limit mein ho toh original function ka result return kare
 */
function exercise4_2() {
  console.log("\n--- Exercise 4.2: Rate Limiter ---");

  // TODO: createRateLimiter implement karo
  function createRateLimiter(fn, maxCalls, timeWindowMs) {
    // Hint: ek array mein timestamps store karo
    // Har call par purane timestamps hatao jo timeWindowMs se zyada purane hain
    // Agar remaining calls < maxCalls toh fn execute karo, warna reject karo

    return function (...args) {
      // Apna code yahan likho
      return "Not implemented";
    };
  }

  // Test:
  const limitedLog = createRateLimiter(
    (msg) => `Logged: ${msg}`,
    3, // Max 3 calls
    1000 // per 1 second
  );

  console.log(limitedLog("first")); // "Logged: first"
  console.log(limitedLog("second")); // "Logged: second"
  console.log(limitedLog("third")); // "Logged: third"
  console.log(limitedLog("fourth")); // "Rate limit exceeded"
}

/**
 * Exercise 4.3 — Memoize Function
 *
 * Ek memoize function banao jo:
 * - Expensive function ka result cache kare
 * - Same arguments ke liye cached result return kare
 * - Cache hit/miss log kare
 */
function exercise4_3() {
  console.log("\n--- Exercise 4.3: Memoize ---");

  // TODO: memoize function implement karo
  function memoize(fn) {
    // Hint: ek object/Map use karo as cache
    // Key: arguments ko string mein convert karo (JSON.stringify)
    // Value: function ka result

    return function (...args) {
      // Apna code yahan likho
      return fn(...args); // Replace with memoized version
    };
  }

  // Expensive function to memoize
  function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }

  // Test without memoization
  console.time("Without memo");
  console.log("fib(35):", fibonacci(35));
  console.timeEnd("Without memo");

  // Test with memoization
  const memoFib = memoize(function fib(n) {
    if (n <= 1) return n;
    return memoFib(n - 1) + memoFib(n - 2); // memoFib call karo, fib nahi!
  });

  console.time("With memo (1st)");
  console.log("memoFib(35):", memoFib(35));
  console.timeEnd("With memo (1st)");

  console.time("With memo (2nd)");
  console.log("memoFib(35):", memoFib(35)); // Instant!
  console.timeEnd("With memo (2nd)");
}

/**
 * Exercise 4.4 — Closure + Loop Classic Trap 🪤
 *
 * Niche code hai jo expected output nahi deta. Fix karo 3 different ways mein.
 */
function exercise4_4() {
  console.log("\n--- Exercise 4.4: Closure + Loop Trap ---");

  // BUGGY CODE — yeh 3,3,3 print karta hai. Fix karo taaki 0,1,2 aaye.
  console.log("Buggy (var):");
  for (var i = 0; i < 3; i++) {
    setTimeout(function () {
      console.log("  buggy:", i);
    }, 100);
  }

  // TODO FIX 1: let use karo
  // console.log("Fix 1 (let):");
  // ???

  // TODO FIX 2: IIFE use karo (var ke saath)
  // console.log("Fix 2 (IIFE):");
  // ???

  // TODO FIX 3: Closure function banao (var ke saath)
  // Hint: ek alag function banao jo i accept kare aur setTimeout return kare
  // console.log("Fix 3 (closure function):");
  // ???
}

// ====================================
// SECTION 5: Higher-Order Functions
// ====================================

/**
 * Exercise 5.1 — Build Your Own map, filter, reduce
 *
 * Array.prototype.map, filter, reduce KHUD implement karo.
 * Built-in methods use mat karo!
 */
function exercise5_1() {
  console.log("\n--- Exercise 5.1: Custom map/filter/reduce ---");

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // TODO 1: Custom map function
  function myMap(arr, callback) {
    // Ek naya array banao
    // Har element par callback call karo
    // Result naye array mein daalo
    // Naya array return karo
    return []; // Replace with your implementation
  }

  console.log("myMap doubled:", myMap(numbers, (n) => n * 2));
  // Expected: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

  // TODO 2: Custom filter function
  function myFilter(arr, callback) {
    // Ek naya array banao
    // Har element par callback call karo
    // Agar callback true return kare toh element naye array mein daalo
    // Naya array return karo
    return []; // Replace with your implementation
  }

  console.log("myFilter evens:", myFilter(numbers, (n) => n % 2 === 0));
  // Expected: [2, 4, 6, 8, 10]

  // TODO 3: Custom reduce function
  function myReduce(arr, callback, initialValue) {
    // accumulator set karo (initialValue ya arr[0])
    // Har element par callback(accumulator, currentValue) call karo
    // Final accumulator return karo
    return 0; // Replace with your implementation
  }

  console.log("myReduce sum:", myReduce(numbers, (acc, n) => acc + n, 0));
  // Expected: 55

  console.log(
    "myReduce max:",
    myReduce(numbers, (acc, n) => (n > acc ? n : acc), -Infinity)
  );
  // Expected: 10
}

/**
 * Exercise 5.2 — Function Composition
 *
 * Ek `compose` function banao jo multiple functions ko right-to-left compose kare.
 * Ek `pipe` function banao jo left-to-right compose kare.
 */
function exercise5_2() {
  console.log("\n--- Exercise 5.2: Compose & Pipe ---");

  const add10 = (x) => x + 10;
  const multiply2 = (x) => x * 2;
  const subtract5 = (x) => x - 5;

  // TODO: compose function banao (right-to-left execution)
  // compose(f, g, h)(x) = f(g(h(x)))
  function compose(...fns) {
    return function (value) {
      // Hint: fns ko REVERSE order mein execute karo
      return value; // Replace with your implementation
    };
  }

  // TODO: pipe function banao (left-to-right execution)
  // pipe(f, g, h)(x) = h(g(f(x)))
  function pipe(...fns) {
    return function (value) {
      // Hint: fns ko LEFT to RIGHT execute karo
      return value; // Replace with your implementation
    };
  }

  // compose: subtract5 → multiply2 → add10 → value
  // = add10(multiply2(subtract5(5)))
  // = add10(multiply2(0))
  // = add10(0)
  // = 10
  const composedFn = compose(add10, multiply2, subtract5);
  console.log("compose(5):", composedFn(5)); // Expected: 10

  // pipe: value → add10 → multiply2 → subtract5
  // = subtract5(multiply2(add10(5)))
  // = subtract5(multiply2(15))
  // = subtract5(30)
  // = 25
  const pipedFn = pipe(add10, multiply2, subtract5);
  console.log("pipe(5):", pipedFn(5)); // Expected: 25
}

// ====================================
// SECTION 6: `this` Keyword
// ====================================

/**
 * Exercise 6.1 — this Prediction
 *
 * Har console.log mein `this.name` ka value kya hoga? Predict karo.
 */
function exercise6_1() {
  console.log("\n--- Exercise 6.1: this Keyword ---");

  const hero = {
    name: "Batman",
    regularGreet: function () {
      console.log("Q1:", this.name); // Predict: ?
    },
    arrowGreet: () => {
      console.log("Q2:", this.name); // Predict: ?
    },
    delayedGreet: function () {
      setTimeout(function () {
        console.log("Q3:", this.name); // Predict: ?
      }, 10);
      setTimeout(() => {
        console.log("Q4:", this.name); // Predict: ?
      }, 10);
    },
  };

  hero.regularGreet();
  hero.arrowGreet();
  hero.delayedGreet();

  // TODO: Predictions likho:
  // Q1: ?
  // Q2: ?
  // Q3: ?
  // Q4: ?
}

/**
 * Exercise 6.2 — Fix the this Problem
 *
 * Niche ek timer object hai jismein this lost ho raha hai. Fix karo using:
 * 1. Arrow function
 * 2. bind method
 * 3. self/that pattern
 */
function exercise6_2() {
  console.log("\n--- Exercise 6.2: Fix this ---");

  // BUGGY — this.seconds undefined hai
  const timer = {
    seconds: 0,
    start: function () {
      // BUG: regular function mein `this` lost ho jaata hai
      setInterval(function () {
        this.seconds++;
        console.log("Seconds:", this.seconds); // NaN
      }, 1000);
    },
  };

  // TODO: Fix karo — teeno methods mein
  const timerFixed1 = {
    seconds: 0,
    start: function () {
      // FIX 1: Arrow function use karo
      // ???
    },
  };

  const timerFixed2 = {
    seconds: 0,
    start: function () {
      // FIX 2: bind use karo
      // ???
    },
  };

  const timerFixed3 = {
    seconds: 0,
    start: function () {
      // FIX 3: const self = this; pattern
      // ???
    },
  };

  // Uncomment to test (one at a time, Ctrl+C to stop):
  // timerFixed1.start();
}

// ====================================
// SECTION 7: COMBINED CHALLENGE 🏆
// ====================================

/**
 * Exercise 7.1 — Build a Logger with Closures
 *
 * Ek logger factory banao jo:
 * - Configurable log levels support kare: debug, info, warn, error
 * - Minimum log level set kar sake (e.g., "warn" set kiya toh debug aur info print nahi honge)
 * - Timestamp add kare har message mein
 * - Log history maintain kare (closure mein)
 * - getHistory() se saari logs return ho
 * - clear() se history clear ho
 */
function exercise7_1() {
  console.log("\n--- Exercise 7.1: Logger Factory ---");

  // TODO: createLogger implement karo
  function createLogger(minLevel = "debug") {
    // Log levels ka order: debug < info < warn < error
    // Hint: ek array mein order define karo aur indexOf se compare karo

    return {
      debug(message) {
        console.log("TODO: debug");
      },
      info(message) {
        console.log("TODO: info");
      },
      warn(message) {
        console.log("TODO: warn");
      },
      error(message) {
        console.log("TODO: error");
      },
      getHistory() {
        return [];
      },
      clear() {},
    };
  }

  // Test:
  const logger = createLogger("warn"); // Only warn and error should print

  logger.debug("This should NOT appear");
  logger.info("This should NOT appear either");
  logger.warn("Low disk space"); // Should print with timestamp
  logger.error("Database connection failed"); // Should print with timestamp

  console.log("History count:", logger.getHistory().length); // Expected: 2
  console.log("History:", logger.getHistory());

  logger.clear();
  console.log("After clear:", logger.getHistory().length); // Expected: 0
}

/**
 * Exercise 7.2 — Build an Event Emitter (ADVANCED) 🔥
 *
 * Ek simple event emitter banao jo:
 * - on(event, callback) — event listener register kare
 * - off(event, callback) — specific listener remove kare
 * - emit(event, ...data) — event fire kare aur saare listeners ko data bheje
 * - once(event, callback) — listener jo sirf EK baar chale
 */
function exercise7_2() {
  console.log("\n--- Exercise 7.2: Event Emitter ---");

  // TODO: createEventEmitter implement karo
  function createEventEmitter() {
    // Hint: ek object mein event name → callbacks array store karo
    // { "click": [fn1, fn2], "hover": [fn3] }

    return {
      on(event, callback) {
        // TODO
      },
      off(event, callback) {
        // TODO
      },
      emit(event, ...data) {
        // TODO
      },
      once(event, callback) {
        // Hint: on() use karo, but callback ke andar off() bhi call karo
        // TODO
      },
    };
  }

  // Test:
  const emitter = createEventEmitter();

  // Register listeners
  const onLogin = (user) => console.log(`${user} logged in`);
  const onLoginLog = (user) => console.log(`[LOG] Login: ${user}`);

  emitter.on("login", onLogin);
  emitter.on("login", onLoginLog);

  // Emit event
  emitter.emit("login", "Hariom");
  // Expected: "Hariom logged in"
  // Expected: "[LOG] Login: Hariom"

  // Remove one listener
  emitter.off("login", onLoginLog);
  emitter.emit("login", "Rahul");
  // Expected: "Rahul logged in" (only one handler now)

  // Once listener
  emitter.once("logout", (user) => console.log(`${user} logged out`));
  emitter.emit("logout", "Hariom"); // "Hariom logged out"
  emitter.emit("logout", "Hariom"); // Nothing (already fired once)
}

// ============================
// 🚀 RUN ALL EXERCISES
// ============================

console.log("╔══════════════════════════════════════════════╗");
console.log("║  Module 1.1 — Exercise 02: Functions & Scope ║");
console.log("╚══════════════════════════════════════════════╝");

exercise1_1();
exercise1_2();
exercise2_1();
exercise2_2();
exercise3_1();
exercise4_1();
exercise4_2();
exercise4_3();
exercise4_4();
exercise5_1();
exercise5_2();
exercise6_1();
exercise7_1();
exercise7_2();

// exercise6_2 mein timer hai — separately test karo

setTimeout(() => {
  console.log("\n✅ All exercises loaded! Solve the TODOs.");
  console.log("📁 Solutions: exercises/02-functions-solutions.js");
}, 300);
