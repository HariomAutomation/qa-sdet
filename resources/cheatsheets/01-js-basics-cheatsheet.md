# 📋 JavaScript Basics — Quick Cheatsheet

## Variables
```
const x = 10;   // ✅ PREFER — can't reassign
let y = 20;     // ✅ OK — can reassign
var z = 30;     // ❌ NEVER — function-scoped, hoisted
```

## Data Types (8)
| Type | Example | typeof |
|------|---------|--------|
| string | `"hello"` | `"string"` |
| number | `42`, `3.14`, `NaN` | `"number"` |
| boolean | `true`, `false` | `"boolean"` |
| undefined | `undefined` | `"undefined"` |
| null | `null` | `"object"` ⚠️ |
| bigint | `10n` | `"bigint"` |
| symbol | `Symbol()` | `"symbol"` |
| object | `{}`, `[]`, `fn()` | `"object"` |

## Falsy Values (yaad karo — sirf 6 hain!)
```
false, 0, "", null, undefined, NaN
// Baaki SAB truthy hai (including [], {}, "0", "false")
```

## Equality
```
=== (strict)  → HAMESHA use karo
==  (loose)   → KABHI mat use karo
```

## Operators
```
||   → pehla truthy (ya last)     "default value" (BUT 0, "" ko falsy maanta hai)
??   → pehla non-null/undefined   "default value" (0, "" ko truthy maanta hai) ✅
?.   → safe property access       obj?.prop?.nested
&&   → pehla falsy (ya last)      "conditional execution"
```

## Loops
```
for...of  → arrays/iterables ke VALUES
for...in  → objects ke KEYS
```

## String Methods
```
.trim()           .toUpperCase()      .toLowerCase()
.includes(str)    .startsWith(str)    .endsWith(str)
.indexOf(str)     .slice(start, end)  .split(sep)
.replace(a, b)    .replaceAll(a, b)   .padStart(n, ch)
```
