/**
 * ============================================================
 * ✅ Phase 5 — Solutions: Top SDET Live Coding Challenges
 * ============================================================
 */

// 1. Flatten Array
export function flattenArray(arr) {
  const result = [];
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flattenArray(item));
    } else {
      result.push(item);
    }
  }
  return result;
}

// 2. Deep Clone
export function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }
  const cloned = {};
  for (const key of Object.keys(obj)) {
    cloned[key] = deepClone(obj[key]);
  }
  return cloned;
}

// 3. Debounce
export function debounce(fn, delayMs) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delayMs);
  };
}

// 4. Group Test Results
export function groupTestResults(results) {
  return results.reduce((acc, curr) => {
    const status = curr.status;
    if (!acc[status]) acc[status] = [];
    acc[status].push(curr.test);
    return acc;
  }, {});
}

// 5. Two Sum O(N)
export function twoSum(numbers, target) {
  const map = new Map();
  for (let i = 0; i < numbers.length; i++) {
    const diff = target - numbers[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(numbers[i], i);
  }
  return [];
}

// 6. Valid Brackets Stack
export function isValidBrackets(str) {
  const stack = [];
  const map = { ")": "(", "}": "{", "]": "[" };
  for (const char of str) {
    if (["(", "{", "["].includes(char)) {
      stack.push(char);
    } else if (map[char]) {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}

// 7. First Non-Repeating Character
export function firstUniqueChar(str) {
  const count = {};
  for (const ch of str) count[ch] = (count[ch] || 0) + 1;
  for (const ch of str) {
    if (count[ch] === 1) return ch;
  }
  return null;
}

// 8. Custom Promise.all
export function promiseAllCustom(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises) || promises.length === 0) {
      return resolve([]);
    }
    const results = [];
    let completedCount = 0;

    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then((val) => {
          results[index] = val;
          completedCount++;
          if (completedCount === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

// 9. Retry Async Operation
export async function retryOperation(asyncFn, maxRetries, delayMs = 100) {
  let lastErr;
  for (let i = 1; i <= maxRetries; i++) {
    try {
      return await asyncFn();
    } catch (err) {
      lastErr = err;
      if (i < maxRetries) {
        await new Promise((res) => setTimeout(res, delayMs));
      }
    }
  }
  throw lastErr;
}

// 10. Token Bucket Rate Limiter
export function createTokenBucket(capacity, refillRatePerSec) {
  let tokens = capacity;
  let lastRefill = Date.now();

  return {
    takeToken() {
      const now = Date.now();
      const elapsedSec = (now - lastRefill) / 1000;
      tokens = Math.min(capacity, tokens + elapsedSec * refillRatePerSec);
      lastRefill = now;

      if (tokens >= 1) {
        tokens -= 1;
        return true;
      }
      return false;
    },
  };
}
