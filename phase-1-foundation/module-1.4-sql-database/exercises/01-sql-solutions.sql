-- ============================================================
-- ✅ Module 1.4 — SQL & Database Solutions
-- ============================================================

-- ------------------------------------------------------------
-- SECTION 1: Basic Filtering & Aggregations
-- ------------------------------------------------------------

-- Q1.1: Users with salary > 80,000 in Delhi
SELECT * 
FROM users 
WHERE salary > 80000 AND city = 'Delhi';

-- Q1.2: Department payroll and average salary
SELECT 
  dept, 
  SUM(salary) AS total_payroll, 
  ROUND(AVG(salary), 2) AS avg_salary,
  COUNT(*) AS emp_count
FROM users 
GROUP BY dept;

-- Q1.3: Departments with more than 2 employees
SELECT 
  dept, 
  COUNT(*) AS total_employees 
FROM users 
GROUP BY dept 
HAVING COUNT(*) > 2;

-- ------------------------------------------------------------
-- SECTION 2: Joins
-- ------------------------------------------------------------

-- Q2.1: Inner Join users and orders
SELECT 
  u.id AS user_id, 
  u.name, 
  o.id AS order_id, 
  o.amount, 
  o.status 
FROM users u 
INNER JOIN orders o ON u.id = o.user_id;

-- Q2.2: Left Join with COALESCE sum of orders
SELECT 
  u.id, 
  u.name, 
  COALESCE(SUM(o.amount), 0) AS total_spent 
FROM users u 
LEFT JOIN orders o ON u.id = o.user_id 
GROUP BY u.id, u.name;

-- Q2.3: Users with ZERO orders
-- Approach 1: LEFT JOIN + NULL Check
SELECT 
  u.id, 
  u.name 
FROM users u 
LEFT JOIN orders o ON u.id = o.user_id 
WHERE o.id IS NULL;

-- Approach 2: NOT EXISTS (Performant)
SELECT 
  u.id, 
  u.name 
FROM users u 
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.user_id = u.id
);

-- ------------------------------------------------------------
-- SECTION 3: Subqueries & CTEs
-- ------------------------------------------------------------

-- Q3.1: Employees earning more than their department average
SELECT 
  u.name, 
  u.dept, 
  u.salary 
FROM users u 
WHERE u.salary > (
  SELECT AVG(u2.salary) 
  FROM users u2 
  WHERE u2.dept = u.dept
);

-- Q3.2: CTE for high revenue cities
WITH CityOrderRevenue AS (
  SELECT 
    u.city, 
    SUM(o.amount) AS total_revenue 
  FROM users u 
  INNER JOIN orders o ON u.id = o.user_id 
  GROUP BY u.city
)
SELECT 
  city, 
  total_revenue 
FROM CityOrderRevenue 
WHERE total_revenue > 50000 
ORDER BY total_revenue DESC;

-- ------------------------------------------------------------
-- SECTION 4: Window Functions
-- ------------------------------------------------------------

-- Q4.1: DENSE_RANK by salary per department
SELECT 
  name, 
  dept, 
  salary, 
  DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS dept_salary_rank 
FROM users;

-- Q4.2: Highest salary employee per department
WITH RankedEmployees AS (
  SELECT 
    name, 
    dept, 
    salary, 
    ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS rn 
  FROM users
)
SELECT 
  name, 
  dept, 
  salary 
FROM RankedEmployees 
WHERE rn = 1;

-- Q4.3: Running total of order amounts by order_date
SELECT 
  id, 
  user_id, 
  order_date, 
  amount, 
  SUM(amount) OVER (ORDER BY order_date, id) AS running_total 
FROM orders;
