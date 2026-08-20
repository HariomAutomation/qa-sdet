-- ============================================================
-- 📝 Module 1.4 — SQL & Database Exercises
-- ============================================================
-- Tables Setup (Run this first in PostgreSQL / SQLite / MySQL):
--
-- CREATE TABLE users (
--   id INT PRIMARY KEY,
--   name VARCHAR(50),
--   city VARCHAR(50),
--   salary INT,
--   dept VARCHAR(50)
-- );
--
-- CREATE TABLE orders (
--   id INT PRIMARY KEY,
--   user_id INT,
--   amount INT,
--   status VARCHAR(20),
--   order_date DATE
-- );
--
-- ============================================================

-- ------------------------------------------------------------
-- SECTION 1: Basic Filtering & Aggregations
-- ------------------------------------------------------------

-- Q1.1: Saare users select karo jinki salary 80,000 se zyada hai aur city 'Delhi' hai.
-- TODO: Write Query


-- Q1.2: Har department ka total payroll (sum of salary) aur average salary nikaalo.
-- TODO: Write Query


-- Q1.3: Un departments ki list nikaalo jahan 2 se zyada employees kaam karte hain (HAVING clause).
-- TODO: Write Query


-- ------------------------------------------------------------
-- SECTION 2: Joins (Crucial for SDET / Test Automation)
-- ------------------------------------------------------------

-- Q2.1: Har user ka naam aur uske orders ka amount & status nikaalo (Sirf unka jinhone order kiya hai - INNER JOIN).
-- TODO: Write Query


-- Q2.2: Saare users ki list nikaalo chahe unhone order kiya ho ya nahi (LEFT JOIN).
-- Unke total order amount ka sum bhi dikhao (agar koi order nahi toh 0 dikhao using COALESCE).
-- TODO: Write Query


-- Q2.3: Un users ka naam find karo jinhone KABHI koi order nahi kiya (LEFT JOIN WHERE IS NULL ya NOT EXISTS).
-- TODO: Write Query


-- ------------------------------------------------------------
-- SECTION 3: Subqueries & CTEs
-- ------------------------------------------------------------

-- Q3.1: Un employees ko dhundho jinki salary unke department ki average salary se zyada hai (Correlated Subquery).
-- TODO: Write Query


-- Q3.2: Ek CTE (Common Table Expression) likho jisme har city ka total order revenue calculate ho,
-- aur final output mein sirf wo cities aaye jahan revenue > 50,000 hai.
-- TODO: Write Query


-- ------------------------------------------------------------
-- SECTION 4: Window Functions (Senior SDET Level)
-- ------------------------------------------------------------

-- Q4.1: Har department ke employees ko salary ke basis par DENSE_RANK() assign karo.
-- Highest salary wale ko Rank 1 milni chahiye.
-- TODO: Write Query


-- Q4.2: Har department ka HIGHEST salary wala employee kaun hai? (CTE + ROW_NUMBER() use karo).
-- TODO: Write Query


-- Q4.3: Monthly running total of order amounts calculate karo (SUM OVER ORDER BY date).
-- TODO: Write Query

