# 📘 Module 1.3 — Git & Version Control

## Complete Guide: Git & GitHub from Zero to Hero

> **लक्ष्य (Goal):** अगर आप Git से पूरी तरह नए हैं, तो भी आप कोड का वर्ज़न कंट्रोल करना, ब्रांचेस बनाना, मर्च कॉन्फ्लिक्ट्स सुलझाना और टीम के साथ GitHub पर काम करना आसानी से सीख सकें।  
> **भाषा शैली (Tone):** सरल, आदरपूर्ण और उदाहरणों से भरपूर (Hinglish).

---

## 🌟 1. Git क्या है और हमें इसकी आवश्यकता क्यों है?

### 💡 Real-Life Analogy (वीडियो गेम का चेकपॉइंट)
सोचिए जब आप कोई कठिन वीडियो गेम खेलते हैं और किसी बड़े Boss से लड़ने से पहले गेम को **Save (Checkpoint)** कर लेते हैं। अगर गेम में आपकी हार हो जाती है, तो आप उसी सेवड चेकपॉइंट से दोबारा शुरू कर सकते हैं।

**Git आपके कोड की टाइम मशीन (Time Machine) है:**
- जब भी आप नया कोड लिखते हैं, तो आप उसका एक सुरक्षित स्नैपशॉट (**Commit**) ले लेते हैं।
- अगर भविष्य में कोई बग आ जाए, तो आप 1 सेकंड में पुराने वर्किंग कोड पर वापस जा सकते हैं।

---

## 2️⃣ Git के 3 मुख्य चरण (The 3 States of Git)

```
┌─────────────────┐       git add       ┌─────────────────┐      git commit     ┌─────────────────┐
│  Working Tree   │ ──────────────────► │  Staging Area   │ ──────────────────► │   Repository    │
│ (जहाँ आप कोड    │                     │ (तैयार पार्सल   │                     │ (स्थायी तिजोरी  │
│  लिख रहे हैं)   │                     │  की तरह)        │                     │  - Committed)   │
└─────────────────┘                     └─────────────────┘                     └─────────────────┘
```

---

## 3️⃣ आवश्यक बुनियादी कमांड्स (Daily Commands)

### 1. पहली बार सेटअप (One-time Setup)
```bash
git config --global user.name "Aapka Naam"
git config --global user.email "aapka.email@example.com"
```

### 2. नया प्रोजेक्ट शुरू करना या क्लोन करना
```bash
# अपने खाली फ़ोल्डर को Git रिपॉजिटरी बनाएं:
git init

# या GitHub से बना-बनाया प्रोजेक्ट डाउनलोड करें:
git clone https://github.com/HariomAutomation/qa-sdet.git
```

### 3. स्टेटस देखना, स्टेज करना और कमिट करना
```bash
# 1. कौन-सी फाइल्स बदली हैं, यह चेक करें:
git status

# 2. फाइल्स को स्टेजिंग एरिया में जोड़ें:
git add .

# 3. एक साफ़ और स्पष्ट मैसेज के साथ सेव करें:
git commit -m "feat: login page automation test suite add kiya"
```

---

## 4️⃣ Branches (शाखाएँ) — बिना मुख्य कोड छेड़े नया काम करना

### 💡 Analogy
जैसे पेड़ के तने (Main Trunk) को नुकसान पहुंचाए बिना नई टहनी पर पत्तियां उगती हैं, वैसे ही Git में हम `main` ब्रांच को सुरक्षित रखते हुए अपनी अलग `feature` ब्रांच बनाकर काम करते हैं:

```bash
# 1. नई ब्रांच बनाएं और उस पर स्विच करें:
git checkout -b feature/checkout-tests

# 2. अपने बदलाव कमिट करें:
git add .
git commit -m "feat: checkout payment validation tests"

# 3. वापस main ब्रांच पर आएं:
git checkout main

# 4. अपने नए फीचर को main में मिला लें:
git merge feature/checkout-tests
```

---

## 5️⃣ Merge Conflicts (टकराव) को कैसे सुलझाएं?

जब दो डेवलपर्स/SDETs एक ही फाइल की एक ही लाइन पर अलग-अलग कोड लिख देते हैं, तो Git कन्फ्यूज़ हो जाता है।

```
<<<<<<< HEAD (आपका करंट कोड)
const baseUrl = "https://staging.qa.com";
=======
const baseUrl = "https://prod.qa.com";
>>>>>>> feature-branch (आने वाला कोड)
```

**सुलझाने का तरीका:**  
1. VS Code में फाइल खोलें।
2. तय करें कि कौन-सी लाइन रखनी है (Accept Current / Accept Incoming / Combine Both)।
3. मार्कर्स `<<<<<<<` और `>>>>>>>` हटाकर फाइल सेव करें।
4. `git add .` और `git commit -m "fix: merge conflict resolved"` चलाएं।

---

## ✍️ Immediate Practice Challenge (स्वयं करके देखें)

### 🎯 Practice Challenge:
1. अपने टर्मिनल में एक नया फ़ोल्डर बनाएं: `mkdir git-test && cd git-test`।
2. `git init` चलाकर रिपॉजिटरी बनाएं।
3. एक फाइल बनाएं: `echo "console.log('Hello SDET');" > app.js`।
4. `git status`, `git add app.js`, और `git commit -m "init: first commit"` चलाएं।
5. `git log --oneline` चलाकर अपना पहला चेकपॉइंट देखें।
