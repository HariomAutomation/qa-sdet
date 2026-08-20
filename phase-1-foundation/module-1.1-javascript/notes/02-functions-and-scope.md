# 📘 Module 1.1 — JavaScript Deep Dive

## Lesson 2: Functions, Scope & Closures — Zero to Hero Guide

> **लक्ष्य (Goal):** कोड को बार-बार लिखने के बजाय reusable (पुनः प्रयोज्य) बनाना, फ़ंक्शन्स के काम करने के तरीके को समझना और Closures जैसे महत्वपूर्ण इंटरव्यू कॉन्सेप्ट को सरलता से आत्मसात करना।  
> **भाषा शैली (Tone):** सरल, आदरपूर्ण और उदाहरणों से भरपूर (Hinglish).

---

## 🌟 1. Functions क्या हैं और इनकी आवश्यकता क्यों है?

### 💡 Real-Life Analogy (दैनिक जीवन का उदाहरण)
सोचिए एक **जूसर-मिक्सर मशीन (Juicer Machine)**:
- **Input (सामग्री):** फल और दूध (Arguments/Parameters).
- **Process (कार्य):** फल को पीसना और मिलाना (Function Body).
- **Output (परिणाम):** ताज़ा जूस (Return Value).

अगर आपको 10 लोगों के लिए जूस बनाना है, तो आप हर बार नया मिक्सर नहीं बनाते; आप उसी मिक्सर का बार-बार इस्तेमाल करते हैं। 

प्रोग्रामिंग में भी **Function** एक ऐसा कोड ब्लॉक है जिसे आप एक बार लिखते हैं और जितनी बार चाहें उतनी बार कॉल (Call/Execute) कर सकते हैं।

---

## 2️⃣ Functions बनाने के तरीके

JavaScript में फ़ंक्शन बनाने के मुख्य तरीके निम्नलिखित हैं:

### 1. Function Declaration (पारंपरिक तरीका)

```javascript
// फ़ंक्शन को परिभाषित करना (Define)
function calculatePassPercentage(totalTests, passedTests) {
  const percentage = (passedTests / totalTests) * 100;
  return `${percentage.toFixed(2)}%`;
}

// फ़ंक्शन को कॉल करना (Call/Invoke)
const result1 = calculatePassPercentage(50, 48);
console.log("सफलता दर:", result1); // सफलता दर: 96.00%
```

---

### 2. Arrow Functions (आधुनिक ES6+ तरीका — ऑटोमेशन में सबसे ज़्यादा इस्तेमाल)

Arrow Functions का सिंटैक्स छोटा, साफ़ और आधुनिक होता है:

```javascript
// Arrow Function
const isUserEligibleForDiscount = (cartValue, isPrimeMember) => {
  if (isPrimeMember || cartValue > 1000) {
    return true;
  }
  return false;
};

console.log("डिस्काउंट मिलेगा?", isUserEligibleForDiscount(1200, false)); // true
```

> **शॉर्ट हैंड (जब सिर्फ एक ही लाइन हो):**
> ```javascript
> const add = (a, b) => a + b; // return लिखने की भी ज़रूरत नहीं
> console.log("जोड़:", add(10, 20)); // 30
> ```

---

## 3️⃣ Scope (पहुँच का दायरा) — कौन सा वेरिएबल कहाँ दिखाई देगा?

Scope यह तय करता है कि आपके कोड का कौन सा हिस्सा किस वेरिएबल को देख और इस्तेमाल कर सकता है।

```
┌────────────────────────────────────────────────────────┐
│                   Scope Hierarchy                      │
├─────────────────┬──────────────────────────────────────┤
│ Global Scope    │ पूरे प्रोग्राम में हर जगह उपलब्ध    │
│ Function Scope  │ सिर्फ उसी फ़ंक्शन के अंदर उपलब्ध     │
│ Block Scope { } │ सिर्फ उस कर्ली ब्रैकेट { } के अंदर   │
└─────────────────┴──────────────────────────────────────┘
```

```javascript
const globalEnv = "PROD"; // Global Scope

function runTestSuite() {
  const suiteName = "Smoke Test"; // Function Scope

  if (true) {
    const testId = "TC-101"; // Block Scope
    console.log("Block के अंदर:", globalEnv, suiteName, testId); // तीनों दिखेंगे ✅
  }

  // console.log(testId); // ❌ Error: testId ब्लॉक के बाहर मौजूद नहीं है
}

runTestSuite();
```

---

## 4️⃣ Closures (क्लोज़र) — फ़ंक्शन की याददाश्त (Memory)

### 💡 Real-Life Analogy
सोचिए जब आप स्कूल जाते हैं, तो आपका **बैग (Backpack)** हमेशा आपके साथ रहता है। चाहे आप किसी भी क्लासरूम में जाएं, आपके बैग में रखी बोतल और किताबें आपके पास उपलब्ध रहती हैं।

**Closure क्या है?**  
जब कोई फ़ंक्शन किसी दूसरे फ़ंक्शन के अंदर बनता है, तो अंदर वाला फ़ंक्शन अपने बाहर वाले फ़ंक्शन के सभी वेरिएबल्स को हमेशा याद रखता है, भले ही बाहर वाला फ़ंक्शन ख़त्म हो चुका हो!

```javascript
function createCounter(testSuiteName) {
  let count = 0; // Private state (सुरक्षित मान)

  return function logTestCase(testName) {
    count++;
    console.log(`[${testSuiteName}] टेस्ट #${count}: ${testName} निष्पादित हुआ।`);
  };
}

// दो अलग-अलग काउंटर्स बनाएं
const apiLogger = createCounter("API-Suite");
const uiLogger = createCounter("UI-Suite");

apiLogger("GET /users"); // [API-Suite] टेस्ट #1: GET /users निष्पादित हुआ।
apiLogger("POST /login"); // [API-Suite] टेस्ट #2: POST /login निष्पादित हुआ।

uiLogger("Home Page Load"); // [UI-Suite] टेस्ट #1: Home Page Load निष्पादित हुआ।
```

---

## 🎯 Test Automation / SDET में इसका उपयोग

ऑटोमेशन फ्रेमवर्क में हम फ़ंक्शन्स और क्लोज़र्स का इस्तेमाल कस्टम लॉगर्स, ऑटो-रीट्राई यूटिलिटीज और टेस्ट डेटा जनरेटर्स बनाने में करते हैं:

```javascript
// कस्टम असर्शन हेल्पर
function assertStatusCode(actual, expected) {
  if (actual === expected) {
    console.log(`✅ पास: Status Code ${expected} प्राप्त हुआ।`);
  } else {
    console.error(`❌ फेल: अपेक्षित ${expected} था, लेकिन मिला ${actual}।`);
  }
}

assertStatusCode(200, 200);
```

---

## ✍️ Immediate Practice Challenge (स्वयं करके देखें)

### 🎯 Practice Challenge:
1. `formatTestReport` नाम से एक Arrow Function बनाएं।
2. यह फ़ंक्शन तीन पैरामीटर्स ले: `testName`, `status`, और `executionTimeMs`।
3. यह एक सुंदर स्ट्रिंग रिटर्न करे:  
   `"टेस्ट: Login Flow | स्थिति: PASSED | समय: 120ms"`
4. इसे 2 अलग-अलग टेस्ट्स के लिए कॉल करके कंसोल पर प्रिंट करें।

**हल (Solution Hint):**
```javascript
const formatTestReport = (testName, status, executionTimeMs) => {
  return `टेस्ट: ${testName} | स्थिति: ${status} | समय: ${executionTimeMs}ms`;
};

console.log(formatTestReport("Login Flow", "PASSED", 120));
console.log(formatTestReport("Checkout Payment", "FAILED", 450));
```

---

## 🧠 Checkpoint (ज्ञान की समीक्षा)
1. Arrow function और Regular function के सिंटैक्स में क्या मुख्य अंतर है?
2. Block Scope `{ }` के अंदर बना `const` क्या ब्लॉक के बाहर एक्सेस किया जा सकता है?
3. Closure किस प्रकार डेटा को सुरक्षित (Private) रखने में मदद करता है?
