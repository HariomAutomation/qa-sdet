# 📘 Module 1.1 — JavaScript Deep Dive

## Lesson 5: Async Programming (Callbacks → Promises → async/await)

> **Difficulty:** 🔴 Advanced  
> **Time:** ~4-5 hours  
> **Goal:** Async JS master karna — SDET interview ka MOST ASKED topic

---

## 1️⃣ Synchronous vs Asynchronous

```javascript
// SYNCHRONOUS — line by line, ek ke baad ek
console.log("1: Start");
console.log("2: Processing"); // Block karta hai — 2 bina 1 ke nahi chalega
console.log("3: End");
// Output: 1, 2, 3 (in order)

// ASYNCHRONOUS — kuch kaam "baad mein" hota hai, code block nahi hota
console.log("1: Start");
setTimeout(() => console.log("2: Async task done"), 1000); // 1 sec baad chalega
console.log("3: End");
// Output: 1, 3, 2 (3 pehle aata hai!)
```

## 2️⃣ Callbacks — The Old Way

```javascript
// Callback = function jo dusre function ko pass karte hain, baad mein execute hone ke liye

// Simple callback
function fetchData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: "Hariom" };
    callback(null, data); // Convention: (error, data)
  }, 1000);
}

fetchData((error, data) => {
  if (error) {
    console.error("Error:", error);
    return;
  }
  console.log("Data:", data);
});

// ❌ CALLBACK HELL (Pyramid of Doom)
function getUserOrders(userId, callback) {
  getUser(userId, (err, user) => {
    if (err) return callback(err);
    getOrders(user.id, (err, orders) => {
      if (err) return callback(err);
      getOrderDetails(orders[0].id, (err, details) => {
        if (err) return callback(err);
        getShipping(details.shippingId, (err, shipping) => {
          if (err) return callback(err);
          callback(null, { user, orders, details, shipping });
          // 😱 Kitna nested! Yeh readable nahi hai
        });
      });
    });
  });
}
```

## 3️⃣ Promises — The Modern Way ✅

```javascript
// Promise = ek object jo future mein resolve ya reject hoga
// States: pending → fulfilled (resolved) OR rejected

// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
  const success = true;
  setTimeout(() => {
    if (success) {
      resolve({ id: 1, name: "Hariom" }); // ✅ Success
    } else {
      reject(new Error("Something went wrong")); // ❌ Failure
    }
  }, 1000);
});

// Consuming a Promise
myPromise
  .then(data => {
    console.log("Success:", data);
    return data.name; // .then chain mein value pass
  })
  .then(name => {
    console.log("Name:", name);
  })
  .catch(error => {
    console.error("Error:", error.message);
  })
  .finally(() => {
    console.log("Done! (always runs)");
  });

// Promise-based function banana
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) reject(new Error("Invalid ID"));
      resolve({ id, name: "User_" + id });
    }, 500);
  });
}

// Chaining — CALLBACK HELL SOLVED! ✅
fetchUser(1)
  .then(user => {
    console.log("User:", user);
    return fetchOrders(user.id); // Return promise for chaining
  })
  .then(orders => {
    console.log("Orders:", orders);
    return fetchDetails(orders[0].id);
  })
  .then(details => {
    console.log("Details:", details);
  })
  .catch(error => {
    console.error("Error:", error.message); // Koi bhi step fail ho → yahan aayega
  });
```

## 4️⃣ Promise Static Methods — IMPORTANT!

```javascript
const p1 = new Promise(res => setTimeout(() => res("one"), 1000));
const p2 = new Promise(res => setTimeout(() => res("two"), 500));
const p3 = new Promise((_, rej) => setTimeout(() => rej("three failed"), 800));

// Promise.all — SAB succeed honge tabhi result milega
// Ek bhi fail → POORA fail
Promise.all([p1, p2])
  .then(results => console.log(results)) // ["one", "two"]
  .catch(err => console.error(err));

// Promise.allSettled — SAB ka result milega, chahe pass ya fail
Promise.allSettled([p1, p2, p3])
  .then(results => console.log(results));
// [
//   { status: "fulfilled", value: "one" },
//   { status: "fulfilled", value: "two" },
//   { status: "rejected", reason: "three failed" }
// ]

// Promise.race — PEHLA jo settle ho (resolve ya reject)
Promise.race([p1, p2])
  .then(result => console.log(result)); // "two" (500ms mein pehle resolve hua)

// Promise.any — PEHLA jo RESOLVE ho (failures ignore)
Promise.any([p3, p1, p2])
  .then(result => console.log(result)); // "two" (pehla success)
```

## 5️⃣ async/await — The Best Way ⭐⭐⭐

```javascript
// async function HAMESHA Promise return karta hai
async function fetchData() {
  return "Hello"; // Automatically Promise.resolve("Hello") ban jaata hai
}
fetchData().then(data => console.log(data)); // "Hello"

// await — Promise ke resolve hone ka wait karo
async function getUser() {
  console.log("Fetching user...");
  const user = await fetchUser(1); // Wait until resolved
  console.log("User:", user);
  return user;
}

// Error handling with try/catch ✅
async function getUserSafe() {
  try {
    const user = await fetchUser(1);
    const orders = await fetchOrders(user.id);
    const details = await fetchDetails(orders[0].id);
    console.log("All data:", { user, orders, details });
  } catch (error) {
    console.error("Something failed:", error.message);
  } finally {
    console.log("Cleanup done");
  }
}

// SEQUENTIAL vs PARALLEL execution — BAHUT IMPORTANT!

// ❌ Sequential — slow (one after another)
async function sequential() {
  console.time("sequential");
  const user1 = await fetchUser(1);  // Wait 500ms
  const user2 = await fetchUser(2);  // Wait 500ms more
  const user3 = await fetchUser(3);  // Wait 500ms more
  console.timeEnd("sequential");     // ~1500ms total 😫
}

// ✅ Parallel — fast (all at once)
async function parallel() {
  console.time("parallel");
  const [user1, user2, user3] = await Promise.all([
    fetchUser(1),  // All three start
    fetchUser(2),  // at the same
    fetchUser(3),  // time!
  ]);
  console.timeEnd("parallel"); // ~500ms total 🚀
}

// ✅ Parallel with error handling
async function parallelSafe() {
  const results = await Promise.allSettled([
    fetchUser(1),
    fetchUser(-1), // Will fail
    fetchUser(3),
  ]);

  const successful = results
    .filter(r => r.status === "fulfilled")
    .map(r => r.value);
  const failed = results
    .filter(r => r.status === "rejected")
    .map(r => r.reason);

  console.log("Success:", successful);
  console.log("Failed:", failed);
}
```

## 6️⃣ Real-World Async Patterns

```javascript
// 1. Retry with exponential backoff
async function fetchWithRetry(url, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.log(`Attempt ${attempt} failed: ${error.message}`);
      if (attempt === maxRetries) throw error;
      const delay = Math.pow(2, attempt) * 100; // 200, 400, 800ms
      await new Promise(res => setTimeout(res, delay));
    }
  }
}

// 2. Timeout wrapper
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
  );
  return Promise.race([promise, timeout]);
}

// Usage:
// const data = await withTimeout(fetchUser(1), 2000);

// 3. Sequential processing of array
async function processSequentially(items) {
  const results = [];
  for (const item of items) {
    const result = await processItem(item); // One at a time
    results.push(result);
  }
  return results;
}

// 4. Batch parallel processing (concurrency limit)
async function processBatch(items, batchSize = 3) {
  const results = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(item => processItem(item))
    );
    results.push(...batchResults);
  }
  return results;
}
```

---

## 🧠 Key Takeaways

| Pattern | When to Use |
|---------|-------------|
| Callbacks | Legacy code, simple events |
| Promises + .then | Chaining, when async/await not available |
| async/await | DEFAULT choice — clean, readable ✅ |
| Promise.all | Parallel execution, ALL must succeed |
| Promise.allSettled | Parallel, handle partial failures |
| Promise.race | Timeout patterns, first response wins |
| Sequential await | Order matters, each depends on previous |
| for...of + await | Process array items one by one |
