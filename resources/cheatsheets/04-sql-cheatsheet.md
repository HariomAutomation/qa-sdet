# 📋 SQL & Database — Quick Cheatsheet

## Query Execution Order
```
1. FROM / JOIN
2. WHERE (filter rows before grouping)
3. GROUP BY
4. HAVING (filter groups after aggregation)
5. SELECT (expressions, aliases)
6. DISTINCT
7. ORDER BY
8. LIMIT / OFFSET
```

## Joins
```sql
INNER JOIN   -- Common matching rows only
LEFT JOIN    -- All left rows + matching right (or NULL)
RIGHT JOIN   -- All right rows + matching left
FULL JOIN    -- All rows from both tables
```

## Common Aggregations
```sql
SELECT 
  dept,
  COUNT(*) AS total_employees,
  SUM(salary) AS total_payroll,
  ROUND(AVG(salary), 2) AS avg_salary,
  MIN(salary) AS min_pay,
  MAX(salary) AS max_pay
FROM users
GROUP BY dept
HAVING COUNT(*) > 1;
```

## Common Table Expressions (CTE)
```sql
WITH HighEarningDept AS (
  SELECT dept, AVG(salary) AS avg_sal
  FROM users
  GROUP BY dept
  HAVING AVG(salary) > 80000
)
SELECT u.name, u.dept, u.salary
FROM users u
INNER JOIN HighEarningDept h ON u.dept = h.dept;
```

## Window Functions
```sql
-- Ranking
ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS row_num
DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC) AS rank

-- Running Total & Averages
SUM(amount) OVER (ORDER BY order_date) AS running_revenue
AVG(amount) OVER (PARTITION BY user_id) AS user_avg_order

-- Lead & Lag
LAG(salary, 1) OVER (ORDER BY hire_date) AS prev_employee_salary
LEAD(salary, 1) OVER (ORDER BY hire_date) AS next_employee_salary
```
