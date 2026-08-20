# 📘 Module 1.2 — TypeScript Mastery for SDETs

## Complete Guide: TypeScript from Zero to Hero

> **लक्ष्य (Goal):** अगर आप केवल बेसिक जावास्क्रिप्ट जानते हैं, तो भी आप TypeScript के टाइप सिस्टम, इंटरफेस, जेनेरिक्स और डेकोरेटर्स को आसानी से समझकर एंटरप्राइज-लेवल टेस्ट ऑटोमेशन फ्रेमवर्क बना सकें।  
> **भाषा शैली (Tone):** सरल, आदरपूर्ण और उदाहरणों से भरपूर (Hinglish).

---

## 🌟 1. TypeScript क्या है और हमें इसकी आवश्यकता क्यों है?

### 💡 Real-Life Analogy
- **JavaScript:** बिना हेलमेट और गार्ड के बाइक चलाना — आप बहुत तेज़ चल सकते हैं, लेकिन छोटी सी टक्कर (Undefined variable) पर पूरी बाइक क्रैश हो जाती है।
- **TypeScript:** हेलमेट, जैकेट और GPS नेविगेशन के साथ बाइक चलाना — कोड रन होने से पहले ही कंपाइलर आपको बता देता है कि आगे कहाँ गड्ढा (Bug) है!

जब हम बड़े टेस्ट ऑटोमेशन प्रोजेक्ट्स (Playwright, API Frameworks) बनाते हैं, तो TypeScript हमें:
1. **ऑटो-कम्प्लीशन (IntelliSense):** कोड लिखते समय मेथड और प्रॉपर्टी के नाम अपने आप सजेस्ट होते हैं।
2. **कंपाइल-टाइम सुरक्षा:** ग़लत डेटा पास करने पर कोड चलने से पहले ही एरर पकड़ में आ जाता है।

---

## 2️⃣ Basic Types — मूल प्रकार

```typescript
// 1. Primitives (मूल प्रकार)
const studentName: string = "Hariom";
const testCaseCount: number = 45;
const isSuitePassed: boolean = true;

// 2. Arrays (सूचियां)
const supportedBrowsers: string[] = ["chromium", "firefox", "webkit"];
const responseTimes: number[] = [120, 350, 410];

// 3. Enums (फिक्स्ड ऑप्शन्स का नामकरण)
enum TestPriority {
  P0 = "BLOCKER",
  P1 = "CRITICAL",
  P2 = "MAJOR",
  P3 = "MINOR",
}

const currentBugPriority: TestPriority = TestPriority.P0;
console.log("बग प्राथमिकता:", currentBugPriority); // BLOCKER
```

---

## 3️⃣ Interfaces बनाम Type Aliases — डेटा का सांचा (Blueprint)

### 💡 Analogy
जैसे आधार कार्ड का एक फिक्स्ड फॉर्मैट होता है (नाम, उम्र, पता अनिवार्य है), वैसे ही **Interface** यह तय करता है कि किसी ऑब्जेक्ट में कौन-कौन सी प्रॉपर्टीज होनी चाहिए:

```typescript
// यूज़र डेटा का सांचा (Contract)
interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "STANDARD" | "GUEST"; // Union Type
  phoneNumber?: string; // Optional Property (? का मतलब अनिवार्य नहीं)
}

const testUser: UserProfile = {
  id: "USR-001",
  name: "Hariom",
  email: "hariom@automation.com",
  role: "ADMIN",
  // phoneNumber छोड़ दिया, क्योंकि वह optional है
};
```

---

## 4️⃣ Generics (`<T>`) — लचीला और सुरक्षित कोड

### 💡 Real-Life Analogy
सोचिए एक **पारदर्शी डिब्बा (Container)**:
आप उस डिब्बे पर लिख सकते हैं कि इसमें केवल 'सेब' रखे जाएंगे, या 'किताबें' रखी जाएंगी।

**Generic `<T>`** एक टाइप का वेरिएबल है जो यह तय करता है कि फ़ंक्शन जिस प्रकार का डेटा लेगा, उसी प्रकार का डेटा लौटाएगा:

```typescript
// Generic API Response Wrapper
interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T; // T कोई भी डेटा टाइप हो सकता है!
}

// 1. जब Response में User का डेटा हो:
const userResponse: ApiResponse<UserProfile> = {
  statusCode: 200,
  message: "Success",
  data: testUser,
};

// 2. जब Response में Numbers की लिस्ट हो:
const metricsResponse: ApiResponse<number[]> = {
  statusCode: 200,
  message: "Metrics calculated",
  data: [120, 240, 180],
};
```

---

## 5️⃣ Utility Types — टाइप को आसानी से बदलना

TypeScript में बने-बनाए टूल्स होते हैं जो पुराने टाइप से नया टाइप बना देते हैं:

1. **`Partial<T>`:** सभी प्रॉपर्टीज को Optional (`?`) बना देता है (डेटा अपडेट टेस्ट के लिए बेहतरीन)।
2. **`Pick<T, Keys>`:** केवल चुनिंदा प्रॉपर्टीज को लेता है।
3. **`Omit<T, Keys>`:** किसी प्रॉपर्टी को छोड़कर बाकी सब ले लेता है।

```typescript
// केवल email और role को चुनना:
type UserCredentials = Pick<UserProfile, "email" | "role">;

// id को छोड़कर बाकी सब लेना (जब नया यूज़र रजिस्टर कर रहे हों):
type CreateUserPayload = Omit<UserProfile, "id">;
```

---

## ✍️ Immediate Practice Challenge (स्वयं करके देखें)

### 🎯 Practice Challenge:
1. `TestCase` नाम से एक TypeScript Interface बनाएं जिसमें:
   - `id`: `string`
   - `title`: `string`
   - `status`: `"PASSED" | "FAILED" | "SKIPPED"`
   - `executionTimeMs`: `number`
2. एक Generic फ़ंक्शन `filterByStatus<T>` बनाएं जो किसी भी एरे से स्टेटस के आधार पर आइटम्स फ़िल्टर करे।
3. इसे 3 टेस्ट केसेस की लिस्ट पर रन करके देखें।

**हल (Solution Hint):**
```typescript
interface TestCase {
  id: string;
  title: string;
  status: "PASSED" | "FAILED" | "SKIPPED";
  executionTimeMs: number;
}

function filterByStatus<T extends { status: string }>(items: T[], targetStatus: string): T[] {
  return items.filter((item) => item.status === targetStatus);
}

const tests: TestCase[] = [
  { id: "TC-1", title: "Login Flow", status: "PASSED", executionTimeMs: 150 },
  { id: "TC-2", title: "Checkout Flow", status: "FAILED", executionTimeMs: 500 },
];

const failedOnes = filterByStatus(tests, "FAILED");
console.log("फेल टेस्ट्स:", failedOnes);
```
