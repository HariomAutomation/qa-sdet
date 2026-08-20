# 📘 Module 1.1 — JavaScript Deep Dive

## Lesson 4: Arrays & Objects Manipulation — Zero to Hero Guide

> **लक्ष्य (Goal):** ऑटोमेशन में डेटा के बड़े सेट्स (जैसे 1,000 टेस्ट रिजल्ट्स या 500 API यूज़र्स की लिस्ट) को आसानी से फ़िल्टर, ट्रांसफ़ॉर्म और एग्रीगेट करना सीखना।  
> **भाषा शैली (Tone):** सरल, आदरपूर्ण और उदाहरणों से भरपूर (Hinglish).

---

## 🌟 1. Higher-Order Array Methods — दैनिक जीवन के 3 उदाहरण

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Array Methods Analogy                           │
├─────────┬──────────────────────────────────┬───────────────────────────┤
│ Method  │ Real-Life Analogy                │ क्या करता है?             │
├─────────┼──────────────────────────────────┼───────────────────────────┤
│ map()   │ असेंबली लाइन (कार पर पेंट करना)  │ हर आइटम को बदलकर नया array│
│ filter()│ चाय की छन्नी (Tea Strainer)      │ शर्त पूरी करने वाले चुनना │
│ reduce()│ मॉल का बिलिंग काउंटर (Cashier)   │ सब चीज़ों का एक कुल मान   │
└─────────┴──────────────────────────────────┴───────────────────────────┘
```

---

## 2️⃣ 1. `filter()` — केवल काम का डेटा चुनना

जब आपके पास बहुत सारे टेस्ट रिजल्ट्स हों और आपको **केवल फेल हुए टेस्ट्स** अलग निकालने हों:

```javascript
const testRuns = [
  { id: "TC-01", name: "User Login", status: "PASS", duration: 120 },
  { id: "TC-02", name: "Checkout Cart", status: "FAIL", duration: 450 },
  { id: "TC-03", name: "Payment Gateway", status: "FAIL", duration: 890 },
  { id: "TC-04", name: "Profile Update", status: "PASS", duration: 150 },
];

// केवल 'FAIL' वाले टेस्ट्स फ़िल्टर करें:
const failedTests = testRuns.filter((test) => test.status === "FAIL");

console.log("कुल फेल टेस्ट्स:", failedTests.length); // 2
console.log("फेल टेस्ट्स की सूची:", failedTests);
```

---

## 3️⃣ 2. `map()` — डेटा का रूप बदलना (Transform)

जब आपको सिर्फ टेस्ट के नामों की एक साधारण स्ट्रिंग एरे बनानी हो:

```javascript
// हर ऑब्जेक्ट में से सिर्फ नाम और ड्यूरेशन निकालें:
const testSummaries = testRuns.map((test) => `${test.name} (${test.duration}ms)`);

console.log(testSummaries);
// [ 'User Login (120ms)', 'Checkout Cart (450ms)', 'Payment Gateway (890ms)', 'Profile Update (150ms)' ]
```

---

## 4️⃣ 3. `reduce()` — डेटा का योग या समूह बनाना (Aggregate / Group)

जब आपको सभी टेस्ट्स का **कुल निष्पादन समय (Total Execution Time)** निकालना हो:

```javascript
// 0 से शुरू करके हर टेस्ट का duration जोड़ते जाएं:
const totalExecutionTime = testRuns.reduce((accumulator, test) => {
  return accumulator + test.duration;
}, 0);

console.log(`⏱️ सुइट का कुल समय: ${totalExecutionTime}ms`); // ⏱️ सुइट का कुल समय: 1610ms
```

---

## 5️⃣ Objects Manipulation — `Map` और `Set`

### A. `Set` — यूनिक (Unique) वैल्यूज़ का संग्रह (डुप्लिकेट्स हटाना)
जब आपको टेस्ट रिजल्ट्स में से डुप्लिकेट ब्राउज़र नेम्स हटाने हों:

```javascript
const browserLog = ["chrome", "firefox", "chrome", "safari", "firefox", "chrome"];

const uniqueBrowsers = [...new Set(browserLog)];
console.log("अद्वितीय ब्राउज़र्स:", uniqueBrowsers); // [ 'chrome', 'firefox', 'safari' ]
```

---

### B. `Map` — Key-Value का शक्तिशाली स्टोरेज (O(1) Lookup)
जब आपको हज़ारों टेस्ट केसेज़ को उनके ID से तेज़ी से खोजना हो:

```javascript
const testCaseMap = new Map();

testCaseMap.set("TC-101", { title: "Login Validation", priority: "P0" });
testCaseMap.set("TC-102", { title: "Password Reset", priority: "P1" });

console.log("TC-101 का विवरण:", testCaseMap.get("TC-101"));
console.log("क्या TC-103 मौजूद है?", testCaseMap.has("TC-103")); // false
```

---

## ✍️ Immediate Practice Challenge (स्वयं करके देखें)

### 🎯 Practice Challenge:
नीचे दिए गए एरे का उपयोग करें:
```javascript
const apiRequests = [
  { endpoint: "/login", responseTimeMs: 220, success: true },
  { endpoint: "/orders", responseTimeMs: 850, success: false },
  { endpoint: "/products", responseTimeMs: 140, success: true },
  { endpoint: "/checkout", responseTimeMs: 910, success: false },
];
```
1. `filter` का उपयोग करके केवल स्लो रिक्वेस्ट्स (`responseTimeMs > 500`) की लिस्ट निकालें।
2. `map` का उपयोग करके उन स्लो एंडपॉइंट्स के नाम निकालें।
3. `reduce` का उपयोग करके सभी रिक्वेस्ट्स का औसत रिस्पांस टाइम निकालें।

**हल (Solution Hint):**
```javascript
// 1. Slow requests
const slowRequests = apiRequests.filter((r) => r.responseTimeMs > 500);

// 2. Endpoint names
const slowEndpoints = slowRequests.map((r) => r.endpoint);
console.log("धीमे एंडपॉइंट्स:", slowEndpoints); // [ '/orders', '/checkout' ]

// 3. Average response time
const totalTime = apiRequests.reduce((sum, r) => sum + r.responseTimeMs, 0);
const avgTime = totalTime / apiRequests.length;
console.log(`औसत रिस्पांस टाइम: ${avgTime}ms`); // औसत रिस्पांस टाइम: 530ms
```
