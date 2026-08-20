# 📋 Functions & Scope — Quick Cheatsheet

## Function Types
```javascript
// Declaration (hoisted ✅)
function add(a, b) { return a + b; }

// Expression (NOT hoisted ❌)
const add = function(a, b) { return a + b; };

// Arrow (NOT hoisted, no `this`, no `arguments`)
const add = (a, b) => a + b;
const square = n => n * n;          // 1 param: no parens
const rand = () => Math.random();    // 0 params: parens needed
const obj = (a, b) => ({ a, b });    // return object: wrap in ()
```

## Parameters
```javascript
// Default
function greet(name = "Guest") {}

// Rest (collect into array)
function sum(...nums) { /* nums is array */ }

// Spread (expand array)
Math.max(...[1,2,3])  // Math.max(1,2,3)
```

## Scope Rules
```
Global → Function → Block
var   = function-scoped (AVOID)
let   = block-scoped ✅
const = block-scoped ✅
```

## Hoisting
```
function declaration  → FULLY hoisted (call before define ✅)
var                   → hoisted as undefined
let/const             → hoisted but TDZ (ReferenceError)
function expression   → NOT hoisted
arrow function        → NOT hoisted
```

## Closure
```
Closure = function + its surrounding scope
Use for: private variables, factories, memoization, counters
```

## `this` Rules
```
Regular function  → determined by CALLER (dynamic)
Arrow function    → determined by PARENT SCOPE (lexical)
.call(obj, args)  → set this explicitly
.apply(obj, [args]) → same, but args in array
.bind(obj)        → returns new function with fixed this
```

## Higher-Order Functions
```
Takes function as arg    → callbacks, map, filter, reduce
Returns function         → factories, decorators, compose
```

## Common Patterns
```javascript
// Memoize
const memo = fn => { const cache = {}; return (...a) => cache[JSON.stringify(a)] ??= fn(...a); }

// IIFE
(function() { /* isolated scope */ })();
(() => { /* arrow IIFE */ })();

// Compose (right-to-left)
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

// Pipe (left-to-right)
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
```
