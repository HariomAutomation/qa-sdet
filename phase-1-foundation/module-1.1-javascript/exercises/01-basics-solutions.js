/**
 * ============================================================
 * ✅ Module 1.1 — Solutions: Exercise 01 - JS Basics
 * ============================================================
 * 
 * ⚠️  PEHLE KHUD TRY KARO! Yeh file tab dekho jab stuck ho jao.
 * 
 * ============================================================
 */

// ============================
// SECTION 1: Variables & Scope
// ============================

function solution1_1() {
  console.log("\n--- Solution 1.1: var vs let in loop ---");

  // Part A: var ke saath output — 3, 3, 3 (NOT 0, 1, 2!)
  // Kyun? Kyunki var function-scoped hai. Jab setTimeout callback execute hota hai,
  // loop already finish ho chuka hai aur i = 3 hai.
  console.log("Part A (var) — Output will be: 3, 3, 3");

  // Part B: Fix — let use karo (block-scoped, har iteration mein naya i banta hai)
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      console.log("let loop:", i);
    }, 100);
  }
  // Output: 0, 1, 2 ✅
}

function solution1_2() {
  console.log("\n--- Solution 1.2: const with Objects ---");

  const config = {
    host: "localhost",
    port: 3000,
    debug: true,
  };

  config.port = 8080; // ✅ WORKS — property change allowed
  console.log("After port change:", config.port);

  config.timeout = 5000; // ✅ WORKS — new property add allowed
  console.log("After adding timeout:", config.timeout);

  delete config.debug; // ✅ WORKS — property delete allowed
  console.log("After deleting debug:", config);

  // config = { host: "remote" }; // ❌ ERROR — reassignment not allowed
  // TypeError: Assignment to constant variable
}

// ============================
// SECTION 2: Data Types
// ============================

function solution2_1() {
  console.log("\n--- Solution 2.1: typeof Answers ---");

  // 0:  42              → "number"
  // 1:  "hello"         → "string"
  // 2:  true            → "boolean"
  // 3:  undefined       → "undefined"
  // 4:  null            → "object"    ← JS BUG! null object nahi hai
  // 5:  {}              → "object"
  // 6:  []              → "object"    ← Array bhi object kehta hai typeof
  // 7:  function(){}    → "function"
  // 8:  NaN             → "number"    ← NaN "number" type hai! 😱
  // 9:  Symbol("id")    → "symbol"
  // 10: 10n             → "bigint"

  console.log("Key gotchas:");
  console.log("- typeof null === 'object' (historical bug)");
  console.log("- typeof [] === 'object' (use Array.isArray() instead)");
  console.log("- typeof NaN === 'number' (NaN is technically a number)");
}

function solution2_2() {
  console.log("\n--- Solution 2.2: Reference vs Value ---");

  // Part A: a = 10, b = 20 (primitives copy by VALUE)
  let a = 10;
  let b = a;
  b = 20;
  console.log("Part A — a:", a, "b:", b); // 10, 20

  // Part B: DONO change honge kyunki objects copy by REFERENCE
  let obj1 = { name: "Hariom", scores: [90, 85, 95] };
  let obj2 = obj1;
  obj2.name = "Hari";
  obj2.scores.push(100);
  console.log("Part B — obj1:", JSON.stringify(obj1));
  // obj1.name = "Hari", obj1.scores = [90, 85, 95, 100]

  // Part C: Independent copies
  // Shallow copy (nested objects still share reference)
  let obj3 = { ...obj1 };
  // ya: let obj3 = Object.assign({}, obj1);
  obj3.name = "Shallow Copy";
  console.log("obj1.name:", obj1.name); // "Hari" — unchanged ✅
  obj3.scores.push(200);
  console.log("obj1.scores:", obj1.scores); // has 200! ❌ — shallow copy mein nested arrays shared hain

  // Deep copy (completely independent)
  let obj4 = JSON.parse(JSON.stringify(obj1));
  // ya (modern): let obj4 = structuredClone(obj1);
  obj4.name = "Deep Copy";
  obj4.scores.push(300);
  console.log("obj1.name:", obj1.name); // "Hari" — unchanged ✅
  console.log("obj1.scores includes 300:", obj1.scores.includes(300)); // false ✅
}

// ============================
// SECTION 3: Type Coercion
// ============================

function solution3_1() {
  console.log("\n--- Solution 3.1: Coercion Answers ---");

  console.log("1:  5 + '3'         =", 5 + "3");           // "53" (string concat)
  console.log("2:  5 - '3'         =", 5 - "3");           // 2 (numeric)
  console.log("3:  '5' * '2'       =", "5" * "2");         // 10 (numeric)
  console.log("4:  true + true     =", true + true);       // 2 (1+1)
  console.log("5:  true + 'hello'  =", true + "hello");    // "truehello" (string)
  console.log("6:  null + 1        =", null + 1);          // 1 (null=0)
  console.log("7:  undefined + 1   =", undefined + 1);     // NaN
  console.log("8:  '5' + 3 + 2     =", "5" + 3 + 2);       // "532" (left to right, string wins)
  console.log("9:  3 + 2 + '5'     =", 3 + 2 + "5");       // "55" (3+2=5, then "5"+"5")
  console.log("10: +''             =", +"");              // 0
  console.log("11: +true           =", +true);            // 1
  console.log("12: +null           =", +null);            // 0
  console.log("13: +'hello'        =", +"hello");         // NaN
  console.log("14: !!''            =", !!"");             // false (empty string falsy)
  console.log("15: !!'0'           =", !!"0");            // true (non-empty string truthy!)
  console.log("16: !!0             =", !!0);              // false
  console.log("17: !!null          =", !!null);           // false
  console.log("18: !!undefined     =", !!undefined);      // false
  console.log("19: !!NaN           =", !!NaN);            // false
  console.log("20: !![]            =", !![]);             // true (empty array IS truthy!)
}

function solution3_2() {
  console.log("\n--- Solution 3.2: Equality Answers ---");

  console.log("1:  0 == false          =", 0 == false);           // true (coercion: false → 0)
  console.log("2:  0 === false         =", 0 === false);          // false (different types)
  console.log("3:  '' == false         =", "" == false);          // true (both → 0)
  console.log("4:  '' === false        =", "" === false);         // false
  console.log("5:  null == undefined   =", null == undefined);    // true (special rule!)
  console.log("6:  null === undefined  =", null === undefined);   // false
  console.log("7:  NaN == NaN          =", NaN == NaN);           // false!! (NaN is NOT equal to itself)
  console.log("8:  NaN === NaN         =", NaN === NaN);          // false!!
  console.log("   → NaN check: Number.isNaN(NaN) =", Number.isNaN(NaN)); // true ✅
  console.log("9:  [1] == [1]          =", [1] == [1]);           // false (different references)
  console.log("10: [1] === [1]         =", [1] === [1]);          // false (different references)
}

// ============================
// SECTION 4: Operators
// ============================

function solution4_1() {
  console.log("\n--- Solution 4.1: Short Circuit Answers ---");

  // && — pehla falsy ya last value
  console.log("1:", "hello" && 0 && "world");      // 0 (pehla falsy)
  console.log("2:", 1 && 2 && 3);                   // 3 (sab truthy, last return)
  console.log("3:", 0 && null && "hello");           // 0 (pehla falsy)

  // || — pehla truthy ya last value
  console.log("4:", "" || null || "default");        // "default"
  console.log("5:", "hello" || "world");             // "hello" (pehla truthy)
  console.log("6:", 0 || "" || null || undefined);   // undefined (sab falsy, last return)

  // ?? — sirf null/undefined handle karta hai
  console.log("7:", 0 ?? "default");                 // 0 (0 null nahi hai)
  console.log("8:", "" ?? "default");                // "" (empty string null nahi hai)
  console.log("9:", null ?? "default");              // "default" ✅
  console.log("10:", undefined ?? "default");        // "default" ✅
}

function solution4_2() {
  console.log("\n--- Solution 4.2: Optional Chaining ---");

  const company = {
    name: "TechCorp",
    departments: {
      engineering: {
        lead: { name: "Rahul", email: "rahul@tech.com" },
        teamSize: 25,
      },
    },
    getInfo: function () {
      return "TechCorp Info";
    },
  };

  // 1. Engineering lead ka name
  let engLead = company?.departments?.engineering?.lead?.name;
  console.log("Eng Lead:", engLead); // "Rahul"

  // 2. Marketing lead ka name (undefined aayega, error nahi)
  let mktLead = company?.departments?.marketing?.lead?.name;
  console.log("Mkt Lead:", mktLead); // undefined

  // 3. Marketing team size with default 0
  let mktSize = company?.departments?.marketing?.teamSize ?? 0;
  console.log("Mkt Size:", mktSize); // 0

  // 4. getInfo() safely call
  let info = company?.getInfo?.();
  console.log("Info:", info); // "TechCorp Info"

  // 5. getStats() safely call
  let stats = company?.getStats?.();
  console.log("Stats:", stats); // undefined
}

// ============================
// SECTION 5: Loops & Conditionals
// ============================

function solution5_1() {
  console.log("\n--- Solution 5.1: FizzBuzz ---");

  for (let i = 1; i <= 30; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }

  // Alternative (cleaner approach):
  console.log("\n--- Alternative approach ---");
  for (let i = 1; i <= 30; i++) {
    let output = "";
    if (i % 3 === 0) output += "Fizz";
    if (i % 5 === 0) output += "Buzz";
    console.log(output || i);
  }
}

function solution5_2() {
  console.log("\n--- Solution 5.2: for...of vs for...in ---");

  const students = [
    { name: "Hariom", score: 85 },
    { name: "Rahul", score: 92 },
    { name: "Priya", score: 78 },
    { name: "Amit", score: 95 },
  ];

  // for...of — arrays ke liye
  console.log("Students with score > 80:");
  for (const student of students) {
    if (student.score > 80) {
      console.log(`  ${student.name} (${student.score})`);
    }
  }

  // for...in — objects ke liye
  const serverConfig = {
    host: "localhost",
    port: 3000,
    database: "testdb",
    debug: true,
  };

  console.log("\nServer Config:");
  for (const key in serverConfig) {
    console.log(`  ${key}: ${serverConfig[key]}`);
  }
}

function solution5_3() {
  console.log("\n--- Solution 5.3: Star Pattern ---");

  for (let i = 1; i <= 5; i++) {
    console.log("*".repeat(i));
  }
}

// ============================
// SECTION 6: String Methods
// ============================

function solution6_1() {
  console.log("\n--- Solution 6.1: String Methods ---");

  const rawEmail = "  HaRiOm.SiNgH@Gmail.COM  ";

  // 1. Clean & lowercase
  let cleanEmail = rawEmail.trim().toLowerCase();
  console.log("Clean email:", cleanEmail); // "hariom.singh@gmail.com"

  // 2. Username extract
  let username = cleanEmail.split("@")[0];
  console.log("Username:", username); // "hariom.singh"

  // 3. Domain extract
  let domain = cleanEmail.split("@")[1];
  console.log("Domain:", domain); // "gmail.com"

  // 4. Gmail check
  let isGmail = domain === "gmail.com";
  // ya: cleanEmail.endsWith("@gmail.com")
  console.log("Is Gmail:", isGmail); // true

  // 5. Username to full name (capitalize each word)
  let fullName = username
    .split(".")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  console.log("Full Name:", fullName); // "Hariom Singh"
}

function solution6_2() {
  console.log("\n--- Solution 6.2: Password Validator ---");

  function validatePassword(password) {
    const errors = [];

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters");
    }

    // Check uppercase — kya koi uppercase letter hai?
    let hasUpper = false;
    for (const char of password) {
      if (char >= "A" && char <= "Z") {
        hasUpper = true;
        break;
      }
    }
    if (!hasUpper) {
      errors.push("Must contain at least one uppercase letter");
    }

    // Check lowercase
    let hasLower = false;
    for (const char of password) {
      if (char >= "a" && char <= "z") {
        hasLower = true;
        break;
      }
    }
    if (!hasLower) {
      errors.push("Must contain at least one lowercase letter");
    }

    // Check number
    let hasNumber = false;
    for (const char of password) {
      if (char >= "0" && char <= "9") {
        hasNumber = true;
        break;
      }
    }
    if (!hasNumber) {
      errors.push("Must contain at least one number");
    }

    // Check special character
    const specialChars = "!@#$%^&*";
    let hasSpecial = false;
    for (const char of password) {
      if (specialChars.includes(char)) {
        hasSpecial = true;
        break;
      }
    }
    if (!hasSpecial) {
      errors.push("Must contain at least one special character (!@#$%^&*)");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  // Test cases
  console.log("'abc':", JSON.stringify(validatePassword("abc")));
  console.log("'Abcdefgh':", JSON.stringify(validatePassword("Abcdefgh")));
  console.log("'Abcd1234':", JSON.stringify(validatePassword("Abcd1234")));
  console.log("'Abcd123!':", JSON.stringify(validatePassword("Abcd123!")));
  console.log("'H@riom99':", JSON.stringify(validatePassword("H@riom99")));
}

// ============================
// SECTION 7: Combined Challenge
// ============================

function solution7_1() {
  console.log("\n--- Solution 7.1: Student Grade Calculator ---");

  const students = [
    { name: "Hariom", scores: [95, 88, 92] },
    { name: "Rahul", scores: [72, 65, 80] },
    { name: "Priya", scores: [45, 55, 50] },
    { name: "Amit", scores: [88, 91, 85] },
    { name: "Neha", scores: [60, 58, 65] },
  ];

  function calculateGrades(students) {
    const results = [];

    for (const student of students) {
      // Calculate average
      let total = 0;
      for (const score of student.scores) {
        total += score;
      }
      const average = Math.round((total / student.scores.length) * 100) / 100;

      // Determine grade
      let grade;
      if (average >= 90) {
        grade = "A";
      } else if (average >= 80) {
        grade = "B";
      } else if (average >= 70) {
        grade = "C";
      } else if (average >= 60) {
        grade = "D";
      } else {
        grade = "F";
      }

      // Determine status
      const status = average >= 60 ? "Pass" : "Fail";

      results.push({
        name: student.name,
        scores: student.scores,
        average,
        grade,
        status,
      });
    }

    return results;
  }

  const results = calculateGrades(students);

  results.forEach((student) => {
    console.log(
      `${student.name}: Avg = ${student.average}, Grade = ${student.grade}, Status = ${student.status}`
    );
  });
}

// ============================
// 🚀 RUN ALL SOLUTIONS
// ============================

console.log("╔══════════════════════════════════════════╗");
console.log("║  Module 1.1 — Solutions: JS Basics       ║");
console.log("╚══════════════════════════════════════════╝");

solution1_1();
setTimeout(() => {
  solution1_2();
  solution2_1();
  solution2_2();
  solution3_1();
  solution3_2();
  solution4_1();
  solution4_2();
  solution5_1();
  solution5_2();
  solution5_3();
  solution6_1();
  solution6_2();
  solution7_1();

  console.log("\n🎉 All solutions demonstrated!");
}, 200);
