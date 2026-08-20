/**
 * ============================================================
 * ✅ Module 1.1 — Solutions: Exercise 02 - Functions & Scope
 * ============================================================
 *
 * ⚠️  PEHLE KHUD TRY KARO! Solutions tab dekho jab stuck ho jao.
 *
 * ============================================================
 */

// ====================================
// SECTION 1: Function Types
// ====================================

function solution1_1() {
  console.log("\n--- Solution 1.1: Arrow Functions ---");

  // A. Simple (shortest syntax — ek param, ek expression)
  const squareArrow = (n) => n * n;

  // B. Multiple params
  const fullNameArrow = (first, last) => `${first} ${last}`;

  // C. Return object — parentheses mein wrap karo!
  const createUserArrow = (name, age) => ({ name, age });

  // D. No params
  const getTimestampArrow = () => Date.now();

  // E. Multiple statements — curly braces aur return chahiye
  const processScoreArrow = (score) => {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    return "F";
  };

  console.log("square(5):", squareArrow(5)); // 25
  console.log("fullName:", fullNameArrow("Hari", "Om")); // "Hari Om"
  console.log("createUser:", createUserArrow("Hariom", 25)); // {name:"Hariom",age:25}
  console.log("timestamp:", getTimestampArrow());
  console.log("grade:", processScoreArrow(85)); // "B"
}

function solution1_2() {
  console.log("\n--- Solution 1.2: Default & Rest Parameters ---");

  // 1. Default parameter
  function greet(name, greeting = "Hello") {
    return `${greeting}, ${name}!`;
  }
  console.log(greet("Hariom")); // "Hello, Hariom!"
  console.log(greet("Hariom", "Namaste")); // "Namaste, Hariom!"

  // 2. Rest parameter for sum
  function sum(...numbers) {
    let total = 0;
    for (const num of numbers) {
      total += num;
    }
    return total;
  }
  // Alternative using reduce:
  // const sum = (...numbers) => numbers.reduce((acc, n) => acc + n, 0);

  console.log(sum(1, 2, 3)); // 6
  console.log(sum(10, 20, 30, 40)); // 100
  console.log(sum()); // 0

  // 3. Merge objects with spread + rest
  function mergeObjects(...objects) {
    return Object.assign({}, ...objects);
    // Alternative: let result = {};
    // for (const obj of objects) {
    //   result = { ...result, ...obj };
    // }
    // return result;
  }
  console.log(mergeObjects({ a: 1 }, { b: 2 }, { c: 3 })); // {a:1,b:2,c:3}
  console.log(mergeObjects({ x: 1, y: 2 }, { y: 3, z: 4 })); // {x:1,y:3,z:4}
}

// ====================================
// SECTION 2: Scope
// ====================================

function solution2_1() {
  console.log("\n--- Solution 2.1: Scope Chain Answers ---");

  const x = "global";

  function outer() {
    const x = "outer";

    function inner() {
      console.log("A:", x); // "outer" — inner mein x nahi hai, parent (outer) mein dhundha
    }

    inner();
    console.log("B:", x); // "outer" — outer ka apna x
  }

  outer();
  console.log("C:", x); // "global" — global scope ka x

  // A: "outer"  — scope chain: inner → outer → found!
  // B: "outer"  — outer ka apna x
  // C: "global" — global scope ka x
}

function solution2_2() {
  console.log("\n--- Solution 2.2: Tricky Scope Answers ---");

  // Quiz 1:
  let a = 1;
  function change() {
    a = 2; // GLOBAL a ko modify kiya (let a nahi likha — same variable)
    let b = 3; // Local variable — bahar accessible nahi
  }
  change();
  console.log("Quiz 1 — a:", a); // 2 (global a changed)
  // console.log(b); // ❌ ReferenceError: b is not defined

  // Quiz 2:
  let count = 0;
  function increment() {
    let count = 10; // NAYA local count — outer count se alag!
    count++; // local count = 11
    console.log("Quiz 2 — inner count:", count); // 11
  }
  increment();
  console.log("Quiz 2 — outer count:", count); // 0 (outer count unchanged)

  // Quiz 3:
  for (let i = 0; i < 3; i++) {}
  // console.log(i); // ❌ ReferenceError — let block-scoped hai
}

// ====================================
// SECTION 3: Hoisting
// ====================================

function solution3_1() {
  console.log("\n--- Solution 3.1: Hoisting Answers ---");

  // Quiz 1:
  console.log("Q1:", typeof myFunc); // "function"
  // Function declarations are FULLY hoisted (function + body)
  function myFunc() {
    return "hello";
  }

  // Quiz 2:
  console.log("Q2:", typeof myArrow2); // "undefined"
  // var hoists the variable as undefined, not the function
  var myArrow2 = () => "hello";

  // Quiz 3:
  var x = 1;
  function foo() {
    console.log("Q3a:", x); // undefined (NOT 1!)
    // Kyun? var x function ke andar hoist hua → var x = undefined;
    // Global x shadow ho gaya
    var x = 2;
    console.log("Q3b:", x); // 2
  }
  foo();

  // Quiz 4:
  // function bar() {
  //   console.log("Q4a:", a); // undefined (var hoisted)
  //   console.log("Q4b:", b); // ❌ ReferenceError! (let TDZ mein hai)
  //   var a = 1;
  //   let b = 2;
  // }
  // bar(); // Q4a prints, Q4b throws error

  console.log("Q4: var a → undefined (hoisted), let b → ReferenceError (TDZ)");
}

// ====================================
// SECTION 4: Closures
// ====================================

function solution4_1() {
  console.log("\n--- Solution 4.1: Counter Factory ---");

  function createCounter(initialValue = 0) {
    let count = initialValue; // Closure mein captured
    const resetValue = initialValue; // Reset ke liye original value store

    return {
      increment() {
        count++;
        return count;
      },
      decrement() {
        count--;
        return count;
      },
      reset() {
        count = resetValue;
      },
      getCount() {
        return count;
      },
    };
  }

  const counter = createCounter(10);
  console.log(counter.getCount()); // 10
  console.log(counter.increment()); // 11
  console.log(counter.increment()); // 12
  console.log(counter.decrement()); // 11
  counter.reset();
  console.log(counter.getCount()); // 10

  const counter2 = createCounter();
  console.log(counter2.getCount()); // 0
  console.log(counter2.increment()); // 1
}

function solution4_2() {
  console.log("\n--- Solution 4.2: Rate Limiter ---");

  function createRateLimiter(fn, maxCalls, timeWindowMs) {
    const callTimestamps = []; // Closure mein stored

    return function (...args) {
      const now = Date.now();

      // Purane timestamps hatao jo window ke bahar hain
      while (
        callTimestamps.length > 0 &&
        callTimestamps[0] <= now - timeWindowMs
      ) {
        callTimestamps.shift();
      }

      if (callTimestamps.length >= maxCalls) {
        return "Rate limit exceeded";
      }

      callTimestamps.push(now);
      return fn(...args);
    };
  }

  const limitedLog = createRateLimiter((msg) => `Logged: ${msg}`, 3, 1000);

  console.log(limitedLog("first")); // "Logged: first"
  console.log(limitedLog("second")); // "Logged: second"
  console.log(limitedLog("third")); // "Logged: third"
  console.log(limitedLog("fourth")); // "Rate limit exceeded"
}

function solution4_3() {
  console.log("\n--- Solution 4.3: Memoize ---");

  function memoize(fn) {
    const cache = new Map(); // Map better hai object se (any key type)

    return function (...args) {
      const key = JSON.stringify(args);

      if (cache.has(key)) {
        return cache.get(key);
      }

      const result = fn(...args);
      cache.set(key, result);
      return result;
    };
  }

  // Regular fibonacci (slow for large n)
  console.time("Without memo");
  function fibSlow(n) {
    if (n <= 1) return n;
    return fibSlow(n - 1) + fibSlow(n - 2);
  }
  console.log("fib(35):", fibSlow(35));
  console.timeEnd("Without memo");

  // Memoized fibonacci (fast!)
  const memoFib = memoize(function fib(n) {
    if (n <= 1) return n;
    return memoFib(n - 1) + memoFib(n - 2);
  });

  console.time("With memo (1st)");
  console.log("memoFib(35):", memoFib(35));
  console.timeEnd("With memo (1st)");

  console.time("With memo (2nd)");
  console.log("memoFib(35):", memoFib(35));
  console.timeEnd("With memo (2nd)");
}

function solution4_4() {
  console.log("\n--- Solution 4.4: Closure + Loop Fix ---");

  // FIX 1: let use karo
  console.log("Fix 1 (let):");
  for (let i = 0; i < 3; i++) {
    setTimeout(function () {
      console.log("  let:", i);
    }, 100);
  }

  // FIX 2: IIFE
  console.log("Fix 2 (IIFE):");
  for (var i = 0; i < 3; i++) {
    (function (j) {
      setTimeout(function () {
        console.log("  IIFE:", j);
      }, 200);
    })(i);
  }

  // FIX 3: Closure helper function
  console.log("Fix 3 (closure fn):");
  function createTimer(index) {
    return function () {
      console.log("  closure fn:", index);
    };
  }
  for (var k = 0; k < 3; k++) {
    setTimeout(createTimer(k), 300);
  }
}

// ====================================
// SECTION 5: Higher-Order Functions
// ====================================

function solution5_1() {
  console.log("\n--- Solution 5.1: Custom map/filter/reduce ---");

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Custom map
  function myMap(arr, callback) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      result.push(callback(arr[i], i, arr));
    }
    return result;
  }

  console.log("myMap doubled:", myMap(numbers, (n) => n * 2));
  // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

  // Custom filter
  function myFilter(arr, callback) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      if (callback(arr[i], i, arr)) {
        result.push(arr[i]);
      }
    }
    return result;
  }

  console.log("myFilter evens:", myFilter(numbers, (n) => n % 2 === 0));
  // [2, 4, 6, 8, 10]

  // Custom reduce
  function myReduce(arr, callback, initialValue) {
    let accumulator;
    let startIndex;

    if (initialValue !== undefined) {
      accumulator = initialValue;
      startIndex = 0;
    } else {
      accumulator = arr[0];
      startIndex = 1;
    }

    for (let i = startIndex; i < arr.length; i++) {
      accumulator = callback(accumulator, arr[i], i, arr);
    }

    return accumulator;
  }

  console.log("myReduce sum:", myReduce(numbers, (acc, n) => acc + n, 0)); // 55
  console.log(
    "myReduce max:",
    myReduce(numbers, (acc, n) => (n > acc ? n : acc), -Infinity)
  ); // 10
}

function solution5_2() {
  console.log("\n--- Solution 5.2: Compose & Pipe ---");

  const add10 = (x) => x + 10;
  const multiply2 = (x) => x * 2;
  const subtract5 = (x) => x - 5;

  // Compose — right to left
  function compose(...fns) {
    return function (value) {
      // reduceRight = right se left
      return fns.reduceRight((acc, fn) => fn(acc), value);

      // Without reduce:
      // let result = value;
      // for (let i = fns.length - 1; i >= 0; i--) {
      //   result = fns[i](result);
      // }
      // return result;
    };
  }

  // Pipe — left to right
  function pipe(...fns) {
    return function (value) {
      return fns.reduce((acc, fn) => fn(acc), value);

      // Without reduce:
      // let result = value;
      // for (const fn of fns) {
      //   result = fn(result);
      // }
      // return result;
    };
  }

  const composedFn = compose(add10, multiply2, subtract5);
  // subtract5(5) = 0 → multiply2(0) = 0 → add10(0) = 10
  console.log("compose(5):", composedFn(5)); // 10

  const pipedFn = pipe(add10, multiply2, subtract5);
  // add10(5) = 15 → multiply2(15) = 30 → subtract5(30) = 25
  console.log("pipe(5):", pipedFn(5)); // 25
}

// ====================================
// SECTION 6: this Keyword
// ====================================

function solution6_1() {
  console.log("\n--- Solution 6.1: this Answers ---");

  const hero = {
    name: "Batman",
    regularGreet: function () {
      console.log("Q1:", this.name); // "Batman" — regular fn, hero ne call kiya
    },
    arrowGreet: () => {
      console.log("Q2:", this.name); // undefined — arrow fn, parent scope ka this
    },
    delayedGreet: function () {
      setTimeout(function () {
        console.log("Q3:", this.name); // undefined — regular fn, this lost in setTimeout
      }, 10);
      setTimeout(() => {
        console.log("Q4:", this.name); // "Batman" — arrow fn, delayedGreet ka this inherited
      }, 10);
    },
  };

  hero.regularGreet(); // Q1: "Batman"
  hero.arrowGreet(); // Q2: undefined
  hero.delayedGreet(); // Q3: undefined, Q4: "Batman"
}

function solution6_2() {
  console.log("\n--- Solution 6.2: Fix this ---");

  // FIX 1: Arrow function (RECOMMENDED ✅)
  const timerFixed1 = {
    seconds: 0,
    start: function () {
      const id = setInterval(() => {
        // Arrow function inherits `this` from start()
        this.seconds++;
        console.log("Fix1 — Seconds:", this.seconds);
        if (this.seconds >= 3) clearInterval(id);
      }, 100);
    },
  };

  // FIX 2: bind
  const timerFixed2 = {
    seconds: 0,
    start: function () {
      const id = setInterval(
        function () {
          this.seconds++;
          console.log("Fix2 — Seconds:", this.seconds);
          if (this.seconds >= 3) clearInterval(id);
        }.bind(this), // .bind(this) — permanently binds this
        100
      );
    },
  };

  // FIX 3: const self = this
  const timerFixed3 = {
    seconds: 0,
    start: function () {
      const self = this; // Store reference before losing it
      const id = setInterval(function () {
        self.seconds++;
        console.log("Fix3 — Seconds:", self.seconds);
        if (self.seconds >= 3) clearInterval(id);
      }, 100);
    },
  };

  timerFixed1.start();
}

// ====================================
// SECTION 7: Combined Challenges
// ====================================

function solution7_1() {
  console.log("\n--- Solution 7.1: Logger Factory ---");

  function createLogger(minLevel = "debug") {
    const levels = ["debug", "info", "warn", "error"];
    const minLevelIndex = levels.indexOf(minLevel);
    const history = [];

    function log(level, message) {
      const levelIndex = levels.indexOf(level);

      // Agar current level minimum se neeche hai toh skip
      if (levelIndex < minLevelIndex) return;

      const timestamp = new Date().toISOString();
      const entry = {
        timestamp,
        level: level.toUpperCase(),
        message,
      };

      history.push(entry);
      console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`);
    }

    return {
      debug: (message) => log("debug", message),
      info: (message) => log("info", message),
      warn: (message) => log("warn", message),
      error: (message) => log("error", message),
      getHistory: () => [...history], // Copy return karo
      clear: () => {
        history.length = 0;
      },
    };
  }

  const logger = createLogger("warn");

  logger.debug("This should NOT appear");
  logger.info("This should NOT appear either");
  logger.warn("Low disk space");
  logger.error("Database connection failed");

  console.log("History count:", logger.getHistory().length); // 2
  console.log("History:", logger.getHistory());

  logger.clear();
  console.log("After clear:", logger.getHistory().length); // 0
}

function solution7_2() {
  console.log("\n--- Solution 7.2: Event Emitter ---");

  function createEventEmitter() {
    const listeners = {}; // { eventName: [callback1, callback2, ...] }

    return {
      on(event, callback) {
        if (!listeners[event]) {
          listeners[event] = [];
        }
        listeners[event].push(callback);
      },

      off(event, callback) {
        if (!listeners[event]) return;
        listeners[event] = listeners[event].filter((cb) => cb !== callback);
      },

      emit(event, ...data) {
        if (!listeners[event]) return;
        // Copy banake iterate karo (once wale listeners remove honge emit ke dauraan)
        const callbacks = [...listeners[event]];
        for (const callback of callbacks) {
          callback(...data);
        }
      },

      once(event, callback) {
        // Wrapper function banao jo ek baar chale phir khud ko remove kar de
        const wrapper = (...data) => {
          callback(...data);
          this.off(event, wrapper);
        };
        this.on(event, wrapper);
      },
    };
  }

  const emitter = createEventEmitter();

  const onLogin = (user) => console.log(`${user} logged in`);
  const onLoginLog = (user) => console.log(`[LOG] Login: ${user}`);

  emitter.on("login", onLogin);
  emitter.on("login", onLoginLog);

  console.log("--- Emit login (2 handlers) ---");
  emitter.emit("login", "Hariom");

  emitter.off("login", onLoginLog);
  console.log("--- Emit login (1 handler after off) ---");
  emitter.emit("login", "Rahul");

  emitter.once("logout", (user) => console.log(`${user} logged out`));
  console.log("--- Emit logout (once - 1st time) ---");
  emitter.emit("logout", "Hariom"); // Should print
  console.log("--- Emit logout (once - 2nd time) ---");
  emitter.emit("logout", "Hariom"); // Should NOT print
}

// ============================
// 🚀 RUN ALL SOLUTIONS
// ============================

console.log("╔══════════════════════════════════════════════╗");
console.log("║  Module 1.1 — Solutions: Functions & Scope   ║");
console.log("╚══════════════════════════════════════════════╝");

solution1_1();
solution1_2();
solution2_1();
solution2_2();
solution3_1();
solution4_1();
solution4_2();
solution4_3();
solution4_4();
solution5_1();
solution5_2();
solution6_1();
solution7_1();
solution7_2();

setTimeout(() => {
  console.log("\n🎉 All solutions demonstrated!");
}, 500);
