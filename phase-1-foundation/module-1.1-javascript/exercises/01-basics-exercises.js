/**
 * ============================================================
 * 📝 Module 1.1 — Exercise 01: JS Basics Refresh
 * ============================================================
 * 
 * Instructions:
 * - Har exercise mein TODO comment hai — wahan apna code likho
 * - Run karo: node exercises/01-basics-exercises.js
 * - Console output check karo — expected output comments mein hai
 * - Solutions dekhne se pehle KHUD try karo!
 * 
 * ============================================================
 */

// ============================
// SECTION 1: Variables & Scope
// ============================

/**
 * Exercise 1.1 — var vs let Scope
 * 
 * Niche ek function hai jo loop mein setTimeout use karta hai.
 * Pehle `var` ke saath output predict karo, phir `let` se fix karo.
 */
function exercise1_1() {
  console.log("\n--- Exercise 1.1: var vs let in loop ---");

  // Part A: Yeh code run karo — output kya aayega? Predict karo pehle!
  for (var i = 0; i < 3; i++) {
    setTimeout(() => {
      console.log("var loop:", i);
    }, 100);
  }

  // Part B: TODO — Upar wale loop ko fix karo taaki output 0, 1, 2 aaye
  // Hint: var ko kisi aur cheez se replace karo
  // Apna fixed loop yahan likho:

  // TODO: Write your code here


}

/**
 * Exercise 1.2 — const with Objects
 * 
 * Niche ek const object hai. Kaunse operations chalenge aur kaunse error denge?
 * Har line ke aage "WORKS" ya "ERROR" likho (comment mein), phir run karke verify karo.
 */
function exercise1_2() {
  console.log("\n--- Exercise 1.2: const with Objects ---");

  const config = {
    host: "localhost",
    port: 3000,
    debug: true,
  };

  // TODO: Har line ke aage predict karo — WORKS ya ERROR?
  // Uncomment karke test karo ek ek karke

  // config.port = 8080;          // Prediction: ?
  // config.timeout = 5000;       // Prediction: ?
  // delete config.debug;         // Prediction: ?
  // config = { host: "remote" }; // Prediction: ?

  console.log(config);
}

// ============================
// SECTION 2: Data Types
// ============================

/**
 * Exercise 2.1 — typeof Quiz
 * 
 * Har value ka typeof predict karo WITHOUT running the code.
 * Phir run karke check karo kitne sahi the.
 */
function exercise2_1() {
  console.log("\n--- Exercise 2.1: typeof Quiz ---");

  const values = [
    42,
    "hello",
    true,
    undefined,
    null,
    {},
    [],
    function () {},
    NaN,
    Symbol("id"),
    10n,
  ];

  // TODO: Pehle predict karo har value ka typeof, phir run karo
  values.forEach((val, index) => {
    console.log(`Value ${index}: ${String(val)} → typeof = "${typeof val}"`);
  });

  // TODO: Niche apni predictions likho (comment mein):
  // 0: ?
  // 1: ?
  // 2: ?
  // 3: ?
  // 4: ?   ← Yeh tricky hai!
  // 5: ?
  // 6: ?   ← Yeh bhi tricky hai!
  // 7: ?
  // 8: ?   ← Yeh bhi!
  // 9: ?
  // 10: ?
}

/**
 * Exercise 2.2 — Reference vs Value
 *
 * Is function ka output kya hoga? Predict karo, phir run karo.
 */
function exercise2_2() {
  console.log("\n--- Exercise 2.2: Reference vs Value ---");

  // Part A: Primitives
  let a = 10;
  let b = a;
  b = 20;
  console.log("Part A — a:", a, "b:", b);
  // TODO: Predict — a = ?, b = ?

  // Part B: Objects
  let obj1 = { name: "Hariom", scores: [90, 85, 95] };
  let obj2 = obj1;
  obj2.name = "Hari";
  obj2.scores.push(100);
  console.log("Part B — obj1:", JSON.stringify(obj1));
  console.log("Part B — obj2:", JSON.stringify(obj2));
  // TODO: Predict — obj1.name = ?, obj1.scores = ?

  // Part C: TODO — obj1 ka INDEPENDENT copy kaise banayenge?
  // Hint: 2 tarike hain — shallow copy aur deep copy
  // Shallow copy try karo:
  // let obj3 = ???
  
  // Deep copy try karo:
  // let obj4 = ???
}

// ============================
// SECTION 3: Type Coercion
// ============================

/**
 * Exercise 3.1 — Coercion Prediction Challenge
 *
 * Har expression ka output predict karo. Score rakho — kitne sahi mile.
 * Yeh interview mein ZAROOR puche jaate hain!
 */
function exercise3_1() {
  console.log("\n--- Exercise 3.1: Coercion Challenge ---");

  // TODO: Har line ka output predict karo BEFORE running

  console.log("1:", 5 + "3");           // Predict: ?
  console.log("2:", 5 - "3");           // Predict: ?
  console.log("3:", "5" * "2");         // Predict: ?
  console.log("4:", true + true);       // Predict: ?
  console.log("5:", true + "hello");    // Predict: ?
  console.log("6:", null + 1);          // Predict: ?
  console.log("7:", undefined + 1);     // Predict: ?
  console.log("8:", "5" + 3 + 2);       // Predict: ?
  console.log("9:", 3 + 2 + "5");       // Predict: ?
  console.log("10:", +"");              // Predict: ?
  console.log("11:", +true);            // Predict: ?
  console.log("12:", +null);            // Predict: ?
  console.log("13:", +"hello");         // Predict: ?
  console.log("14:", !!"");             // Predict: ?
  console.log("15:", !!"0");            // Predict: ?
  console.log("16:", !!0);              // Predict: ?
  console.log("17:", !!null);           // Predict: ?
  console.log("18:", !!undefined);      // Predict: ?
  console.log("19:", !!NaN);            // Predict: ?
  console.log("20:", !![] );            // Predict: ? ← TRICKY!

  // TODO: Score likho — 20 mein se kitne sahi mile?
  // Score: ?/20
}

/**
 * Exercise 3.2 — Equality Madness
 *
 * == vs === ka difference. Predict karo phir verify karo.
 */
function exercise3_2() {
  console.log("\n--- Exercise 3.2: Equality == vs === ---");

  // TODO: true ya false predict karo

  console.log("1:", 0 == false);           // Predict: ?
  console.log("2:", 0 === false);          // Predict: ?
  console.log("3:", "" == false);          // Predict: ?
  console.log("4:", "" === false);         // Predict: ?
  console.log("5:", null == undefined);    // Predict: ?
  console.log("6:", null === undefined);   // Predict: ?
  console.log("7:", NaN == NaN);           // Predict: ? ← SUPER TRICKY
  console.log("8:", NaN === NaN);          // Predict: ?
  console.log("9:", [1] == [1]);           // Predict: ? ← TRICKY
  console.log("10:", [1] === [1]);         // Predict: ?
}

// ============================
// SECTION 4: Operators
// ============================

/**
 * Exercise 4.1 — Short Circuit & Nullish Coalescing
 * 
 * Output predict karo har line ka.
 */
function exercise4_1() {
  console.log("\n--- Exercise 4.1: Short Circuit ---");

  // && — pehla falsy ya last value return karta hai
  console.log("1:", "hello" && 0 && "world");      // Predict: ?
  console.log("2:", 1 && 2 && 3);                   // Predict: ?
  console.log("3:", 0 && null && "hello");           // Predict: ?

  // || — pehla truthy ya last value return karta hai
  console.log("4:", "" || null || "default");        // Predict: ?
  console.log("5:", "hello" || "world");             // Predict: ?
  console.log("6:", 0 || "" || null || undefined);   // Predict: ?

  // ?? — sirf null/undefined ke liye
  console.log("7:", 0 ?? "default");                 // Predict: ?
  console.log("8:", "" ?? "default");                // Predict: ?
  console.log("9:", null ?? "default");              // Predict: ?
  console.log("10:", undefined ?? "default");        // Predict: ?
}

/**
 * Exercise 4.2 — Optional Chaining Practice
 * 
 * Niche ek complex object hai. Safely values access karo bina error ke.
 */
function exercise4_2() {
  console.log("\n--- Exercise 4.2: Optional Chaining ---");

  const company = {
    name: "TechCorp",
    departments: {
      engineering: {
        lead: { name: "Rahul", email: "rahul@tech.com" },
        teamSize: 25,
      },
      // marketing department NAHI hai
    },
    getInfo: function () {
      return "TechCorp Info";
    },
    // getStats function NAHI hai
  };

  // TODO: Har value ko SAFELY access karo using optional chaining
  // Error nahi aana chahiye — undefined aaye toh chalega

  // 1. Engineering lead ka name
  // let engLead = ???
  console.log("Eng Lead:", "TODO");

  // 2. Marketing lead ka name (marketing exist nahi karta)
  // let mktLead = ???
  console.log("Mkt Lead:", "TODO");

  // 3. Marketing team size with default value 0 (use ?? operator)
  // let mktSize = ???
  console.log("Mkt Size:", "TODO");

  // 4. getInfo() safely call karo
  // let info = ???
  console.log("Info:", "TODO");

  // 5. getStats() safely call karo (function exist nahi karta)
  // let stats = ???
  console.log("Stats:", "TODO");
}

// ============================
// SECTION 5: Loops & Conditionals
// ============================

/**
 * Exercise 5.1 — FizzBuzz (Classic Interview Question)
 * 
 * 1 se 30 tak numbers print karo:
 * - Agar number 3 se divisible hai → "Fizz"
 * - Agar number 5 se divisible hai → "Buzz"
 * - Agar dono se divisible hai → "FizzBuzz"
 * - Warna number print karo
 */
function exercise5_1() {
  console.log("\n--- Exercise 5.1: FizzBuzz ---");

  // TODO: FizzBuzz implement karo
  for (let i = 1; i <= 30; i++) {
    // Apna logic yahan likho
  }
}

/**
 * Exercise 5.2 — for...of vs for...in
 * 
 * Given data ke saath dono loops practice karo.
 */
function exercise5_2() {
  console.log("\n--- Exercise 5.2: for...of vs for...in ---");

  const students = [
    { name: "Hariom", score: 85 },
    { name: "Rahul", score: 92 },
    { name: "Priya", score: 78 },
    { name: "Amit", score: 95 },
  ];

  // TODO 1: for...of use karke sirf un students ke naam print karo jinke score > 80
  console.log("Students with score > 80:");

  // TODO 2: for...in use karke niche ke object ki key-value pairs print karo
  const serverConfig = {
    host: "localhost",
    port: 3000,
    database: "testdb",
    debug: true,
  };
  console.log("\nServer Config:");
}

/**
 * Exercise 5.3 — Nested Loop Pattern
 *
 * Yeh pattern print karo:
 * *
 * **
 * ***
 * ****
 * *****
 */
function exercise5_3() {
  console.log("\n--- Exercise 5.3: Star Pattern ---");
  
  // TODO: Pattern print karo
}

// ============================
// SECTION 6: String Methods
// ============================

/**
 * Exercise 6.1 — String Manipulation
 *
 * Real-world string operations practice.
 */
function exercise6_1() {
  console.log("\n--- Exercise 6.1: String Methods ---");

  const rawEmail = "  HaRiOm.SiNgH@Gmail.COM  ";

  // TODO 1: Email ko clean aur lowercase karo
  // Expected: "hariom.singh@gmail.com"
  // let cleanEmail = ???
  console.log("Clean email:", "TODO");

  // TODO 2: Email se username extract karo (@ se pehle wala part)
  // Expected: "hariom.singh"
  // let username = ???
  console.log("Username:", "TODO");

  // TODO 3: Email se domain extract karo (@ ke baad wala part)
  // Expected: "gmail.com"
  // let domain = ???
  console.log("Domain:", "TODO");

  // TODO 4: Check karo email gmail hai ya nahi
  // Expected: true
  // let isGmail = ???
  console.log("Is Gmail:", "TODO");

  // TODO 5: Username mein dots ko spaces se replace karo aur capitalize karo har word
  // Expected: "Hariom Singh"
  // Hint: split, map, join use karo
  // let fullName = ???
  console.log("Full Name:", "TODO");
}

/**
 * Exercise 6.2 — Password Validator
 * 
 * Ek function likho jo password validate kare:
 * - Minimum 8 characters
 * - At least ek uppercase letter
 * - At least ek lowercase letter
 * - At least ek number
 * - At least ek special character (!@#$%^&*)
 * 
 * Return: { valid: boolean, errors: string[] }
 */
function exercise6_2() {
  console.log("\n--- Exercise 6.2: Password Validator ---");

  function validatePassword(password) {
    // TODO: Implement password validator
    // Hint: string methods use karo (includes, match ya regex)
    // Return format: { valid: true/false, errors: ["error1", "error2"] }

    return { valid: false, errors: ["Not implemented yet"] };
  }

  // Test cases
  console.log(validatePassword("abc"));         // { valid: false, errors: [...] }
  console.log(validatePassword("Abcdefgh"));    // { valid: false, errors: [...] }
  console.log(validatePassword("Abcd1234"));    // { valid: false, errors: [...] }
  console.log(validatePassword("Abcd123!"));    // { valid: true, errors: [] }
  console.log(validatePassword("H@riom99"));    // { valid: true, errors: [] }
}

// ============================
// SECTION 7: Combined Challenge
// ============================

/**
 * Exercise 7.1 — Student Grade Calculator (MINI PROJECT)
 * 
 * Ek function likho jo students ka grade calculate kare:
 * - Input: array of student objects { name, scores: [math, science, english] }
 * - Output: array with added fields: { ...student, average, grade, status }
 * 
 * Grading: A (90+), B (80-89), C (70-79), D (60-69), F (<60)
 * Status: "Pass" (>= 60), "Fail" (< 60)
 */
function exercise7_1() {
  console.log("\n--- Exercise 7.1: Student Grade Calculator ---");

  const students = [
    { name: "Hariom", scores: [95, 88, 92] },
    { name: "Rahul", scores: [72, 65, 80] },
    { name: "Priya", scores: [45, 55, 50] },
    { name: "Amit", scores: [88, 91, 85] },
    { name: "Neha", scores: [60, 58, 65] },
  ];

  function calculateGrades(students) {
    // TODO: Implement grade calculator
    // Steps:
    // 1. Har student ka average calculate karo
    // 2. Average se grade determine karo
    // 3. Pass/Fail status set karo
    // 4. Result array return karo

    return []; // Replace with your implementation
  }

  const results = calculateGrades(students);
  
  // Pretty print results
  results.forEach((student) => {
    console.log(
      `${student.name}: Avg = ${student.average}, Grade = ${student.grade}, Status = ${student.status}`
    );
  });

  // Expected output:
  // Hariom: Avg = 91.67, Grade = A, Status = Pass
  // Rahul: Avg = 72.33, Grade = C, Status = Pass
  // Priya: Avg = 50, Grade = F, Status = Fail
  // Amit: Avg = 88, Grade = B, Status = Pass
  // Neha: Avg = 61, Grade = D, Status = Pass
}

// ============================
// 🚀 RUN ALL EXERCISES
// ============================

console.log("╔══════════════════════════════════════════╗");
console.log("║  Module 1.1 — Exercise 01: JS Basics    ║");
console.log("╚══════════════════════════════════════════╝");

// Uncomment jo exercise solve kar raha hai:
exercise1_1();
exercise1_2();
exercise2_1();
exercise2_2();
exercise3_1();
exercise3_2();
exercise4_1();
exercise4_2();
exercise5_1();
exercise5_2();
exercise5_3();
exercise6_1();
exercise6_2();
exercise7_1();

console.log("\n✅ All exercises completed! Check your answers.");
console.log("📁 Solutions: exercises/01-basics-solutions.js");
