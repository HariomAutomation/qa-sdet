# 📘 Module 1.1 — JavaScript Deep Dive

## Lesson 6: Event Loop, Error Handling & Node.js Fundamentals — Zero to Hero Guide

> **लक्ष्य (Goal):** JavaScript का इंजन पर्दे के पीछे कैसे काम करता है (Event Loop), गलतियों और एक्सेप्शन्स को सुरक्षित तरीके से कैसे संभालें (Error Handling), और Node.js के कोर मॉड्यूल्स का उपयोग कैसे करें।  
> **भाषा शैली (Tone):** सरल, आदरपूर्ण और उदाहरणों से भरपूर (Hinglish).

---

## 🌟 1. Event Loop — एयरपोर्ट बोर्डिंग का उदाहरण

### 💡 Real-Life Analogy
सोचिए एयरपोर्ट पर यात्रियों की बोर्डिंग लाइन:
1. **Call Stack:** वह मुख्य गेट जहाँ एक समय में एक ही यात्री का पासपोर्ट चेक होता है (Single Threaded).
2. **Microtask Queue (VIP Fast Track):** बिज़नेस क्लास / VIP यात्री (`Promise.then()`, `queueMicrotask`) — ये हमेशा आम लाइन से पहले अंदर जाते हैं!
3. **Macrotask / Callback Queue (Regular Line):** साधारण यात्री (`setTimeout`, `setInterval`) — जब VIP लाइन पूरी तरह खाली हो जाती है, तभी इनका नंबर आता है।

```
┌─────────────────────────────────────────────────────────────┐
│                      Event Loop Order                       │
├─────────────────────────────────────────────────────────────┤
│ 1. Synchronous Code (Call Stack में तुरंत चलेगा)             │
│ 2. Microtasks (Promises / async-await)                      │
│ 3. Macrotasks (setTimeout / setInterval / I/O Events)        │
└─────────────────────────────────────────────────────────────┘
```

---

## 2️⃣ Interview Classic Puzzle (आउटपुट क्रम समझें)

```javascript
console.log("1: शुरू"); // Sync

setTimeout(() => {
  console.log("2: setTimeout (Macrotask)");
}, 0);

Promise.resolve().then(() => {
  console.log("3: Promise (Microtask)");
});

console.log("4: समाप्त"); // Sync

// 🎯 आउटपुट का क्रम:
// 1: शुरू
// 4: समाप्त
// 3: Promise (Microtask)
// 2: setTimeout (Macrotask)
```

---

## 3️⃣ Error Handling — गलतियों को संभालना

सॉफ्टवेयर ऑटोमेशन में अगर किसी एक टेस्ट में एरर आए, तो पूरा फ्रेमवर्क क्रैश नहीं होना चाहिए। इसके लिए हम `try...catch...finally` और **Custom Error Classes** का उपयोग करते हैं:

```javascript
// अपनी खुद की कस्टम एरर क्लास बनाना:
class ElementNotFoundError extends Error {
  constructor(selector) {
    super(`❌ वेब एलिमेंट DOM में नहीं मिला: '${selector}'`);
    this.name = "ElementNotFoundError";
  }
}

function clickButton(selector) {
  const isElementVisible = false; // एलिमेंट नहीं दिखा

  if (!isElementVisible) {
    throw new ElementNotFoundError(selector);
  }
  console.log("बटन क्लिक हुआ!");
}

try {
  clickButton("#checkout-submit-btn");
} catch (error) {
  if (error instanceof ElementNotFoundError) {
    console.warn("⚠️ चेतावनी:", error.message);
    console.log("📸 स्क्रीनशॉट कैप्चर किया गया!");
  } else {
    console.error("अनपेक्षित एरर:", error);
  }
} finally {
  console.log("🧹 टेस्ट क्लीनअप पूरा हुआ (ब्राउज़र बंद हुआ)।");
}
```

---

## 4️⃣ Node.js Core Modules — फाइलें पढ़ना और पाथ संभालना

Node.js आपको ऑपरेटिंग सिस्टम की फाइल्स और फोल्डर्स के साथ काम करने की शक्ति देता है:

```javascript
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// सुरक्षित क्रॉस-प्लेटफ़ॉर्म पाथ बनाना (Windows और Linux दोनों पर सही चले):
const reportPath = path.join(__dirname, "..", "reports", "allure-results.json");
console.log("रिपोर्ट का पाथ:", reportPath);
```

---

## ✍️ Immediate Practice Challenge (स्वयं करके देखें)

### 🎯 Practice Challenge:
1. `ApiTimeoutError` नाम से एक कस्टम एरर क्लास बनाएं जो `Error` को `extends` करे।
2. एक फ़ंक्शन `fetchReport(url, timeoutMs)` बनाएं। अगर `timeoutMs < 1000` हो, तो `ApiTimeoutError` थ्रो करें।
3. इसे `try...catch` ब्लॉक में चलाकर टेस्ट करें।

**हल (Solution Hint):**
```javascript
class ApiTimeoutError extends Error {
  constructor(url, timeoutMs) {
    super(`⏱️ API कॉल टाइमआउट हुआ '${url}' (${timeoutMs}ms सीमा पार हुई)।`);
    this.name = "ApiTimeoutError";
  }
}

function fetchReport(url, timeoutMs) {
  if (timeoutMs < 1000) {
    throw new ApiTimeoutError(url, timeoutMs);
  }
  return { status: 200, data: "रिपोर्ट डेटा" };
}

try {
  fetchReport("https://api.example.com/reports", 500);
} catch (err) {
  console.log(`पकड़ा गया एरर: [${err.name}] ${err.message}`);
}
```
