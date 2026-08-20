# 📘 Module 1.4 — SQL & Database Testing

## Complete Guide: SQL & Database Validation from Zero to Hero

> **लक्ष्य (Goal):** अगर आपने पहले कभी SQL नहीं लिखा है, तो भी आप डेटाबेस क्वेरीज़ (CRUD, JOINs, Subqueries) को आसानी से समझकर बैकएंड डेटा वैलिडेशन और टेस्ट डेटा प्रिपरेशन कर सकें।  
> **भाषा शैली (Tone):** सरल, आदरपूर्ण और उदाहरणों से भरपूर (Hinglish).

---

## 🌟 1. Database & SQL क्या है और हमें इसकी आवश्यकता क्यों है?

### 💡 Real-Life Analogy (डिजिटल फ़ाइल अलमारी)
सोचिए जब आप किसी बैंक या ई-कॉमर्स साइट पर ऑर्डर बुक करते हैं:
1. **Frontend (UI):** स्क्रीन पर दिखने वाला "Buy Now" बटन।
2. **Backend (API):** बैंक का कर्मचारी जो पेमेंट प्रोसेस करता है।
3. **Database (डेटाबेस):** बैंक की सुरक्षित तिजोरी और लेज़र बहीखाता ( जहाँ हर लेन-देन हमेशा के लिए दर्ज रहता है)।

**SQL (Structured Query Language)** वह भाषा है जिसका उपयोग करके हम डेटाबेस की तिजोरी से बात करते हैं और डेटा पूछते या अपडेट करते हैं।

---

## 2️⃣ 1. टेबल बनाना और डेटा जोड़ना (CREATE & INSERT)

```sql
-- यूज़र्स की टेबल बनाना
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- नया टेस्ट डेटा जोड़ना:
INSERT INTO users (name, email, role) 
VALUES 
  ('Hariom', 'hariom@qa.com', 'sdet'),
  ('Priya', 'priya@qa.com', 'dev'),
  ('Rahul', 'rahul@qa.com', 'qa');
```

---

## 3️⃣ 2. डेटा खोजना और फ़िल्टर करना (SELECT & WHERE)

```sql
-- 1. सभी रिकॉर्ड्स देखना:
SELECT * FROM users;

-- 2. केवल चुनिंदा कॉलम्स देखना:
SELECT name, role FROM users;

-- 3. शर्त (Condition) लगाकर फ़िल्टर करना:
SELECT * FROM users 
WHERE role = 'sdet';

-- 4. पैटर्न मैचिंग (LIKE):
SELECT * FROM users 
WHERE email LIKE '%@qa.com';
```

---

## 4️⃣ 3. टेबल जोड़ना (JOINs) — दो टेबल्स का मिलान

```
┌────────────────────────────────────────────────────────┐
│                      SQL JOINs                         │
├────────────┬───────────────────────────────────────────┤
│ INNER JOIN │ दोनों टेबल्स में जो रिकॉर्ड्स मैच हों     │
│ LEFT JOIN  │ बायीं टेबल के सभी + दायीं के मैचिंग       │
│ RIGHT JOIN │ दायीं टेबल के सभी + बायीं के मैचिंग       │
└────────────┴───────────────────────────────────────────┘
```

```sql
-- यूज़र का नाम और उसके द्वारा किए गए ऑर्डर्स की जानकारी एक साथ देखना:
SELECT 
  users.name,
  orders.product_name,
  orders.amount,
  orders.status
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE orders.status = 'COMPLETED';
```

---

## 5️⃣ 4. डेटा विश्लेषण (Aggregation & GROUP BY)

```sql
-- हर रोल में कितने यूज़र्स हैं, यह गिनना:
SELECT role, COUNT(*) AS total_users
FROM users
GROUP BY role;

-- कुल ऑर्डर राशि का योग (SUM) और औसत (AVG):
SELECT 
  SUM(amount) AS total_revenue,
  AVG(amount) AS average_order_value
FROM orders;
```

---

## 🎯 Test Automation & SDET में SQL का उपयोग

ऑटोमेशन टेस्ट्स में डेटाबेस वैलिडेशन 3 प्रमुख कारणों से किया जाता है:
1. **डेटा सीडिंग (Pre-condition):** टेस्ट रन होने से पहले डमी यूज़र या प्रोडक्ट डेटाबेस में डालना।
2. **बैकएंड असर्शन (Verification):** जब UI पर "Order Successful" दिखे, तो डेटाबेस में चेक करना कि क्या `orders` टेबल में स्टेटस `'COMPLETED'` हुआ?
3. **क्लीनअप (Post-condition):** टेस्ट पूरा होने के बाद डमी डेटा को हटाना या रोलबैक करना।

---

## ✍️ Immediate Practice Challenge (स्वयं करके देखें)

### 🎯 Practice Challenge:
1. एक क्वेरी लिखें जो उन सभी यूज़र्स का `name` और `email` निकाले जिनकी उम्र `age > 25` हो।
2. एक क्वेरी लिखें जो सबसे महंगे 3 प्रोडक्ट्स की लिस्ट दिखाए (`ORDER BY price DESC LIMIT 3`)।

**हल (Solution Hint):**
```sql
-- 1. Age filter
SELECT name, email FROM users 
WHERE age > 25;

-- 2. Top 3 Expensive Products
SELECT name, price FROM products 
ORDER BY price DESC 
LIMIT 3;
```
