# 📘 Module 1.1 — JavaScript Deep Dive

## Lesson 5: Asynchronous Programming (Promises & Async/Await) — Zero to Hero Guide

> **लक्ष्य (Goal):** ऑटोमेशन टेस्टिंग का 90% कोड Asynchronous (असिंक्रोनस) होता है (जैसे नेटवर्क कॉल का इंतज़ार, पेज लोड होना, डेटाबेस क्वेरी)। इसे गहराई से और आत्मविश्वास के साथ समझना।  
> **भाषा शैली (Tone):** सरल, आदरपूर्ण और उदाहरणों से भरपूर (Hinglish).

---

## 🌟 1. Sync बनाम Async — रेस्टोरेंट का उदाहरण

### 💡 Real-Life Analogy
सोचिए जब आप किसी रेस्टोरेंट में खाना ऑर्डर करते हैं:

- **Synchronous (सिंक्रोनस / ब्लॉकिंग):** वेटर आपका ऑर्डर लेता है और जब तक किचन में शेफ खाना नहीं बना लेता, वेटर वहीं खड़ा रहता है और किसी दूसरे ग्राहक से बात नहीं करता (पूरा सिस्टम रुक जाता है ❌)।
- **Asynchronous (असिंक्रोनस / नॉन-ब्लॉकिंग):** वेटर आपको एक **टोकन/बज़र (Promise)** दे देता है और दूसरे ग्राहकों के पास चला जाता है। जब खाना तैयार हो जाता है, तो बज़र बजता है और आप अपना खाना ले लेते हैं (सिस्टम बिना रुके तेज़ी से काम करता है ✅)।

---

## 2️⃣ Promises (प्रॉमिस) — भविष्य का वादा

Promise एक ऐसा ऑब्जेक्ट है जो यह बताता है कि कोई असिंक्रोनस कार्य भविष्य में सफल (`Resolve`) होगा या असफल (`Reject`)।

```
                  ┌───────────────┐
                  │    Pending    │ (शुरुआती स्थिति - इंतज़ार)
                  └───────┬───────┘
                          │
             ┌────────────┴────────────┐
             ▼                         ▼
    ┌─────────────────┐       ┌─────────────────┐
    │    Fulfilled    │       │    Rejected     │
    │ (सफल - resolve) │       │ (असफल - reject) │
    └─────────────────┘       └─────────────────┘
```

```javascript
// एक साधारण प्रॉमिस बनाना:
const fetchUserData = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId === "USR-101") {
        resolve({ id: "USR-101", name: "Hariom", role: "SDET Lead" });
      } else {
        reject(new Error("यूज़र डेटाबेस में नहीं मिला!"));
      }
    }, 1000); // 1 सेकंड का नेटवर्क डिले
  });
};
```

---

## 3️⃣ Async / Await — आधुनिक और साफ़ तरीका (Standard in Playwright)

`async/await` JavaScript का सबसे बेहतरीन फीचर है। यह असिंक्रोनस कोड को बिल्कुल साधारण सीधे कोड की तरह पढ़ने में आसान बना देता है:

```javascript
async function runUserVerificationTest() {
  console.log("⏳ डेटा फ़ेच होना शुरू हुआ...");

  try {
    // await का मतलब है: 'जब तक यह वादा पूरा न हो, तब तक इंतज़ार करो'
    const user = await fetchUserData("USR-101");
    console.log("✅ यूज़र डेटा प्राप्त हुआ:", user.name, "| पद:", user.role);
  } catch (error) {
    console.error("❌ टेस्ट फेल हुआ:", error.message);
  } finally {
    console.log("🏁 टेस्ट निष्पादन संपन्न।");
  }
}

runUserVerificationTest();
```

---

## 4️⃣ Parallel Execution — `Promise.all()` (समानांतर टेस्ट्स)

जब आपको 3 अलग-अलग APIs को एक साथ टेस्ट करना हो और सबका इंतज़ार समानांतर (Parallel) करना हो:

```javascript
async function runParallelHealthChecks() {
  console.time("कुल समय");

  const checkAuthService = () => new Promise((res) => setTimeout(() => res("Auth OK"), 500));
  const checkPaymentService = () => new Promise((res) => setTimeout(() => res("Payment OK"), 700));
  const checkCatalogService = () => new Promise((res) => setTimeout(() => res("Catalog OK"), 600));

  // तीनों सेवाएँ एक साथ चलेंगी (700ms में तीनों पूरी होंगी):
  const results = await Promise.all([
    checkAuthService(),
    checkPaymentService(),
    checkCatalogService(),
  ]);

  console.log("तीनों सेवाओं का स्टेटस:", results);
  console.timeEnd("कुल समय"); // ~700ms (1800ms नहीं!)
}

runParallelHealthChecks();
```

---

## 🎯 Playwright और Test Automation में इसका महत्व

Playwright में हर एक एक्शन (जैसे `goto`, `click`, `fill`) एक Promise लौटाता है, इसलिए हर लाइन के आगे `await` लगाना अनिवार्य होता है:

```javascript
// Playwright E2E Test Example:
async function testLogin(page) {
  await page.goto("https://www.saucedemo.com");
  await page.fill("#user-name", "standard_user");
  await page.fill("#password", "secret_sauce");
  await page.click("#login-button");
}
```

---

## ✍️ Immediate Practice Challenge (स्वयं करके देखें)

### 🎯 Practice Challenge:
1. एक `delay(ms)` नाम का हेल्पर फ़ंक्शन बनाएं जो दी गई मिलीसेकंड्स बाद resolve होने वाला Promise लौटाए।
2. एक `async` फ़ंक्शन `simulateApiRetry()` बनाएं जो:
   - "प्रयास 1 शुरू..." प्रिंट करे और 500ms रुके।
   - "प्रयास 2 शुरू..." प्रिंट करे और 500ms रुके।
   - "सफल रिस्पांस प्राप्त हुआ (200 OK)" प्रिंट करे।

**हल (Solution Hint):**
```javascript
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function simulateApiRetry() {
  console.log("🔄 प्रयास 1 शुरू...");
  await delay(500);

  console.log("🔄 प्रयास 2 शुरू...");
  await delay(500);

  console.log("✅ सफल रिस्पांस प्राप्त हुआ (200 OK)!");
}

simulateApiRetry();
```
