# 📘 Module 1.4 — SQL & Database Complete Guide

> **Time:** ~8-10 hours  
> **Goal:** SQL queries confident likhna — joins, subqueries, window functions

---

## 1️⃣ SQL Fundamentals

### Database Setup (Practice ke liye)
```sql
-- Yeh tables banao practice ke liye (SQLite/PostgreSQL mein)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  city VARCHAR(50),
  age INT,
  role VARCHAR(20) DEFAULT 'user',
  salary DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  product VARCHAR(100),
  amount DECIMAL(10,2),
  status VARCHAR(20) DEFAULT 'pending',
  order_date DATE DEFAULT CURRENT_DATE
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  category VARCHAR(50),
  price DECIMAL(10,2),
  stock INT DEFAULT 0
);

-- Sample data
INSERT INTO users (name, email, city, age, role, salary) VALUES
('Hariom', 'hariom@test.com', 'Delhi', 25, 'sdet', 80000),
('Rahul', 'rahul@test.com', 'Mumbai', 30, 'dev', 120000),
('Priya', 'priya@test.com', 'Delhi', 22, 'sdet', 90000),
('Amit', 'amit@test.com', 'Bangalore', 28, 'dev', 95000),
('Neha', 'neha@test.com', 'Mumbai', 27, 'qa', 75000),
('Karan', 'karan@test.com', 'Delhi', 35, 'manager', 150000),
('Sneha', 'sneha@test.com', 'Bangalore', 24, 'dev', 85000);
```

### SELECT Basics
```sql
-- All columns
SELECT * FROM users;

-- Specific columns
SELECT name, email, city FROM users;

-- Alias
SELECT name AS user_name, salary AS monthly_pay FROM users;

-- DISTINCT — unique values
SELECT DISTINCT city FROM users;
SELECT DISTINCT role FROM users;

-- WHERE — filter rows
SELECT * FROM users WHERE city = 'Delhi';
SELECT * FROM users WHERE age > 25;
SELECT * FROM users WHERE role = 'dev' AND city = 'Mumbai';
SELECT * FROM users WHERE city = 'Delhi' OR city = 'Mumbai';
SELECT * FROM users WHERE salary BETWEEN 80000 AND 100000;
SELECT * FROM users WHERE city IN ('Delhi', 'Mumbai', 'Bangalore');
SELECT * FROM users WHERE name LIKE 'H%';      -- Starts with H
SELECT * FROM users WHERE email LIKE '%@test%'; -- Contains @test
SELECT * FROM users WHERE age IS NOT NULL;

-- ORDER BY — sort
SELECT * FROM users ORDER BY salary DESC;
SELECT * FROM users ORDER BY city ASC, salary DESC;

-- LIMIT & OFFSET — pagination
SELECT * FROM users LIMIT 5;
SELECT * FROM users LIMIT 5 OFFSET 5; -- Page 2
```

### Aggregate Functions
```sql
-- COUNT, SUM, AVG, MIN, MAX
SELECT COUNT(*) AS total_users FROM users;
SELECT AVG(salary) AS avg_salary FROM users;
SELECT MIN(age) AS youngest, MAX(age) AS oldest FROM users;
SELECT SUM(salary) AS total_payroll FROM users;

-- GROUP BY — group aur aggregate
SELECT city, COUNT(*) AS user_count, AVG(salary) AS avg_salary
FROM users
GROUP BY city;

SELECT role, COUNT(*) AS count, ROUND(AVG(salary), 2) AS avg_salary
FROM users
GROUP BY role
ORDER BY avg_salary DESC;

-- HAVING — grouped results filter (WHERE group par nahi chalega)
SELECT city, COUNT(*) AS user_count
FROM users
GROUP BY city
HAVING COUNT(*) > 1; -- Sirf cities jahan 2+ users hain
```

---

## 2️⃣ Joins — SABSE IMPORTANT! ⭐

```sql
-- Sample orders data
INSERT INTO orders (user_id, product, amount, status) VALUES
(1, 'Laptop', 75000, 'completed'),
(1, 'Mouse', 1500, 'completed'),
(2, 'Monitor', 25000, 'pending'),
(3, 'Keyboard', 3000, 'completed'),
(5, 'Headphones', 5000, 'cancelled'),
(NULL, 'Unknown Product', 999, 'pending'); -- No user

-- INNER JOIN — sirf matching rows dono tables se
SELECT u.name, o.product, o.amount
FROM users u
INNER JOIN orders o ON u.id = o.user_id;
-- Result: Only users WITH orders (Amit, Karan, Sneha nahi aayenge)

-- LEFT JOIN — LEFT table ke SAB rows + matching right
SELECT u.name, o.product, o.amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
-- Result: ALL users, even without orders (NULL for order columns)

-- RIGHT JOIN — RIGHT table ke SAB rows + matching left
SELECT u.name, o.product, o.amount
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;
-- Result: ALL orders, even without users

-- FULL OUTER JOIN — dono tables ke SAB rows
SELECT u.name, o.product
FROM users u
FULL OUTER JOIN orders o ON u.id = o.user_id;

-- Self Join — table apne aap se join
-- Example: Managers dhundho (agar manager_id column hota)
-- SELECT e.name AS employee, m.name AS manager
-- FROM employees e
-- LEFT JOIN employees m ON e.manager_id = m.id;

-- Multiple Joins
SELECT u.name, o.product, o.amount, o.status
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.status = 'completed'
ORDER BY o.amount DESC;
```

### Join Types Visual:
```
INNER JOIN:    Only matching rows    (∩)
LEFT JOIN:     All left + matching   (⊃ left)
RIGHT JOIN:    All right + matching  (⊂ right)  
FULL JOIN:     All rows from both    (∪)
CROSS JOIN:    Every combination     (×)
```

---

## 3️⃣ Subqueries

```sql
-- Scalar subquery (ek value return)
SELECT name, salary,
  salary - (SELECT AVG(salary) FROM users) AS diff_from_avg
FROM users;

-- Subquery in WHERE
-- Users jinki salary average se zyada hai
SELECT * FROM users
WHERE salary > (SELECT AVG(salary) FROM users);

-- Users jinke orders hain
SELECT * FROM users
WHERE id IN (SELECT DISTINCT user_id FROM orders WHERE user_id IS NOT NULL);

-- Users jinke orders NAHI hain
SELECT * FROM users
WHERE id NOT IN (SELECT DISTINCT user_id FROM orders WHERE user_id IS NOT NULL);

-- EXISTS (generally better performance than IN)
SELECT * FROM users u
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.user_id = u.id AND o.status = 'completed'
);

-- Correlated subquery
-- Har user ke saath unke total orders amount
SELECT name,
  (SELECT COALESCE(SUM(amount), 0) FROM orders WHERE user_id = u.id) AS total_spent
FROM users u;

-- Subquery in FROM (Derived table)
SELECT city, avg_salary
FROM (
  SELECT city, AVG(salary) AS avg_salary
  FROM users
  GROUP BY city
) AS city_stats
WHERE avg_salary > 90000;
```

### CTE (Common Table Expressions) — Cleaner Subqueries ✅
```sql
-- WITH clause — readable, reusable subqueries
WITH city_stats AS (
  SELECT city, 
    COUNT(*) AS user_count, 
    AVG(salary) AS avg_salary,
    MAX(salary) AS max_salary
  FROM users
  GROUP BY city
),
high_salary_cities AS (
  SELECT * FROM city_stats WHERE avg_salary > 85000
)
SELECT * FROM high_salary_cities ORDER BY avg_salary DESC;

-- Multiple CTEs
WITH user_orders AS (
  SELECT u.id, u.name, u.city,
    COUNT(o.id) AS order_count,
    COALESCE(SUM(o.amount), 0) AS total_spent
  FROM users u
  LEFT JOIN orders o ON u.id = o.user_id
  GROUP BY u.id, u.name, u.city
),
city_summary AS (
  SELECT city,
    SUM(order_count) AS city_orders,
    SUM(total_spent) AS city_revenue
  FROM user_orders
  GROUP BY city
)
SELECT * FROM city_summary ORDER BY city_revenue DESC;
```

---

## 4️⃣ Window Functions — ADVANCED ⭐

```sql
-- ROW_NUMBER — har row ko unique number do
SELECT name, salary, city,
  ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank
FROM users;

-- RANK — same salary wale ko same rank (gaps)
-- DENSE_RANK — same rank, no gaps
SELECT name, salary,
  RANK() OVER (ORDER BY salary DESC) AS rank,
  DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM users;

-- PARTITION BY — group ke andar ranking
SELECT name, city, salary,
  ROW_NUMBER() OVER (PARTITION BY city ORDER BY salary DESC) AS city_rank,
  RANK() OVER (PARTITION BY city ORDER BY salary DESC) AS city_rank2
FROM users;

-- Top earner in each city
WITH ranked AS (
  SELECT name, city, salary,
    ROW_NUMBER() OVER (PARTITION BY city ORDER BY salary DESC) AS rn
  FROM users
)
SELECT name, city, salary FROM ranked WHERE rn = 1;

-- LAG / LEAD — previous/next row values
SELECT name, salary,
  LAG(salary) OVER (ORDER BY salary) AS prev_salary,
  LEAD(salary) OVER (ORDER BY salary) AS next_salary,
  salary - LAG(salary) OVER (ORDER BY salary) AS diff
FROM users;

-- Running totals
SELECT name, salary,
  SUM(salary) OVER (ORDER BY salary) AS running_total,
  AVG(salary) OVER (ORDER BY salary) AS running_avg
FROM users;

-- NTILE — equal groups mein divide karo
SELECT name, salary,
  NTILE(3) OVER (ORDER BY salary DESC) AS salary_tier
FROM users;
-- tier 1 = top 33%, tier 2 = middle 33%, tier 3 = bottom 33%
```

---

## 5️⃣ Indexes & Query Optimization

```sql
-- Create index (faster searches)
CREATE INDEX idx_users_city ON users(city);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- Composite index
CREATE INDEX idx_users_city_role ON users(city, role);

-- Unique index
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);

-- EXPLAIN — query plan dekho
EXPLAIN ANALYZE SELECT * FROM users WHERE city = 'Delhi';
-- Seq Scan = slow (full table scan)
-- Index Scan = fast (index use hua)

-- Optimization Tips:
-- 1. SELECT * avoid karo — specific columns select karo
-- 2. WHERE mein indexed columns use karo
-- 3. LIKE '%text%' slow hai, LIKE 'text%' fast hai (index use hota hai)
-- 4. JOIN par indexed foreign keys use karo
-- 5. LIMIT lagao jab zaroorat ho
-- 6. COUNT(*) vs COUNT(column) — * sabko count karta hai, column NULL skip karta hai
```

---

## 6️⃣ PostgreSQL Specific Features

```sql
-- UPSERT (INSERT or UPDATE)
INSERT INTO users (name, email, city) VALUES ('Hariom', 'hariom@test.com', 'Delhi')
ON CONFLICT (email) DO UPDATE SET city = 'Delhi';

-- JSON/JSONB
CREATE TABLE settings (
  id SERIAL PRIMARY KEY,
  user_id INT,
  preferences JSONB DEFAULT '{}'
);

INSERT INTO settings (user_id, preferences) VALUES 
(1, '{"theme": "dark", "lang": "hi", "notifications": {"email": true, "sms": false}}');

-- Query JSON
SELECT preferences->>'theme' AS theme FROM settings;
SELECT preferences->'notifications'->>'email' AS email_notif FROM settings;
SELECT * FROM settings WHERE preferences @> '{"theme": "dark"}';

-- Date functions
SELECT name, 
  created_at,
  EXTRACT(YEAR FROM created_at) AS year,
  EXTRACT(MONTH FROM created_at) AS month,
  AGE(created_at) AS age,
  NOW() - created_at AS time_since
FROM users;

-- String functions
SELECT 
  CONCAT(name, ' (', role, ')') AS display,
  UPPER(name),
  LENGTH(name),
  SUBSTRING(email FROM 1 FOR POSITION('@' IN email) - 1) AS username
FROM users;

-- COALESCE — pehli non-NULL value
SELECT name, COALESCE(city, 'Unknown') AS city FROM users;

-- CASE expression
SELECT name, salary,
  CASE 
    WHEN salary >= 120000 THEN 'Senior'
    WHEN salary >= 80000 THEN 'Mid'
    ELSE 'Junior'
  END AS level
FROM users;
```

---

## 7️⃣ MongoDB Basics

```javascript
// Connect
// mongosh "mongodb+srv://cluster.mongodb.net/mydb"

// CRUD Operations
// CREATE
db.users.insertOne({ name: "Hariom", age: 25, city: "Delhi" });
db.users.insertMany([
  { name: "Rahul", age: 30, city: "Mumbai" },
  { name: "Priya", age: 22, city: "Delhi" },
]);

// READ
db.users.find({});                              // All documents
db.users.find({ city: "Delhi" });               // Filter
db.users.find({ age: { $gt: 25 } });            // Greater than
db.users.find({ city: { $in: ["Delhi", "Mumbai"] } });
db.users.findOne({ name: "Hariom" });           // Single document
db.users.find({}).sort({ age: -1 }).limit(5);   // Sort + limit

// UPDATE
db.users.updateOne(
  { name: "Hariom" },
  { $set: { age: 26, role: "sdet" } }
);
db.users.updateMany(
  { city: "Delhi" },
  { $set: { region: "North" } }
);

// DELETE
db.users.deleteOne({ name: "Hariom" });
db.users.deleteMany({ age: { $lt: 20 } });

// Aggregation Pipeline (SQL GROUP BY equivalent)
db.users.aggregate([
  { $match: { age: { $gt: 20 } } },           // WHERE
  { $group: {                                   // GROUP BY
    _id: "$city",
    count: { $sum: 1 },
    avgAge: { $avg: "$age" },
  }},
  { $sort: { count: -1 } },                    // ORDER BY
  { $limit: 5 },                               // LIMIT
]);

// Indexing
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ city: 1, age: -1 });
```

---

## 8️⃣ Database in Testing Context

```javascript
// Test Data Setup Pattern
async function seedTestData(db) {
  await db.query("BEGIN"); // Transaction start
  try {
    await db.query("DELETE FROM orders");
    await db.query("DELETE FROM users");
    
    const users = await db.query(`
      INSERT INTO users (name, email, city) VALUES
      ('TestUser1', 'test1@test.com', 'Delhi'),
      ('TestUser2', 'test2@test.com', 'Mumbai')
      RETURNING *
    `);
    
    await db.query(`
      INSERT INTO orders (user_id, product, amount) VALUES
      ($1, 'Product1', 1000),
      ($2, 'Product2', 2000)
    `, [users.rows[0].id, users.rows[1].id]);
    
    await db.query("COMMIT");
    return users.rows;
  } catch (error) {
    await db.query("ROLLBACK");
    throw error;
  }
}

// Transaction-based Test Isolation
// Har test ko transaction mein wrap karo → test ke baad ROLLBACK → clean state!
async function runTestInTransaction(db, testFn) {
  await db.query("BEGIN");
  try {
    await testFn(db);
  } finally {
    await db.query("ROLLBACK"); // Data wapas original state mein!
  }
}
```

---

## 🧠 SQL Quick Reference

| Concept | Syntax |
|---------|--------|
| Filter | `WHERE column = value` |
| Sort | `ORDER BY column DESC` |
| Group | `GROUP BY column HAVING count > 1` |
| Join | `INNER/LEFT/RIGHT JOIN table ON condition` |
| Subquery | `WHERE col IN (SELECT ...)` |
| CTE | `WITH name AS (SELECT ...) SELECT ...` |
| Window | `ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)` |
| Pagination | `LIMIT 10 OFFSET 20` |
| Upsert | `ON CONFLICT DO UPDATE` |
