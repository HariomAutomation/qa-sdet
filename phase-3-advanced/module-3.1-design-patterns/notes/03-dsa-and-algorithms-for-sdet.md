# 📘 Module 3.1 — Programming Concepts & Design Patterns

## Lesson 3: Data Structures & Algorithms (DSA) for SDET Interviews

---

## 1️⃣ Big O Complexity Guide

| Notation | Name | Example Algorithm |
|---|---|---|
| **O(1)** | Constant Time | HashMap lookup, Array indexing (`arr[0]`) |
| **O(log N)** | Logarithmic Time | Binary Search |
| **O(N)** | Linear Time | Linear Scan, `filter()`, `map()`, Single Loop |
| **O(N log N)** | Linearithmic Time | Efficient Sorting (`Array.prototype.sort`, MergeSort, QuickSort) |
| **O(N²)** | Quadratic Time | Nested Loops (`for` inside `for`) — AVOID in tests! |

---

## 2️⃣ Top 5 Must-Know SDET Coding Problems

### 1. Two Sum (HashMap Approach — O(N))
```javascript
function twoSum(nums, target) {
  const map = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
```

### 2. Valid Parentheses / Locator Syntax Validator (Stack — O(N))
```javascript
function isValid(s) {
  const stack = [];
  const map = { ")": "(", "}": "{", "]": "[" };

  for (const char of s) {
    if (["(", "{", "["].includes(char)) {
      stack.push(char);
    } else if (map[char]) {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}
```

### 3. Group Anagrams / Test Metric Classifier (Map — O(N * K log K))
```javascript
function groupAnagrams(strs) {
  const map = new Map();
  for (const str of strs) {
    const sortedKey = str.split("").sort().join("");
    if (!map.has(sortedKey)) map.set(sortedKey, []);
    map.get(sortedKey).push(str);
  }
  return Array.from(map.values());
}
```

### 4. Merge Intervals (Test Execution Windows)
```javascript
function mergeIntervals(intervals) {
  if (intervals.length <= 1) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const last = merged[merged.length - 1];

    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      merged.push(current);
    }
  }
  return merged;
}
```
